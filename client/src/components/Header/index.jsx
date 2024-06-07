import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
const Header = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
  };

  const paperStyle = {
    padding: '0.5em',
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">
      <Grid
        sx={{
          backgroundColor: '#2d3e50',
          margin: 0,
          textAlign: 'center',
          color: '#fff',
        }}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <Link style={linkStyle} to="/">
            <h1 style={{ fontSize: '60px' }}>r/placeholder</h1>
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          {Auth.loggedIn() ? (
            <Button style={linkStyle} onClick={logout}>
              <Paper sx={paperStyle} square={false}>
                Logout
              </Paper>
            </Button>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={6} sm={4}>
                <Link style={linkStyle} to="/login">
                  <Paper sx={paperStyle} style={{ fontSize: '20px' }} square={false}>
                    Login
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Link style={linkStyle} to="/signup">
                  <Paper sx={paperStyle} square={false} style={{ fontSize: '20px' }}>
                    Signup
                  </Paper>
                </Link>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;