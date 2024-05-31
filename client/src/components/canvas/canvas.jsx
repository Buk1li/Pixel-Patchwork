import React, { useRef, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, Container, Button } from '@mui/material';
import './App.css';  // Import the App.css file

const Canvas = () => {
    const canvasRef = useRef(null);
    const guideRef = useRef(null);
    const colorInputRef = useRef(null);
    const [showGuide, setShowGuide] = useState(true);
    const CELL_SIDE_COUNT = 16;
    const colorHistory = {};

    useEffect(() => {
        const canvas = canvasRef.current;
        const drawingContext = canvas.getContext("2d");
        const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

        // Set default color
        colorInputRef.current.value = "#87CEEB";

        // Initialize the canvas background
        drawingContext.fillStyle = "#ffffff";
        drawingContext.fillRect(0, 0, canvas.width, canvas.height);

        // Setup the guide
        const guide = guideRef.current;
        guide.style.width = `${canvas.width}px`;
        guide.style.height = `${canvas.height}px`;
        guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
        guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

        for (let i = 0; i < CELL_SIDE_COUNT ** 2; i++) {
            guide.insertAdjacentHTML("beforeend", "<div></div>");
        }

        const handleCanvasMousedown = (e) => {
            if (e.button !== 0) {
                return;
            }

            const canvasBoundingRect = canvas.getBoundingClientRect();
            const x = e.clientX - canvasBoundingRect.left;
            const y = e.clientY - canvasBoundingRect.top;
            const cellX = Math.floor(x / cellPixelLength);
            const cellY = Math.floor(y / cellPixelLength);
            const currentColor = colorHistory[`${cellX}_${cellY}`];

            if (e.ctrlKey) {
                if (currentColor) {
                    colorInputRef.current.value = currentColor;
                }
            } else {
                fillCell(cellX, cellY);
            }
        };

        const handleClearButtonClick = () => {
            const yes = window.confirm("Are you sure you wish to clear the canvas?");
            if (!yes) return;

            drawingContext.fillStyle = "#ffffff";
            drawingContext.fillRect(0, 0, canvas.width, canvas.height);
        };

        const handleToggleGuideChange = (event) => {
            setShowGuide(event.target.checked);
        };

        const fillCell = (cellX, cellY) => {
            const startX = cellX * cellPixelLength;
            const startY = cellY * cellPixelLength;

            drawingContext.fillStyle = colorInputRef.current.value;
            drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
            colorHistory[`${cellX}_${cellY}`] = colorInputRef.current.value;
        };

        canvas.addEventListener("mousedown", handleCanvasMousedown);
        return () => {
            canvas.removeEventListener("mousedown", handleCanvasMousedown);
        };
    }, []);

    return (
        <Container>
            <Box position="relative">
                <Box ref={guideRef} id="guide" display={showGuide ? 'grid' : 'none'} />
                <canvas ref={canvasRef} width="1000" height="1000" id="canvas"></canvas>
            </Box>
            <Box mt={2}>
                <InputLabel htmlFor="colorInput">Set Color: </InputLabel>
                <input type="color" id="colorInput" ref={colorInputRef} />
            </Box>
            <Box mt={2}>
                <FormControlLabel
                    control={<Checkbox id="toggleGuide" checked={showGuide} onChange={(e) => setShowGuide(e.target.checked)} />}
                    label="Show Guide"
                />
            </Box>
            <Box mt={2}>
                <Button id="clearButton" variant="contained" color="secondary" onClick={handleClearButtonClick}>
                    Clear Canvas
                </Button>
            </Box>
        </Container>
    );
};

export default Canvas;