import React, { useEffect, useState } from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CartIcon from "components/CartIcon";
import UserIcon from 'components/UserIcon';
// Practise React React components
import MKBox from "components/MKBox";

// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/banner.JPG";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const token = localStorage.getItem("tokenUser");
  const [checkToken, setCheckToken] = useState(token ? token : "");
  const navigate = useNavigate();

  const action = checkToken
    ?
    [
      {
        type: "internal",
        route: "/shopping-cart",
        label: <CartIcon badge="true" />,
        color: "default"
      },
      {
        type: "external",
        label: <UserIcon />,
        color: "default"
      },
      {
        type: "external",
        label: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>,
        color: "default",
        onClick: () => {
          localStorage.removeItem("tokenUser");
          localStorage.removeItem("userInfo");
          setCheckToken("");
          navigate('/')
        }
      }
    ]
    :
    [{
      type: "internal",
      route: "/shopping-cart",
      label: <CartIcon />,
      color: "default",
    },
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