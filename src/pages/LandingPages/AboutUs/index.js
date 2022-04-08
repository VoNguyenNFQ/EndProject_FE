// @mui material components
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Introduction from "./sections/Introduction";
import IntroProduct from "./sections/IntroProduct";
function AboutUs() {

  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mb: 4,
          mt: 4,
          boxShadow: 6
        }}
      >
        <Introduction />
        {/* <Team />
        <Featuring />
        <Newsletter /> */}
        <IntroProduct />
      </Card>
    </>
  );
}

export default AboutUs;
