import { height, width } from "@mui/system";
import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import '../../assets/styles/canvas.css'
import './canvas.css';

const Canvas = () =>{

    const [pixelTarget, setPixelTarget] = useState(null);
    let { loading, data, refetch } = useQuery(PIXELS);
    const pixelArray = data?.pixels || [];

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

    function findBestSquare(val){
        //first we get the remainder
        let remainder = val% 10
        let rounded;
        //decide whether to round up or down
        if( remainder < 5){
            //round down
            rounded = (val - remainder)/10
        } else{
            //round up
            rounded = (val - remainder + 10)/10;
        }

        


    }

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
        className={`kanvas`}
        width={1000}
        height={1000}
        ></canvas>
        <ColorForm pixelTarget={pixelTarget} setPixelTarget={setPixelTarget}/>
        </Container>
    )
}

export default Canvas