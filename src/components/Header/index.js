import React from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Practise React React components
import MKBox from "components/MKBox";

// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/banner1.jpg";

const Header = () => {
    return (
      <>
        <DefaultNavbar
          routes={routes}
          action={{
            route: "/pages/authentication/sign-in",
            label: "Sign In",
            color: "default",
          }}
          transparent
        />
        <MKBox
          minHeight="75vh"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.1),
                rgba(gradients.dark.state, 0.1)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={8}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ mx: "auto", textAlign: "center" }}
            >
            </Grid>
          </Container>
        </MKBox>
      </>
    );
};

export default Header;