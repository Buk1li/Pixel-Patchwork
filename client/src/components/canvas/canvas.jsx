import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import Pixel from './pixel';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import '../../assets/styles/canvas.css'


const Canvas = async() => {
    //gets the pixel array
    const getPixels = useQuery(PIXELS);

    //sets the target pistal state as an empty object by default
    const [pixelTarget, setPixelTarget] = useState({});

    //sets the pixel array state to a call to the server for the array
    const [pixelArray, setPixelArray] = useState(await getPixels());


    return (
        <Container>
            {pixelArray.map((pixel)=>(
                <Pixel pixelColor ={pixel.pixelColor} 
                placmentUser = {pixel.placmentUser} 
                coordinates = {pixel.coordinates} 
                updatedAt = {pixel.updatedAt} 
                pixelTarget={pixelTarget}>
                </Pixel>
            ))}
        </Container>
    );
};

export default Canvas;