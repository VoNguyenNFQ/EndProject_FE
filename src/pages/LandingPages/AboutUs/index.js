// @mui material components
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Campaign from "./sections/Campaign";
import BestSeller from "./sections/BestSeller";
import Introduction from "./sections/Introduction";
import IntroProduct from "./sections/IntroProduct";
import QuoteBanner from "./sections/QuoteBanner";
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
        {/* <Team />
        <Featuring />
        <Newsletter /> */}
        <Campaign/>
        <IntroProduct />
        <QuoteBanner/>
        <Introduction />

      </Card>
    </>
  );
}

export default AboutUs;
