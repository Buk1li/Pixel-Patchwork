import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import Pixel from './pixel';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import '../../assets/styles/canvas.css'
import './canvas.css';

const Canvas = () => {
    //gets the pixel array
    //const getPixels = useQuery(PIXELS);

    //sets the target pistal state as an empty object by default
    const [pixelTarget, setPixelTarget] = useState({});

    //sets the pixel array state to a call to the server for the array
    //const [pixelArray, setPixelArray] = useState(await getPixels());


    const { loading, data } = useQuery(PIXELS);

    const pixelArray = data?.pixels || [];

    return (
        <Container>
            <div id="pixel-grid">
                {loading ? null
                :(
                    pixelArray.map((pixel)=>{
                        return (<Pixel pixelColor ={pixel.pixelColor} 
                        placmentUser = {pixel.placmentUser} 
                        coordinates = {pixel.coordinates} 
                        updatedAt = {pixel.updatedAt} 
                        pixelTarget={pixelTarget}
                        setPixelTarget={setPixelTarget}
                        key={pixel._id}>
                        </Pixel>)
                    })
                )}
            </div>
        </Container>

    );
};

export default Canvas;


