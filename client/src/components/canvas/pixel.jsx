
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


function Pixel ({pixel, setPixelTarget}) {
    //creates color state
    const [colorState, setColorState] = useState(pixel.pixelColor);

    // makes color of the pixel equal to the color state
    const style = {
      backgroundColor: colorState,
      width: '5px',
      height: '5px'
    }

    // sets up styling for MUI tooltip
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

      const handleClick = (pixel) =>{
        // create a copy of pixel that we can safely modify
        let temp = {...pixel};
        // add setColorState to the copy of pixel so that the color picker can access it
        temp.setColorState = setColorState;
        // set the pixelTarget state to the modified copy of pixel
        setPixelTarget (temp);

        // need to check if user is logged in
        //need to check if user has any more placements left

        //if valid, pull up form for color (possibly using color wheel?)
      }

    return (
        <PixelTooltip title = {`placed by: ${pixel.placmentUser} at ${pixel.updatedAt}`}>
          <div
            onClick={() => handleClick(pixel)}
            className={`pixel`} 
            style={style} 
          ></div>
        </PixelTooltip>
    )
};


export default Pixel;