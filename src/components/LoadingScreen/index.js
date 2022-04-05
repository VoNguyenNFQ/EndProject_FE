import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingScreen = ({ loading = true }) => {
    return (
        <div className='z-[99999999] flex items-center top-0 left-0 bg-overlay justify-center fixed w-screen h-screen'>
            <BeatLoader
                color={'#FC5DAB'}
                loading={loading}
                size={15}
            />
        </div>
    )
}

export default LoadingScreen;