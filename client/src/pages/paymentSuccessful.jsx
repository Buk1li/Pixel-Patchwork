import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { ADD_PREMIUM } from '../utils/mutations';
import Auth from '../utils/auth';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        'Pixelify Sans',
        'normal'
      ].join(',')
    }
  });

export default function PaymentSuccessful(){
    const [addPremium, {error, data}] = useMutation(ADD_PREMIUM);
    const navigate = useNavigate();

    useEffect(() => {
        const makePremiumCall = async () => {
            const {data} = await addPremium();
            Auth.updateToken(data.addPremium.token);
        }
        makePremiumCall();
    },[])

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" style={{ fontSize: "30px" }}>
                Congrats!
                </Typography>

                <Typography component="h1" variant="h5" style={{ fontSize: "25px", marginTop: "2rem", textAlign:"center" }}>
                    You have been upgraded to a premium membership
                </Typography>

            
                <Button style={{ fontSize: "25px", marginTop:"2.5rem" }}
                    onClick={() => navigate("/")}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Return to home page
                </Button>
                
            </Box>
            </Container>
        </ThemeProvider>
    )
}