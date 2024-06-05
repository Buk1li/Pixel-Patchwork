import Sketch from '@uiw/react-color-sketch';
import { useState } from 'react';
import {Button} from '@mui/material';
import { UPDATE_PIXEL } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

import Auth from '../../utils/auth';


function ColorForm ({pixelTarget, setPixelTarget, canvas}) {
    const [hex, setHex] = useState("#fff");
    const [disableAlpha, setDisableAlpha] = useState(false);
    const [updatePixel, {error, data}] = useMutation(UPDATE_PIXEL);

    const handleColorChange = async (event) =>{
      
      //setting the color state immediately changes the color
      let temp = {...pixelTarget};
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = `${hex}`;
      ctx.fillRect(temp.coordinates[0]*10, temp.coordinates[1]*10, 10, 10);
      // updating the pixel in the database
      try{
        const {data} = await updatePixel({variables:{  
          pixelId: pixelTarget._id,
          pixelColor: hex,
          placementUser: Auth.getProfile().data.username,
        }});

        // the time since last pixel update is stored in the token so it must be updated when a pixel is updated
        Auth.updateToken(data.updatePixel.token);
      }
      catch(e){
        console.error(e);
      }

      // clearing pixelTarget so that the color picker ceases to be visible
      setPixelTarget(null);
    }

    if(!pixelTarget){
      return null;
    }
    else{
      return (
        <div>
          <Sketch
            style={{ marginLeft: 20 }}
            color={hex}
            disableAlpha={disableAlpha}
            onChange={(color) => {
                setHex(color.hex);
              }}
              />
          <button onClick={() => setDisableAlpha(!disableAlpha)}>
            disableAlpha={disableAlpha.toString()}
          </button>
          <Button variant="contained" onClick={handleColorChange}>Submit</Button>
        </div>
      );
    }
}

export default ColorForm;