import { height, width } from "@mui/system";
import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import '../../assets/styles/canvas.css'
import './canvas.css';

const Canvas = async () =>{
    //:::BUG:::\\ it yells at the state and ref for being null, 
    //but that wasnt a problem before. Something with declaring 
    //the ref to that canvas element is being funky 
    const [pixelTarget, setPixelTarget] = useState(null);
    const canvasRef = useRef(null);
    const { loading, error, data } = useQuery(PIXELS);
    
    let pixelArray = await data?.pixels || [{}];
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // on load, construct the array
    // useEffect(async()=>{
    //     try{
    //         let pixelArray = await data?.pixels || [{}];
    //         console.log(data)
    //         drawArray(canvasRef.current, pixelArray)
    //     } catch(error){
    //         console.log(error);
    //     }
    // },[])

    //function to contruct the canvas once we get the array.
    const drawArray = async (evt)=>{
            let canvas = evt.target;
            const ctx = canvas.getContext("2d");
            for (let i = 0; i< pixelArray.length; i++){
                let {coordinates, pixelColor }= pixelArray[i];
                ctx.fillStyle = `${pixelColor}`
                ctx.fillRect(coordinates[0]*10, coordinates[1]*10, 10, 10);
                
            }

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
        let remainder = val% 10
        //then subtract and divide by ten
        let rounded = (val - remainder)/10;
        return rounded;
    }
//handles click events
    function handleClick(evt){
        const canvas = evt.target
        const ctx = canvas.getContext('2d');
        let coords = getMousePos(evt);
        let x = findBestSquare(coords.x);
        let y = findBestSquare(coords.y);
        let coordinates = [x,y];

        setPixelTarget(
            {
                coordinates: coordinates,
                placementUser: '',
                pixelColor: ''
            }
        )
    }



    return (
        <Container className={`canvas-wrapper`}>
        <canvas
        width={1000}
        height={1000}
        ref={canvasRef}
        onClick={handleClick}
        onLoad={drawArray}
        className={`kanvas`}
        ></canvas>
        <ColorForm pixelTarget={pixelTarget} canvas= {canvasRef} setPixelTarget={setPixelTarget}/>
        </Container>
    )
}

export default Canvas;