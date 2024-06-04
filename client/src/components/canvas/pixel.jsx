
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';
import { countDown } from '../../utils/countDown';


function Pixel ({pixel, setPixelTarget}) {
    //creates color state
    const [colorState, setColorState] = useState(pixel.pixelColor);

    const navigate = useNavigate();

    // makes color of the pixel equal to the color state
    const style = {
      backgroundColor: colorState,
      width: '50px',
      height: '50px'
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
        if(!Auth.loggedIn()){
          navigate('/login');
        }

        if(countDown() > 0){
          alert(`Cannot place another pixel for ${countDown()} seconds`);
          return;
        }

        // create a copy of pixel that we can safely modify
        let temp = {...pixel};
        // add setColorState to the copy of pixel so that the color picker can access it
        temp.setColorState = setColorState;
        // set the pixelTarget state to the modified copy of pixel
        setPixelTarget(temp);

        //need to check if user has any more placements left
      }

      if(pixel.placementUser != null){
        
      }
    return (
        <PixelTooltip 
        title = {pixel.placementUser != null 
          ? `placed by: ${pixel.placementUser} at ${pixel.updatedAt}`
        :null}>
          <div
            onClick={() => handleClick(pixel)}
            className={`pixel`} 
            style={style} 
          ></div>
        </PixelTooltip>
    )
};


export default Pixel;