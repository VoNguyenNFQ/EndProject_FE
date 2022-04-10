import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader"
import { formatMoney } from 'utils/formatNumber'
import { getAllOrder, cancelOrder } from 'utils/callAPIs'
import UserOrderSort from 'components/UserOrderSort'
const UserOrderList = () => {
  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState(0)

  const handleChangeStatus = (statusID) => {
    setLoading(true)
    setListOrders([]);
    setStatusFilter(statusID)
    getAllOrder(statusID)
      .then(response => {
        setLoading(false)
        setListOrders(response.data)
      })
      .catch(error => console.log(error))
  }


  useEffect(async () => {

    setLoading(true)

    const getDATA = async () => {
      return await getAllOrder(statusFilter)
        .then((response) => {
          setListOrders(response.data)
          setLoading(false)
        })
        .catch(err => console.log(err.statusText));
    }

    getDATA()

  }, [])

  if (localStorage.getItem("tokenUser")) {
    return (
      <div>
        <div className="relative block ">
          <div className="absolute top-0 w-full h-[300px] py-5 bg-center bg-cover  bg-gradient-to-r from-slate-400 to-pink-400" >
            {/* <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span> */}
          </div>
          {/* style="transform: translateZ(0px)" */}
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" >
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
        <div className="relative py-[100px] bg-blueGray-200">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-4/6 mx-auto mb-6 shadow-xl rounded-lg h-full">
            <div className='mt-5 ml-4'>
              <UserOrderSort handleChangeStatus={handleChangeStatus} statusFilter={statusFilter} />
            </div>

            {/*---------------------------------------------- SORT section----------------------------------------- */}

            <div className="w-full p-1 sm:p-2 lg:p-10 ">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-bold text-2xl">Your order</h1>
                <p className="font-semibold text-xl">{listOrders.length} orders</p>
              </div>
              {/*------------------  order--------------------- */}
              {loading ?
                <div className='flex items-center justify-center h-[400px]'> <BeatLoader
                  color={'#FC5DAB'}
                  loading={loading}
                  size={15}
                />
                </div>
                : (
                  listOrders.length ? listOrders.map((order) => {
                    return <>

                      <div className="flex font-bold w-full justify-between py-6 text-base text-pink-500 ">
                        <div className='w-1/6 flex justify-center '>Code: #{order.id}</div>

                        <div className='flex justify-center items-center' >
                          <span className=' text-center text-gray-800'>{order.status != 'Completed' && 'Status:'}</span>
                          <span className={`${order.status == 'Canceled' && 'text-red-500'} ${order.status == 'Completed' || order.status == 'Approved' ? 'text-green-500' : ''} uppercase ml-1 text-center flex flex-row`}>
                            {order.status}
                            {order.status == 'Completed'
                              && <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                              </svg>}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col w-full border-b-2 border-gray-200">

                        {/*---------------- ITEM in Order------------------- */}
                        {order.items.map((element) => {
                          return <>
                            <Link exact="true" to={`/order-list/${order.id}`}
                              key={order.id}
                            >
                              <div className="flex items-center -mx-8 px-6 pb-5" key={element.id}>
                                <div className="flex w-full">
                                  <div className="w-1/6 flex justify-center">
                                    <img className="w-20" src={element.gallery} alt="" />
                                  </div>
                                  <div className="flex flex-col justify-start w-3/6 flex-grow">
                                    <span className="font-semibold text-lg">{element.name}</span>
                                    <span className="text-gray-500 text-s">{element.color} | Size {element.size}</span>
                                  </div>
                                  <span className="font-semibold  text-md w-1/6">{formatMoney(element.unitPrice)}</span>

                                  <span className="text-center w-1/6 font-semibold text-md">x {element.amount}</span>

                                </div>
                              </div>
                            </Link>
                          </>
                        })}
                        {/*-------------------- ITEM in Order---------------------- */}

                      </div>

                      <div className="flex font-bold w-full justify-end py-6 text-base text-pink-500 uppercase">
                        <div className='w-4/6'></div>
                        <div className='w-1/6 flex justify-start items-center'>
                          <span>Total cost</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                          <span className="text-xl">{formatMoney(order.totalPrice)}</span>
                        </div>
                      </div>

                    </>
                  })
                    : <div className='flex items-center justify-center h-[400px]'>
                      <p className='text-xl text-center text-gray-400'>Nothing to show</p>
                    </div>
                )

              }


              {/*-------------------------------------------  order----------------------------- */}

              <Link exact="true" to="/product-list" className="flex font-semibold text-pink-500 hover:text-pink-400 text-md mt-5">
                <svg className="fill-current mr-2 text-pink-500 hover:text-pink-400 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      </div>
    )
  }
  else {
    return <Navigate to="/sign-in" replace />
  }
}

export default UserOrderList                                                                                                                                                                                                                                                                                                                                                                                                                                                                            