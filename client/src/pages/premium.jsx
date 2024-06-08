import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import {useEffect} from 'react';

const stripePromise = loadStripe('pk_test_51PP4QmP7EXLQgQgOZCQ4PfoDAIWGGX7KsriZC2hwhj2Gi0NoZFxHTs8iVEwsj4UGXLtGkfQJNkkUjBC97uNhHCcU00xn3bcIKD');

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

export default function Premium(){
    const [getCheckout, {data}] = useLazyQuery(CHECKOUT);

    useEffect(() => {
        if(data){
            console.log(data);
            stripePromise.then((res) => {
                res.redirectToCheckout({sessionId: data.checkout.session});
            })
        }
    },[data])

    const upgrade = () => {
        getCheckout({variables:{userId: Auth.getProfile().data._id}});
    }

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
                Upgrade to Premium
                </Typography>

                <Typography component="h1" variant="h5" style={{ fontSize: "30px", marginTop: "1.5rem" }}>
                    Cost
                </Typography>

                <Typography component="h1" variant="h5" style={{ fontSize: "25px" }}>
                    One time fee of $0.60
                </Typography>
                
                <Typography component="h1" variant="h5" style={{ fontSize: "30px", marginTop:"1.5rem" }}>
                    Benefit
                </Typography>
                
                <Typography component="h1" variant="h5" style={{ fontSize: "25px", textAlign: "center"}}>
                    Permanently reduce time between placing pixels to 3 seconds
                </Typography>
            
                <Button style={{ fontSize: "25px", marginTop:"2rem" }}
                    onClick={upgrade}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Upgrade
                </Button>
                
            </Box>
            </Container>
        </ThemeProvider>
    )
}