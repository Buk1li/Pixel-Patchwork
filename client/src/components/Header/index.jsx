
import Button from '@mui/material/Button';
import Auth from '../../utils/auth';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
const Header = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <Grid
        sx={{
          backgroundColor: "#2d3e50",
          margin: 0,
          textAlign: 'center',
          color: '#fff',
        }}
        spacing={0}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        columns={12}
      >
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <Link style={linkStyle} to="/">
            <h1 className="">r/placeholder</h1>
          </Link>
        </Grid>
        <Grid item xs={4}>
          {Auth.loggedIn() ? (
              <Button style={linkStyle} className="" onClick={logout}>
                Logout
              </Button>
          ) : (
            <>
              <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}>
                <Grid item xs={4}>
                  <Link style={linkStyle} to="/login">
                    <Paper>
                      Login
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link style={linkStyle} to="/signup">
                    <Paper>
                      Signup
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
