import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader"
import { formatMoney } from 'utils/formatNumber'
import { getAllOrder } from 'utils/callAPIs'
import UserDashboard from '../UserDashboard'
import { useSelector } from 'react-redux';

const PendingOrderList = () => {
    const [loading, setLoading] = useState(false);
    const [listOrders, setListOrders] = useState([])
    const [total, setTotal]= useState(0)

    const badgeCart = useSelector(state => state.badgeCart)

    useEffect(async () => {

        setLoading(true)
        const getDATA = async () => {
            return await getAllOrder(0)
                .then((response) => {
                    setTotal(response.total)
                    setListOrders(response.data)
                    setLoading(false)
                })
                .catch(err => console.log(err.statusText));
        }

        getDATA()
    }, [])
    return (
        <div>
            <div className="w-full p-1 sm:p-2 ">
                <div class="flex lg:justify-end justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {total}
                        </span>
                        <span class="text-sm text-blueGray-400">Orders</span>
                    </div>
                    <div class="mr-4 p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"> {badgeCart.quantity}</span><span class="text-sm text-blueGray-400">Items in cart</span>
                    </div>
                </div>
                <UserDashboard listOrders={listOrders} />

                {/*------------------  order--------------------- */}
                {loading ?
                    <div className='flex items-center justify-center h-[200px]'> <BeatLoader
                        color={'#FC5DAB'}
                        loading={loading}
                        size={15}
                    />
                    </div>
                    : (

                        listOrders.length ? listOrders.map((order) => {
                            if (order.status == 'Pending') {
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
                                                            <div className="w-1/6 flex justify-center hidden sm:block">
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
                            }
                        })
                            : <div className='flex items-center flex-col justify-center '>
                                <Link exact="true" to="/product-list" className="flex font-semibold text-pink-500 hover:text-pink-400 text-md mt-5">
                                    <svg className="fill-current mr-2 text-pink-500 hover:text-pink-400 w-4" viewBox="0 0 448 512">
                                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                    </svg>
                                    Continue Shopping
                                </Link>

                            </div>
                    )

                }


                {/*-------------------------------------------  order----------------------------- */}


            </div>
        </div>
    )
}

export default PendingOrderList