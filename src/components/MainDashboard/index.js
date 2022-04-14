import React, { useState, useEffect } from 'react'
import { countSummary, getChartData } from 'utils/callAdminAPIs'
import { hideLoader, showLoader } from 'actions/loading';
import { useDispatch } from 'react-redux';
import { formatMoney } from 'utils/formatNumber';
import { Line, Bar } from "react-chartjs-2";
import { showAlert } from 'actions/alert';
import { formatYMD } from 'utils/formatNumber';
import FilterAdminDashboard from 'components/FilterAdminDashboard';
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
  const [fromDate, setFromDate] = useState(formatYMD(new Date()));
  const [toDate, setToDate] = useState(formatYMD(new Date()));
  const [amountDay, setAmountDay] = useState(7)
  const [chartData, setChartData] = useState([]);
  const [count, setCount] = useState({})
  const dispatch = useDispatch();

  const handleStatistic = async () => {
    if (new Date(fromDate) > new Date(toDate)) {
      dispatch(showAlert({ type: 'error', message: 'Start date cannot be later than end date!' }))
     }
    else {
      if (new Date(fromDate) > new Date()) {
        dispatch(showAlert({ type: 'error', message: 'Start date cannot be less than Today date!' }))
      }
      else{
        if (new Date(toDate) > new Date()) {
          dispatch(showAlert({ type: 'error', message: 'End date cannot be later than  today!' }))
        }
        else{
          dispatch(showLoader())

      return await countSummary(fromDate, toDate)
        .then((response) => {
          setCount(response)
          dispatch(hideLoader())
        })
        .catch(err => console.log(err.statusText));
        }
      }    
    }

  }

  const handleChangeAmountDay = async (e) => {
    setAmountDay(e.target.value)
  }

  useEffect(async () => {
    //get data lan dau
    const getCount = async () => {
      dispatch(showLoader())
      return await countSummary(toDate, toDate)
        .then((response) => {
          setCount(response)
          dispatch(hideLoader())
        })
        .catch(err => console.log(err.statusText));
    }
    const getDATA = async () => {
      return await getChartData(toDate)
        .then((response) => {
          setChartData(response)
        })
        .catch(err => console.log(err.statusText));
    }
    getDATA()
    getCount()
  }, [])



  const getDate = (data) => {
    let arr = []
    data.slice(0, amountDay).map((obj) => {
      arr.push(obj.date)
    })
    return arr
  }
  const getRevenue = (data) => {
    let arr = []
    data.slice(0, amountDay).map((obj) => {
      arr.push(obj.revenue)
    })
    return arr
  }
  const getAmountCompletedOrder = (data) => {
    let arr = []
    data.slice(0, amountDay).map((obj) => {
      arr.push(obj.amountCompletedOrder)
    })
    console.log(arr)
    return arr
  }

  const totalRevenue = {
    labels: getDate(chartData),
    datasets: [
      {
        label: "Revenue",
        data: getRevenue(chartData),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  const totalOrders = {

    labels: getDate(chartData),
    datasets: [
      {
        label: "Completed order",
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        data: getAmountCompletedOrder(chartData),
        barThickness: amountDay == 7 ? 22 : 8
      }
    ]

  }


  return (
    <div className='md:ml-64'>
      <div className='bg-white pt-5 pb-[4rem] px-3 md:px-8 h-auto'>
        <div className='mx-auto max-w-full'>

          <FilterAdminDashboard
            handleStatistic={handleStatistic}
            setFromDate={setFromDate}
            setToDate={setToDate}
            fromDate={fromDate}
            toDate={toDate}
          />


          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
            <div className='px-4 mb-10 '>
              <div
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap ">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Revenue
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {formatMoney(count.revenue ? count.revenue : 0)}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Total orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Shipping Cost
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.totalShippingCost ? formatMoney(count.totalShippingCost) : formatMoney(0)}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <i className="fa-solid fa-truck-fast"></i>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Purchased Items
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.totalItem}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-800">
                        <i className="fa-solid fa-bag-shopping"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*---------------------------------------------- ROW 2 ---------------------------------------- */}

            <div className='px-4 mb-10'>
              <div
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Approved orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountApprovedOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Delivery orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountDeliveryOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-500">
                        <i class="fa-solid fa-truck-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 mb-10'>
              <div
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Complete orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountCompletedOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto px-4 py-5">
                  <div className="flex flex-wrap">
                    <div
                      className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5
                        className="text-gray-500 uppercase font-bold text-base">
                        Canceled Orders
                      </h5>
                      <span className="font-semibold text-xl text-gray-700">
                        {count.amountCanceledOrder}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3'>
            <div className='px-4 mb-5 '>
              {/*------------------ SELECT ------------------------ */}
              <div className="mb-3 flex items-center w-full sm:w-auto ">
                <div className='w-2/3'>
                  <p className='mr-3 font-semibold text-base'>Statisticize in </p>
                </div>
                <select
                  className="form-select appearance-none h-10 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => { handleChangeAmountDay(e) }} >
                  <option value="7" selected>In 7 days</option>
                  <option value="14" >In 14 days</option>
                  <option value="30" >In 30 days</option>
                </select>
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
                className="bg-slate-100 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-50">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">

                      <h2 className="text-gray-800 uppercase font-bold text-base">
                        Sales value
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-450-px">
                    <Line data={totalRevenue}
                      options={{
                        scales: {
                          y: {
                            ticks: {
                              callback: function (value) {
                                return '$' + value;
                              },
                            }
                          }
                          ,
                          x: {
                            ticks: {
                              autoSkip: true,
                              maxTicksLimit: 7
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:col-start-5 xl:col-end-7 px-4 mb-16' >
              <div
                className="bg-slate-100 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h2 className="text-gray-800 uppercase font-bold text-base">
                        Orders
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-[370px]">
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
                          y: {
                            ticks: {
                              stepSize: 1
                            },

                          },
                          x: {
                            grid: {
                              display: false
                            },
                            ticks: {
                              autoSkip: true,
                              maxTicksLimit: 7
                            }
                          }
                        }

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