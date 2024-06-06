import { height, width } from "@mui/system";
import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button, CircularProgress, Backdrop } from '@mui/material';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import Auth from '../../utils/auth';
import {countDown} from '../../utils/countDown';
import '../../assets/styles/canvas.css'
import './canvas.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

// this is the size of our pixels in real pixels
const pixelSize = 20; 
// This is the size of the canvas in our pixels (not real pixels)
const canvasSize = 50;

const Canvas = () =>{
    //This state is just the coordinates of the pixel that was clicked on
    const [pixelTarget, setPixelTarget] = useState(null);

    // This state is the info that should be displayed in the tooltip
    const [tooltipData, setTooltipData] = useState(null);
    const canvasRef = useRef(null);
    const { loading, error, data } = useQuery(PIXELS);
    
    // This state starts out as an empty 2D array the same size as the pixel grid
    // it is later populated by the placementUser and updatedAt for each pixel
    let [pixelArray2D, setPixelArray2D] = useState(() => {
        let arr = [];
        for(let i = 0; i < canvasSize; i++){
            arr[i] = [];
            for(let j = 0; j < canvasSize; j++){
                arr[i][j] = {};
            }
        }
        return arr;
    });

    const navigate = useNavigate();

    let pixelArray = data?.pixels || [{}];

    // on load, construct the array
    useEffect(()=>{
        console.log("draw array");
        if(canvasRef.current){
            drawArray();
        }
    },[data])

    //function to contruct the canvas once we get the array.
    const drawArray = ()=>{
        let canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let arr = {...pixelArray2D};
        for (let i = 0; i< pixelArray.length; i++){
            let {coordinates, pixelColor }= pixelArray[i];
            ctx.fillStyle = `${pixelColor}`
            ctx.fillRect(coordinates[0]*pixelSize, coordinates[1]*pixelSize, pixelSize, pixelSize);

            // This populates the pixelArray2D state with the placementUser and updatedAt for each pixel
            arr[coordinates[0]][coordinates[1]] = {
                placementUser: pixelArray[i].placementUser,
                updatedAt: pixelArray[i].updatedAt
            }
        }
        setPixelArray2D(arr);
    }

//gets the mouses position relative to size (could prove problematic)
    function  getMousePos(evt) {
        let canvas = evt.target;
        let rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
          scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
      
        return {
          x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }

    }
//used on each coordiante to make a coordinate that works with the grid and DB
    function findBestSquare(val){
        //first we get the remainder
        let remainder = val% pixelSize
        //then subtract and divide by ten
        let rounded = (val - remainder)/pixelSize;
        return rounded;
    }
//handles click events
    function handleClick(evt){
        if(!Auth.loggedIn()){
            navigate('/login');
        }
  
        if(countDown() > 0){
            alert(`Cannot place another pixel for ${countDown()} seconds`);
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let coords = getMousePos(evt);
        let x = findBestSquare(coords.x);
        let y = findBestSquare(coords.y);
        let coordinates = [x,y];

        setPixelTarget(coordinates);
    }

    // This is called whenever the mouse is moved while over the canvas
    function handleMouseOver(evt){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let coords = getMousePos(evt);
        let x = findBestSquare(coords.x);
        let y = findBestSquare(coords.y);

        // get tootip info from pixelArray2D and put it in the tooltipData state
        const data = pixelArray2D[x][y];
        if(data.placementUser != null){
            setTooltipData(pixelArray2D[x][y]);
        }
        else {
            setTooltipData(null);
        }
    }

    
    // sets up styling for MUI tooltip
    // not currently in use. I couldn't get it working so I just made my own tooltip
    const PixelTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
    }));

    // all return statements must come after all hooks
    if (loading) {
        return <CircularProgress color="inherit" />;
    }

    return (
        <Container sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <canvas
                width={canvasSize * pixelSize}
                height={canvasSize * pixelSize}
                ref={canvasRef}
                onClick={handleClick}
                onMouseMove={evt => handleMouseOver(evt)}
                onMouseLeave={() => setTooltipData(null)}
                className={`kanvas`}
            ></canvas>
            <Box className="tooltip">{tooltipData != null ? `Placed by: ${tooltipData.placementUser} on ${tooltipData.updatedAt}` :null}</Box>
            <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={pixelTarget ?? false}
>

            <ColorForm pixelTarget={pixelTarget} canvas={canvasRef} setPixelTarget={setPixelTarget} pixelSize={pixelSize} pixelArray2D={pixelArray2D} setPixelArray2D={setPixelArray2D}/>
</Backdrop>
        </Container>
    )
}


export default Canvas;