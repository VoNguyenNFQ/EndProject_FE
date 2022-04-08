import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { getOrderDetail } from 'utils/callAPIs'
import { formatMoney } from 'utils/formatNumber';
import BeatLoader from "react-spinners/BeatLoader"

const OrderDetail = () => {
    let id = useParams().id;
    const [orderDetail, setOrderDetail] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(async () => {
        setLoading(true)

        getOrderDetail(id)
            .then((response) => {
                setOrderDetail(response)
                setOrderItems(response.items)
                setLoading(false)
            })
            .catch(err => console.log(err.statusText));

    }, [])


    return (
        <div className="mx-10 lg:mx-[300px] mt-8">
            <div className="lg:flex lg:flex-col lg:shadow-lg lg:rounded-lg my-5 bg-slate-50">
                {
                    loading ?
                        <div className='flex items-center justify-center h-[700px]'>
                            <BeatLoader
                                color={'#FC5DAB'}
                                loading={loading}
                                size={15} />
                        </div>
                        :
                        <div className="w-full p-1 sm:p-2 lg:p-10 ">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-bold text-2xl">Your order</h1>
                            </div>


                            <div className="flex font-bold w-full justify-between py-6 text-base text-pink-500 ">
                                <div className='w-1/6 flex justify-center '>Code: #{orderDetail.id}</div>

                                <div className='flex justify-center items-center' >
                                    <span className=' text-center text-gray-400'>Status:</span>
                                    <span className="uppercase ml-1 text-center"> {orderDetail.status}</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full border-b-2 border-gray-200">

                                {/*---------------- ITEM in Order------------------- */}
                                {orderItems.map((element) => {
                                    return <div className="flex items-center -mx-8 px-6 pb-5" key={element.id}>
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
                                })}
                                {/*-------------------- ITEM in Order---------------------- */}

                            </div>

                            {/* RECIPIENT INFO */}
                            <div className="flex flex-col w-full border-b-2 border-gray-200 py-5">
                                <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
                                    <div className="flex jusitfy-start items-start flex-col space-y-2">
                                        <p className="text-md font-semibold leading-4  text-gray-800">Recipient Information</p>
                                        <p className="text-gray-500 text-s">{orderDetail.recipientName}</p>
                                        <p className="text-gray-500 text-s">{orderDetail.recipientEmail}</p>

                                    </div>
                                    <div className="flex jusitfy-start items-start flex-col space-y-2">
                                        <p className="text-md font-semibold leading-4  text-gray-800">Shipping Information</p>
                                        <p className="text-gray-500 text-s">{orderDetail.recipientPhone}</p>
                                        <p className="text-gray-500 text-s">{orderDetail.addressDelivery}</p>
                                    </div>
                                </div>
                            </div>
                            {/* RECIPIENT INFO */}

                            {/* --------------------SUMMARY COST --------------------------*/}
                            <div className="flex font-bold w-full justify-end py-6 text-base">

                                <div className='w-4/6'></div>
                                <div className='w-1/6 flex justify-start text-md font-semibold leading-4  text-gray-800'>
                                    <span>Items</span>
                                </div>
                                <div className='w-1/6 flex justify-center'>
                                    <span className="text-md font-semibold leading-4  text-gray-800">{orderItems.length}</span>
                                </div>
                            </div>
                            <div className="flex font-bold w-full justify-end pb-6 text-base">

                                <div className='w-4/6'></div>
                                <div className='w-1/6 flex justify-start text-md font-semibold leading-4  text-gray-800'>
                                    <span>Quantity</span>
                                </div>
                                <div className='w-1/6 flex justify-center'>
                                    <span className="text-md font-semibold leading-4  text-gray-800l">{orderDetail.amount}</span>
                                </div>
                            </div>
                            <div className="flex font-bold w-full justify-end pb-6 text-base text-pink-500 uppercase">

                                <div className='w-4/6'></div>
                                <div className='w-1/6 flex items-center justify-start'>
                                    <span>Total cost</span>
                                </div>
                                <div className='w-1/6 flex justify-center'>
                                    <span className="text-xl">{formatMoney(orderDetail.totalPrice)}</span>
                                </div>
                            </div>
                            {/*-------------------------------------------- Summary Cost-------------------------- */}
                            {/*-------------------------------------------  order----------------------------- */}

                            <Link exact="true" to="/product-list" className="flex font-semibold text-pink-500 hover:text-pink-400 text-md mt-5">
                                <svg className="fill-current mr-2 text-pink-500 hover:text-pink-400 w-4" viewBox="0 0 448 512">
                                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                                Continue Shopping
                            </Link>

                        </div>

                }</div>
        </div>
    )
};

export default OrderDetail;
