// @mui material components
import Card from "@mui/material/Card";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import IntroProduct from "./sections/IntroProduct";
function AboutUs() {
  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        {/* <Team />
        <Featuring />
        <Newsletter /> */}
        <IntroProduct />
      </Card>
    </>
  );
}

export default AboutUs;
