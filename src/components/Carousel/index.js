import React, { useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import styles from './styles.css'
const Carousel = ({images}) => {
  //storing the index of the current image in the state
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = i => {
    setCurrentImage(i);
    
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
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
    <div className="max-w-screen-xl m-auto">
      <div className="w-full relative select-none">
        <div className="carousel">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
              <img src={img.path} className="" />
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
};
export default Carousel;