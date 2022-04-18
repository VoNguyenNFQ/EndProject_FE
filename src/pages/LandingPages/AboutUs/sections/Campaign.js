import React, {useEffect} from 'react'
import intro1 from "assets/images/intro1.jpg";
import intro2 from "assets/images/intro2.jpg";
import intro3 from "assets/images/intro3.jpg";

const Campaign = () => {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div>
            <div className="p-5 bg-white">

                <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20" 
                data-aos="fade-up"
                        data-aos-duration="1000">
                    <div className="justify-center text-center gap-6 md:text-left md:flex lg:items-center  lg:gap-16">
                        <div className="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12" 
                        >
                        <h1 className="text-4xl text-gray-700 font-bold md:text-5xl">Sale up to <span className="text-pink-500">30% off</span></h1>
                            <p className="text-lg">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                            <div className="flex flex-row-reverse flex-wrap justify-center gap-4 md:gap-6 md:justify-end">
                                <button type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-xl transition bg-pink-400 shadow-xl hover:bg-pink-400 active:bg-gray-700 focus:bg-gray-600 sm:w-max">
                                    <span className="block text-white font-semibold">
                                        Start buying
                                    </span>
                                </button>

                            </div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12" 
>
                            <div className="col-span-2 row-span-4" >
                                <img src={intro2} className="rounded-full" width="640" height="960" alt="shoes" loading="lazy" />
                            </div>
                            <div className="col-span-2 row-span-2">
                                <img src={intro1} className="w-full h-6/7 object-cover object-top rounded-xl" width="640" alt="shoe" loading="lazy" />
                            </div>
                            <div className="col-span-3 row-span-3" >
                                <img src={intro3} className="w-full h-full object-cover object-top rounded-xl" width="640" height="427" alt="shoes" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaign