import React from 'react'
import introduction from "assets/images/introduction.jpg";

const Introduction = () => {
  return (
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-strech mx-4">
          <div className="lg:w-5/12 flex justify-center items-center">
            <div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold text-gray-900 w-7/12">Vascara</h1>
              <p className="md:w-7/12 lg:w-11/12 xl:w-10/12 lg:mt-5 text-xl leading-normal text-gray-600">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>
          </div>
          <div className="lg:w-7/12 md:mt-8 lg:mt-0">
            <div className="relative w-full h-full">
              <img src={introduction} className="w-full h-full relative hidden lg:block" />
              <div className="hidden lg:block absolute bottom-0 right-0 bg-red-200 w-200">
                <button className="bg-gray-100 text-gray-600 text-xl xl:text-2xl font-medium text-white flex justify-center w-full items-center py-5 xl:p-6 hover:text-gray-400">
                  Discover More
                  <div>
                    <svg className="fill-stroke ml-2" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66663 16H25.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 21.3333L25.3333 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 10.667L25.3333 16.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-6 md:mt-8 lg:hidden">
            <img src={introduction} className="w-full h-full relative hidden lg:block" />

              <button className="bg-gray-100 text-gray-700 md:text-xl font-semibold leading-tight flex justify-center items-center px-4 py-4 lg:py-7 lg:px-7 md:w-5/12 hover:text-gray-400">
                Discover More
                <div>
                  <svg className="fill-stroke ml-5" width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path d="M0.453735 12H14.4537" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.4539 16L14.4539 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.4539 8L14.4539 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="21.7269" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Introduction