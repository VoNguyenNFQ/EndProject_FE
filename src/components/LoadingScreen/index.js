import React from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

const LoadingScreen = () => {
    const loading = useSelector(state => state.loading);

    return (
        loading.loading &&
        <div className='z-[99999999] flex items-center top-0 left-0 bg-overlay justify-center fixed w-screen h-screen'>
            <BeatLoader
                color={'#FC5DAB'}
                loading={true}
                size={15}
            />
        </div>
    )
}

export default LoadingScreen;