import React, { useEffect, useState } from 'react';
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
import bgImage from "assets/images/banner.JPG";

const Header = () => {

  const token = localStorage.getItem("tokenUser");
  const [checkToken, setCheckToken] = useState(token ? token : "");

  const action = checkToken
    ?
    {
      type: "external",
      label: "Log Out",
      color: "default",
      onClick: () => {
        localStorage.removeItem("tokenUser")
        setCheckToken("");
      }
    }
    :
    [
      {
        type: "internal",
        route: "/sign-in",
        label: "Sign In",
        color: "default",
      },
      {
        type: "internal",
        route: "/sign-up",
        label: "Sign Up",
        color: "default",
      },
    ]

  useEffect(() => {
    if (token)
    setCheckToken(token);
  }, [checkToken])

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={action}
        transparent
      />
      <MKBox
        minHeight="10vh"
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
            sx={{ mx: "auto", textAlign: "right" }}
          >
          </Grid>
        </Container>
      </MKBox>
    </>
  );
};

export default Header;