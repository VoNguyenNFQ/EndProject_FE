import React from 'react'

const MainDashboard = () => {
  return (
    <div className='md:ml-64'>
      <div className='bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'>
        <div className='mx-auto max-w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
            <div className='px-4 mb-10'>
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1"
                    >
                      <h5
                        class="text-gray-400 uppercase font-bold text-xs"
                      >
                        Traffic
                      </h5>
                      <span class="font-semibold text-xl text-gray-700">
                        350,897
                      </span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                      >
                        <i class="far fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400 mt-4">
                    <span class="text-emerald-500 mr-2">
                      <i class="fas fa-arrow-up"></i> 3.48%
                    </span>
                    <span class="whitespace-nowrap">
                      Since last month
                    </span>
                  </p>
                </div>
              </div>

            </div>
            <div className='px-4 mb-10'>
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1"
                    >
                      <h5
                        class="text-gray-400 uppercase font-bold text-xs"
                      >
                        Traffic
                      </h5>
                      <span class="font-semibold text-xl text-gray-700">
                        350,897
                      </span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                      >
                        <i class="far fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400 mt-4">
                    <span class="text-emerald-500 mr-2">
                      <i class="fas fa-arrow-up"></i> 3.48%
                    </span>
                    <span class="whitespace-nowrap">
                      Since last month
                    </span>
                  </p>
                </div>
              </div>

            </div>
            <div className='px-4 mb-10'>
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1"
                    >
                      <h5
                        class="text-gray-400 uppercase font-bold text-xs"
                      >
                        Traffic
                      </h5>
                      <span class="font-semibold text-xl text-gray-700">
                        350,897
                      </span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                      >
                        <i class="far fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400 mt-4">
                    <span class="text-emerald-500 mr-2">
                      <i class="fas fa-arrow-up"></i> 3.48%
                    </span>
                    <span class="whitespace-nowrap">
                      Since last month
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className='px-3 md:px-8 h-auto -mt-16'>
        <div className='mx-auto max-w-full'>
          <div className='grid grid-cols-1 xl:grid-cols-6'>
            <div className='xl:col-start-1 xl:col-end-5 px-4 mb-16'>
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700"
              >
                <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                      <h6
                        class="uppercase text-gray-100 mb-1 text-xs font-semibold"
                      >
                        Overview
                      </h6>
                      <h2 class="text-white text-xl font-semibold">
                        Sales value
                      </h2>
                    </div>
                  </div>
                </div>
                <div class="p-4 flex-auto">
                  <div class="relative h-350-px">
                    <canvas id="line-chart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:col-start-5 xl:col-end-7 px-4 mb-16' >
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
              >
                <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                      <h6
                        class="uppercase text-gray-400 mb-1 text-xs font-semibold"
                      >
                        Performance
                      </h6>
                      <h2 class="text-gray-700 text-xl font-semibold">
                        Total orders
                      </h2>
                    </div>
                  </div>
                </div>
                <div class="p-4 flex-auto">
                  <div class="relative h-350-px">
                    <canvas id="bar-chart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard