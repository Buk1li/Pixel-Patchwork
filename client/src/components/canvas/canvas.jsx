import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import Pixel from './pixel';
import ColorForm from './colorForm';
import { useQuery } from '@apollo/client';
import { PIXELS } from '../../utils/queries';
import '../../assets/styles/canvas.css'
import './canvas.css';

const Canvas = () => {
    const [pixelTarget, setPixelTarget] = useState(null);

    // refetch is potentially very useful but I haven't been able to get it working correctly. For now, it is never used
    let { loading, data, refetch } = useQuery(PIXELS);

    const pixelArray = data?.pixels || [];

    return (
        <Container>
            <div id="pixel-grid">
                {loading ? null
                :(
                    pixelArray.map((pixel)=>{
                        return (<Pixel pixel={pixel} key={pixel._id} setPixelTarget={setPixelTarget}></Pixel>)
                    })
                )}
            </div>
            <ColorForm pixelTarget={pixelTarget} setPixelTarget={setPixelTarget}/>
        </Container>
    );
};

export default Canvas;


