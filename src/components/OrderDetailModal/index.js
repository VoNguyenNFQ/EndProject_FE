import React from 'react';
import { formatMoney } from 'utils/formatNumber';


const OrderDetailModal = ({ show, setShow, order }) => {
    
    const orderItems = order?.items

    return (
        <>
            {
                show &&
                <div id="extralarge-modal" class="bg-darkoverlay overflow-y-auto overflow-x-hidden fixed top-10 right-0 m-auto left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-7xl h-full md:h-auto">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            
                            {/* Modal body */}
                            <div class="">

                                <div id="popup-modal" tabindex="-1" class=" flex items-center justify-center tabindex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                                    <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <div class="flex justify-end p-2">
                                                <button onClick={() => setShow(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                            <div className="w-full p-1 sm:p-2 lg:px-10 ">
                                                
                                                <div className="flex font-bold w-full justify-between py-6 text-base text-pink-500 ">
                                                    <div className='w-1/6 flex justify-center '>Code: #{order.id}</div>

                                                    <div className='flex justify-center items-center' >
                                                        <span className=' text-center text-gray-400'>Status:</span>
                                                        <span className="uppercase ml-1 text-center"> {order.status}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full border-b-2 border-gray-200">

                                                    {/*---------------- ITEM in Order------------------- */}
                                                    {orderItems.map((element) => {
                                                        return <div className="flex items-center -mx-8 px-6 pb-5" key={element.id}>
                                                            <div className="flex w-full">
                                                                <div className="w-1/6 flex justify-center">
                                                                    <img className="w-[70px]" src={element.gallery} alt="" />
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
                                                            <p className="text-gray-500 text-s">{order.recipientName}</p>
                                                            <p className="text-gray-500 text-s">{order.recipientEmail}</p>

                                                        </div>
                                                        <div className="flex jusitfy-start items-start flex-col space-y-2">
                                                            <p className="text-md font-semibold leading-4  text-gray-800">Shipping Information</p>
                                                            <p className="text-gray-500 text-s">{order.recipientPhone}</p>
                                                            <p className="text-gray-500 text-s">{order.addressDelivery}</p>
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
                                                        <span className="text-md font-semibold leading-4  text-gray-800l">{order.amount}</span>
                                                    </div>
                                                </div>
                                                <div className="flex font-bold w-full justify-end pb-6 text-base text-pink-500 uppercase">

                                                    <div className='w-4/6'></div>
                                                    <div className='w-1/6 flex items-center justify-start'>
                                                        <span>Total cost</span>
                                                    </div>
                                                    <div className='w-1/6 flex justify-center'>
                                                        <span className="text-xl">{formatMoney(order.totalPrice)}</span>
                                                    </div>
                                                </div>
                                                {/*-------------------------------------------- Summary Cost-------------------------- */}
                                                {/*-------------------------------------------  order----------------------------- */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default OrderDetailModal;