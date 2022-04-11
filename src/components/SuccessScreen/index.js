import React from 'react'
import styled from "styled-components";

const StyleAnimation = styled.div`
.success-animation {
}

.checkmark {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    strokeWidth: 2;
    stroke: #4bb71b;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4bb71b;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    position:relative;
    top: 5px;
    right: 5px;
   margin: 0 auto;
}
.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    strokeWidth: 2;
    stroke-miterlimit: 10;
    stroke: #4bb71b;
    fill: #fff;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
 
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scale {
    0%, 100% {
        transform: none;
    }

    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #4bb71b;
    }
}
`

const SuccessScreen = ({msg}) => {
    return (
        <StyleAnimation>
            <div className='z-[99999999] flex items-center bg-darkoverlay justify-center fixed top-0 left-0 w-screen h-screen'>
                <div className=" p-4 w-full max-w-xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow py-10">
                        <div className="p-6 space-y-6">
                            <div className="success-animation">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                            </div>
                        </div>
                        <p className='text-center text-xl font-bold leading-6 text-gray-600 mb-15 mt-5'>{msg}</p>
                                       
                        </div>
                </div>
            </div>

        </StyleAnimation>
    )
}

export default SuccessScreen