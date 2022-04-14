import React, { useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import styles from './styles.css'
const Carousel = ({images, type}) => {
  //storing the index of the current image in the state
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = i => {
    setCurrentImage(i);
    
    refs[i].current.scrollIntoView(
      type == 'banner' ?
      {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      }
      : {
        inline: 'start',
      }
    );
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    'absolute text-gray-400 hover:text-gray-600 z-10 h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = isLeft => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? <AiOutlineLeft size={45} /> : <AiOutlineRight size={45} />}
      </span>
    </button>
  );

  return (
    <div id="carouselContainer" className="w-full ">
      <div className="w-full md:relative select-none ">
        <div className="carousel">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0 " key={i} ref={refs[i]}>
              <img src={img} className="w-full" />
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
};
export default Carousel;