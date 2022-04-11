import React, { useState, useEffect } from 'react'
import { countSummary, getChartData } from 'utils/callAdminAPIs'
import { hideLoader, showLoader } from 'actions/loading';
import { useDispatch } from 'react-redux';
import { formatMoney } from 'utils/formatNumber';
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  registerables,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  // CategoryScale,
  // LinearScale,
  // PointElement,
  // LineElement,
  // Bar,
  // Title,
  // Tooltip,
  // Legend
  ...registerables
)

const MainDashboard = () => {
  let date = new Date()
  let today = date.getFullYear() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getDate()
  const [chosenDate, setChosenDate] = useState(today.toString());
  const [chartData, setChartData] = useState({});
  const [count, setCount] = useState({})
  const dispatch = useDispatch();
  const handleDateSelect = async (date) => {
    dispatch(showLoader())
    return await countSummary(date)
      .then((response) => {
        setCount(response)
        dispatch(hideLoader())
      })
      .catch(err => console.log(err.statusText));
  }
  useEffect(async () => {

    const getCount = async () => {
      dispatch(showLoader())
      return await countSummary(chosenDate)
        .then((response) => {
          setCount(response)
          dispatch(hideLoader())
        })
        .catch(err => console.log(err.statusText));
    }
    const getDATA = async () => {
      return await getChartData(date)
        .then((response) => {
          setChartData(response)
        })
        .catch(err => console.log(err.statusText));
    }
    getDATA()
    getCount()
  }, [])

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#F956B1"
      }
    ]
  };
  const totalOrders = {

    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
    datasets: [
      {
        label: new Date().getFullYear() - 1,
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: [30, 78, 56, 34, 100, 45, 13],
        fill: false,
        barThickness: 10,
      },
      {
        label: new Date().getFullYear(),
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        data: [27, 68, 86, 74, 10, 4, 87],
        barThickness: 10,
      },
    ],

  }


  return (
    <div className='md:ml-64'>
      <div className='bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'>
        <div className='mx-auto max-w-full'>
          <div className='flex justify-start mb-5 ml-4'>



            <input
              class="form-select appearance-none h-10 block w-1/10 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type={"date"}
              max={today.toString()}
              onChange={(e) => { setChosenDate(e.target.value); handleDateSelect(chosenDate) }}
            />


          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Revenue
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {formatMoney(count.revenue)}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Total order
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Shipping Cost
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {formatMoney(count.totalShippingCost)}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <i class="fa-solid fa-truck-fast"></i>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Purchased Items
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.totalItem}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <i class="fa-solid fa-bag-shopping"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*---------------------------------------------- ROW 2 ---------------------------------------- */}

            <div className='px-4 mb-10'>
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto px-4 py-5">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        class="text-gray-400 uppercase font-bold text-base">
                        Pending order
                      </h5>
                      <span class="font-semibold text-xl text-gray-700">
                        {count.amountPendingOrder}
                      </span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Approved order
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountApprovedOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Completed order
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountCompletedOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-4 mb-10'>
              <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-400 uppercase font-bold text-base">
                        Canceled Orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.totalItem}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
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
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-50">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">

                      <h2 className="text-gray-800 uppercase font-bold text-base">
                        Sales value
                      </h2>
                    </div>
                  </div>
                </div>
                <div class="p-4 flex-auto">
                  <div class="relative h-450-px">
                    <Line data={data} />
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:col-start-5 xl:col-end-7 px-4 mb-16' >
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h2 className="text-gray-800 uppercase font-bold text-base">
                        Total orders
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-[375px]">
                    <Bar
                      data={totalOrders}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                          display: false,
                          text: "Orders Chart",
                        },
                        tooltips: {
                          mode: "index",
                          intersect: false,
                        },
                        hover: {
                          mode: "nearest",
                          intersect: true,
                        },
                        legend: {
                          labels: {
                            fontColor: "rgba(0,0,0,.4)",
                          },
                          align: "end",
                          position: "bottom",
                        },
                        scales: {
                          xAxes: [
                            {
                              display: false,
                              scaleLabel: {
                                display: true,
                                labelString: "Month",
                              },
                              gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                              },
                            },
                          ],
                          yAxes: [
                            {
                              display: true,
                              scaleLabel: {
                                display: false,
                                labelString: "Value",
                              },
                              gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.2)",
                                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                              },
                            },
                          ],
                        },
                      }}
                    />

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