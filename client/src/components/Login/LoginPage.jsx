import React from 'react';

import { CssBaseline, Container, Box, TextField, Button, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            bgcolor: '#cfe8fc',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
