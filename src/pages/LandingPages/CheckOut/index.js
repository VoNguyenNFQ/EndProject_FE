import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import SuccessScreen from 'components/SuccessScreen'
import { getCartItem, placeOrder } from 'utils/callAPIs'
import { formatMoney } from 'utils/formatNumber'
import BeatLoader from "react-spinners/BeatLoader"
import { useDispatch } from 'react-redux'
import { showLoader, hideLoader } from 'actions/loading'
import { showAlert } from 'actions/alert'

const CheckOut = () => {
    const fullNameRegex = /(^[A-Za-z]{3,16})([ ]{0,3})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\d{10}$/;
    const [loading, setLoading] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [cartItems, setCartItems] = useState([])
 
    useEffect(async () => {
        setLoading(true)

        const getDATA = async () => {
            return await getCartItem()
                .then((response) => {
                    setCartItems(response)
                    setLoading(false);
                })
                .catch(err => console.log(err.statusText));
        }
        getDATA()

    }, [])


    const onSubmit = async (data) => {
        const payload = {
            "recipientName": data.fullName,
            "recipientEmail": data.email,
            "recipientPhone": data.phone,
            "addressDelivery": data.address,
            "shippingCost": cartItems.reduce((a, c) => a + c.unitPrice * c.amount, 0) > 300 ? 0 : 10
        }
        console.log(payload)
        dispatch(showLoader())
         placeOrder(payload)
             .then(response => {
                 if (response.status == 201) {
                     dispatch(hideLoader())
                     setStartAnimation(true)
                     setTimeout(() => {
                     navigate('/order-list')
                    }, 2000);
                 }
                else {
                    dispatch(hideLoader())
                    // alert response.data.error
                    dispatch(showAlert({type: "error", message: "Place order unsuccessfully"}))
                }
            })
    }
    if(localStorage.getItem("tokenUser")){
        return (

            <div>
                    {startAnimation && <SuccessScreen msg="Thank you, We've received your order!"/>} 

                <div className="mx-40 mt-8">
                    <div className="lg:flex lg:shadow-lg lg:rounded-lg my-10">
                        {/* ----------------------------------Shipping Information FORM --------------------------- */}
                        <div className="lg:w-5/8 w-full bg-white p-1 sm:p-2 lg:py-10 lg:pl-10 lg:pr-5">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-bold text-2xl">Shipping Information</h1>
                            </div>
                            <div className='w-full mt-3'>
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div className="mb-2 max-w-xl">
                                        <label className="text-base font-medium leading-none text-gray-800">
                                            {" "}
                                            Full name{" "}<span className="text-red-500">*</span>
                                        </label>
                                        <input id="fullname" aria-labelledby="fullname"
                                            type="text"
                                            // value={userInfo.full_name}
                                            {...register("fullName",
                                                {
                                                    required: "This field is required!",
                                                    pattern: {
                                                        value: fullNameRegex,
                                                        message: "Invalid full name!"
                                                    }
                                                })
                                            }
                                            className="border rounded text-s font-base leading-none placeholder-gray-600 text-gray-600 py-3 w-full pl-3 mt-2" />
                                        <p className="text-sm text-red-500 mt-2">
                                            {errors.fullName && errors?.fullName.message}
                                        </p>
                                    </div>
                                    <div className="max-w-xl mb-2">
                                        <label htmlFor="email" className="text-base font-medium leading-none text-gray-800">
                                            {" "}
                                            Email{" "}<span className="text-red-500">*</span>
                                        </label>
                                        <input id="email" aria-labelledby="email"
                                            type="text"
                                            //value={userInfo.email}
                                            {...register("email",
                                                {
                                                    required: "This field is required!",
                                                    pattern: {
                                                        value: emailRegex,
                                                        message: "Invalid email!"
                                                    }
                                                },
                                            )}
                                            className="border rounded text-s font-base leading-none placeholder-gray-600 text-gray-600 py-3 w-full pl-3 mt-2" />
                                        <p className="text-sm text-red-500 mt-2">
                                            {errors.email && errors?.email.message}
                                        </p>
                                    </div>
                                    <div className="max-w-xl mb-2 w-full">
                                        <label htmlFor="phonenumber" className="text-base font-medium leading-none text-gray-800">
                                            {" "}
                                            Phone number{" "}<span className="text-red-500">*</span>
                                        </label>
                                        <input id="phonenumber" aria-labelledby="text"
                                            type="text" 
                                           // value={userInfo.phone_number}
                                            {...register("phone",
                                                {
                                                    required: "This field is required!",
                                                    pattern: {
                                                        value: phoneRegex,
                                                        message: "Invalid phone number!"
                                                    }
                                                },
                                            )}
                                            className="border rounded text-s font-base leading-none placeholder-gray-600 text-gray-600 py-3 w-full pl-3 mt-2" />
                                        <p className="text-sm text-red-500 mt-2">
                                            {errors.phone && errors?.phone.message}
                                        </p>
                                    </div>
                                    <div className="mb-2 max-w-xl">
                                        <label className="text-base font-medium leading-none text-gray-800">
                                            {" "}
                                            Address{" "}<span className="text-red-500">*</span>
                                        </label>
                                        <input id="fullname" aria-labelledby="fullname"
                                            type="text"
                                            {...register("address",
                                                {
                                                    required: "This field is required!",
                                                })
                                            }
                                            className="border rounded text-s font-base leading-none placeholder-gray-600 text-gray-600 py-3 w-full pl-3 mt-2" />
                                        <p className="text-sm text-red-500 mt-2">
                                            {errors.address && errors?.address.message}
                                        </p>
                                    </div>
    
                                    {cartItems.length > 0 ?
                                        <div className="mt-8 flex justify-center item-center">
                                        <button type="submit" className=" text-base font-semibold leading-none text-white focus:outline-none bg-pink-400 rounded hover:bg-pink-500 py-4 w-1/3">
                                            Submit
                                        </button>
                                    </div>
                                    :
                                    <div className="mt-8 flex justify-center item-center">
                                        <button  className="cursor-not-allowed text-base font-semibold leading-none text-white focus:outline-none bg-gray-400 rounded py-4 w-1/3">
                                            Submit
                                        </button>
                                    </div>
                                    }
                                </form>
                            </div>
    
                            {/* ---------------------------------- FORM --------------------------- */}
    
                        </div>
                        {/*---------------------------------- SUMMARY -------------------------------------------------------*/}
                        <div id="summary" className="lg:w-3/8 w-full px-8 py-10">
                            {
                                loading ?
                                    <div className='flex items-center justify-center h-96'>
                                        <BeatLoader
                                            color={'#FC5DAB'}
                                            loading={loading}
                                            size={15} />
                                    </div>
                                    :
                                    <>
                                        <div>
                                            <h1 className="font-bold text-2xl border-b pb-8">Order Detail</h1>
    
                                            <div className="mt-3">
                                                <div className="flex flex-col  w-full">
    
                                                    {cartItems.map((item) => {
    
                                                        return <div className="flex items-center -mx-8 px-6 py-5" key={item.id}>
                                                            <div className="flex w-4/6">
                                                                <div className="w-20">
                                                                    <img className="w-90" src={item.gallery} alt="" />
                                                                </div>
                                                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                                                    <span className="font-semibold text-md">{item.name}</span>
                                                                    <span className="text-gray-500 text-s">{item.color} | Size {item.size}</span>
                                                                    <span className="font-semibold text-md ">{formatMoney(item.unitPrice)}</span>
                                                                </div>
                                                            </div>
                                                            <span className="text-center w-1/6 font-semibold text-md -mt-1">x</span>
                                                            <span className="text-center w-1/6 font-semibold text-md -mt-1">{item.amount}</span>
                                                        </div>
                                                    })}
    
                                                </div>
    
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
                                            <div className="flex justify-between mt-5 mb-5">
                                                <span className="font-semibold text-gray-600 text-md uppercase">Items</span>
                                                <span className="font-semibold text-md">{cartItems.length}</span>
                                            </div>
                                            <div className="flex justify-between mt-5 mb-5">
                                                <span className="font-semibold text-gray-600 text-md uppercase">Total quantity</span>
                                                <span className="font-semibold text-md">{cartItems.reduce((a, c) => a + c.amount, 0)}</span>
                                            </div>
                                            <div className="flex justify-between mt-5 mb-5">
                                                <span className="font-semibold text-gray-600 text-md uppercase">Cost</span>
                                                <span className="font-semibold text-md">{formatMoney(cartItems.reduce((a, c) => a + c.unitPrice * c.amount, 0))}</span>
                                            </div>
                                            <div className="flex justify-between mb-1" >
                                                <span className="font-semibold text-gray-600 text-md uppercase">Shipping cost</span>
                                                <span className="font-semibold text-md">{formatMoney(cartItems.reduce((a, c) => a + c.unitPrice * c.amount, 0) > 300 ? 0 : 10)}</span>
                                            </div>
                                            <span className='italic text-sm text-pink-500'>(*Buy more product to get free shipping cost)</span>
                                            <div className="border-t mt-5">
                                                <div className="flex font-bold justify-between py-6 text-md text-pink-500 uppercase">
                                                    <span>Total</span>
                                                    <span className="text-2xl">{formatMoney(cartItems.reduce((a, c) => a + c.unitPrice * c.amount, 0) + (cartItems.reduce((a, c) => a + c.amount, 0) > 300 ? 0 : 10))}</span>
                                                </div>
    
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
    
                    </div>
                </div>
            </div>
        )
    }
    else{
        return <Navigate to="/sign-in" replace/>
    }
}

export default CheckOut