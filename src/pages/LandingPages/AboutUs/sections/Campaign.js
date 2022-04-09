import React from 'react'
import intro1 from "assets/images/intro1.jpg";
import intro2 from "assets/images/intro2.jpg";
import intro3 from "assets/images/intro3.jpg";

const Campaign = () => {
  return (
    <div>
        <div class="py-16 bg-white">
    <div  class="container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20">
        <div class="justify-center text-center gap-6 md:text-left md:flex lg:items-center  lg:gap-16">
            <div class="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
                <h1 class="text-4xl text-gray-700 font-bold md:text-5xl">Buy now</h1>
                <p class="text-lg">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                <div class="flex flex-row-reverse flex-wrap justify-center gap-4 md:gap-6 md:justify-end">
                    <button type="button" title="Start buying" class="w-full py-3 px-6 text-center rounded-xl transition bg-pink-400 shadow-xl hover:bg-gray-400 active:bg-gray-700 focus:bg-gray-600 sm:w-max">
                        <span class="block text-white font-semibold">
                            Start buying
                        </span>
                    </button>
                    
                </div>
            </div>
            <div class="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
            <div class="col-span-2 row-span-4">
                    <img src={intro2} class="rounded-full" width="640" height="960" alt="shoes" loading="lazy" />
                </div>
                <div class="col-span-2 row-span-2">
                    <img src={intro1} class="w-full h-6/7 object-cover object-top rounded-xl" width="640"  alt="shoe" loading="lazy" />
                </div>
                <div class="col-span-3 row-span-3">
                    <img src={intro3} class="w-full h-full object-cover object-top rounded-xl" width="640" height="427" alt="shoes" loading="lazy"/>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Campaign