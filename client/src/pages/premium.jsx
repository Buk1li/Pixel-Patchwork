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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_live_51PPy0U2L2VLi6t6GbtCVULag7nBrrAKdbMeJPh5UIqEtDu4NwFqSFVKG7Z6B3XZRK6ifXEaOo0vbE7mVPPWs8hlE00207r3vTm');

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

export default function Premium() {
    const [getCheckout, { data }] = useLazyQuery(CHECKOUT);
    const [isPremium, setPremium] = useState(() => {
        if (Auth.loggedIn()) {
            return Auth.getProfile().data.isPremium
        }
        else return false;
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            console.log(data);
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            })
        }
    }, [data])

    const upgrade = () => {
        if (Auth.loggedIn()) {
            getCheckout({ variables: { userId: Auth.getProfile().data._id } });
        }
        else {
            navigate('/login')
        }
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
                    {isPremium
                        ? (<>
                            <Typography component="h1" variant="h5" style={{ fontSize: "30px" }}>
                                You Already Have a Premium Account
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "30px", marginTop: "1.5rem" }}>
                                Benefit
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "25px", textAlign: "center" }}>
                                Permanently reduce time between placing pixels to 3 seconds
                            </Typography>
                        </>
                        ) : (<>
                            <Typography component="h1" variant="h5" style={{ fontSize: "30px" }}>
                                Upgrade to Premium
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "30px", marginTop: "1.5rem" }}>
                                Cost
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "25px" }}>
                                One time fee of $0.60
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "30px", marginTop: "1.5rem" }}>
                                Benefit
                            </Typography>

                            <Typography component="h1" variant="h5" style={{ fontSize: "25px", textAlign: "center" }}>
                                Permanently reduce time between placing pixels to 3 seconds
                            </Typography>

                            <Button style={{ fontSize: "25px", marginTop: "2rem" }}
                                onClick={upgrade}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Upgrade
                            </Button>
                        </>)}


                </Box>
            </Container>
        </ThemeProvider>
    )
}