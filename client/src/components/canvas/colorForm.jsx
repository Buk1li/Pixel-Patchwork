import Sketch from '@uiw/react-color-sketch';
import { useState } from 'react';
import {Button} from '@mui/material';
import { UPDATE_PIXEL } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


function ColorForm ({pixelTarget, setPixelTarget}) {
    const [hex, setHex] = useState("#fff");
    const [disableAlpha, setDisableAlpha] = useState(false);
    const [updatePixel, {error}] = useMutation(UPDATE_PIXEL);
    //const getMe = useQuery(QUERY_ME);

    const handleColorChange = async (event) =>{
      // commented out because I don't want to deal with user stuff right now
      //let me = await getMe();
      
      //setting the color state immediately changes the color
      pixelTarget.setColorState(hex);

      // updating the pixel in the database
      updatePixel({variables:{  
        pixelId: pixelTarget._id,
        pixelColor: hex,
        placementUser: "Edward V. Berard",
      }});

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