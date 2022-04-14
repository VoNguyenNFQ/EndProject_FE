import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { getOrderDetail } from 'utils/callAPIs'
import { formatMoney } from 'utils/formatNumber';
import BeatLoader from "react-spinners/BeatLoader"
import ConfirmCancelModal from 'components/ConfirmCancelOrder';
import { useDispatch } from 'react-redux'
import { showAlert } from 'actions/alert'
import { hideLoader, showLoader } from './../../../actions/loading';
import { cancelOrder } from 'utils/callAPIs'
import SuccessScreen from 'components/SuccessScreen';
const OrderDetail = () => {
    let id = useParams().id;
    const [orderDetail, setOrderDetail] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cancelMessage, setCancelMessage] = useState('')
    const [msg, setMsg] = useState('')
    const [showAnimation, setShowAnimation] = useState(false)
    const dispatch = useDispatch();

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
    const handleCancel = (orderId) => {
        dispatch(showLoader())
        cancelOrder(orderId, cancelMessage)
            .then(response => {
                if (response.status == 204) {
                    dispatch(hideLoader())
                    setShowConfirm(false)
                    setMsg('Cancel Order Successfully!')
                    setOrderDetail({ ...orderDetail, status: 'Canceled' })
                    setShowAnimation(true)
                    setTimeout(() => {
                        setShowAnimation(false)
                    }, 3000);
                }
                else {
                    setShowDialog(false)
                    dispatch(showAlert({ type: "error", message: "Cancel unsuccefully! There's something wrong :(" }))
                }
            })
    }


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

                    {showConfirm &&
                        <ConfirmCancelModal
                            setShow={setShowConfirm}
                            id={id}
                            handleCancelOrder={handleCancel}
                            setCancelMessage={setCancelMessage} />
                    }

                    {showAnimation && <SuccessScreen msg={msg} />}
                    <div>
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
                                        <div>
                                            {orderDetail.status == 'Approved' ?
                                                <button
                                                    onClick={() => setShowConfirm(true)}
                                                    className='flex justify-end bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md px-4 py-2 transition  ease-in-out'>
                                                    Cancel Order
                                                </button>
                                                :
                                                (
                                                    orderDetail.status == 'Canceled' || orderDetail.status == 'Completed' ?
                                                        <></>
                                                        :
                                                        <button
                                                            onClick={() => dispatch(showAlert({ type: "error", message: "Rejected! Your order is delivered." }))}
                                                            className='flex justify-end bg-gray-300 hover:bg-gray-400 text-white font-semibold rounded-md px-4 py-2 transition  ease-in-out'>
                                                            Cancel Order
                                                        </button>
                                                )
                                            }
                                        </div>
                                    </div>


                                    <div className="flex font-bold w-full justify-between py-6 text-base text-pink-500 ">
                                        <div className='w-1/6 flex justify-center '>Code: #{orderDetail.id}</div>

                                        <div className='flex justify-center items-center' >
                                            <span className=' text-center text-gray-800'>{orderDetail.status != 'Completed' && 'Status:'}</span>
                                            <span className={`${orderDetail.status == 'Canceled' && 'text-red-500'} ${orderDetail.status == 'Completed' || orderDetail.status == 'Approved' ? 'text-green-500' : ''} uppercase ml-1 text-center flex flex-row`}>
                                                {orderDetail.status}
                                                {orderDetail.status == 'Completed'
                                                    && <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>}
                                            </span>
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
                                        <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full pl-8">
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
                                    <div className="flex font-bold w-full justify-end pb-6 text-base">

                                        <div className='w-4/6'></div>
                                        <div className='w-1/6 flex justify-start text-md font-semibold leading-4  text-gray-800'>
                                            <span>Shipping cost</span>
                                        </div>
                                        <div className='w-1/6 flex justify-center'>
                                            <span className="text-md font-semibold leading-4  text-gray-800l">{formatMoney(orderDetail.shippingCost)}</span>
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

            </div>
        </div>
    )
};

export default OrderDetail;
