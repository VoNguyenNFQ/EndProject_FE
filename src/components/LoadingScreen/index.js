import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingScreen = ({ loading = true }) => {
    return (
<<<<<<< HEAD
        <div className='z-[99999999] flex items-center top-0 left-0 bg-overlay justify-center fixed w-screen h-screen'>
=======
        <div className='z-[99999999] flex items-center bg-overlay justify-center fixed w-screen h-screen'>
>>>>>>> 00d98fc (Edit logic login)
            <BeatLoader
                color={'#FC5DAB'}
                loading={loading}
                size={15}
            />
        </div>
    )
}

export default LoadingScreen;