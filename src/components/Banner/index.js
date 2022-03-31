import React from 'react'
import Carousel from 'components/Carousel'
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
    <div >
        <Carousel images={bannerList} type="banner"/>
    </div>
  )
}

export default Banner