import React from 'react'
import BannerCarousel from 'components/BannerCarousel'
import banner1 from "assets/images/banner1.jpg";
import banner2 from "assets/images/banner2.jpg";
import banner3 from "assets/images/banner3.jpg";

const bannerList= [
    banner1,
    banner2,
    banner3
]
const Banner = () => {
  return (
    <div className="">
        <BannerCarousel featuredProducts={bannerList} /> 
       
       </div>
  )
}

export default Banner