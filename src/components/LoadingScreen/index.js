import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingScreen = ({ loading = true }) => {
    return (
        <div className='z-[99999999] flex items-center bg-overlay justify-center fixed w-screen h-screen'>
            <BeatLoader
                color={'#FC5DAB'}
                loading={loading}
                size={15}
            />
        </div>
    )
}

export default LoadingScreen;