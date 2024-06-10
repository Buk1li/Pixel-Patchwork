import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
  };

  const paperStyle = {
    padding: "0.5em",
  };

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
          textAlign: "center",
          color: "#fff",
        }}
        spacing={0}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        columns={12}
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Link style={linkStyle} to="/">
            <img src="/Pixel_Patchwork.png" alt="Pixel Patchwork Logo" className="logo" />
          </Link>
        </Grid>

        <Grid item xs={4}>
          {Auth.loggedIn() ? (
            <>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={0}
              >
                <Grid item xs={4}>
                  <Link style={linkStyle} onClick={logout}>
                    <Paper sx={paperStyle} square={false} className="header-button">
                      Logout
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link style={linkStyle} to="/premium">
                    <Paper sx={paperStyle} square={false} className="header-button">
                      Premium
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={4}>
                  <Link style={linkStyle} to="/login">
                    <Paper sx={paperStyle} square={false} className="header-button">
                      Login
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link style={linkStyle} to="/signup">
                    <Paper sx={paperStyle} square={false} className="header-button">
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
