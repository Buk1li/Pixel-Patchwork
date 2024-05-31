import Sketch from '@uiw/react-color-sketch';
import { useState } from 'react';
import {Button} from '@mui/material';
import { UPDATE_PIXEL } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


function ColorForm ({pixelTarget}) {
    const [hex, setHex] = useState("#fff");
    const [disableAlpha, setDisableAlpha] = useState(false);
    const updatePixel = useMutation(UPDATE_PIXEL);
    const getMe = useQuery(QUERY_ME);

    const handleColorChange = async (event) =>{
        let me = await getMe()
        setPixelColor({
            pixelColor: hex, 
            placmentUser: me.username, 
            coordinates, 
            updatedAt})
    }

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

export default ColorForm;