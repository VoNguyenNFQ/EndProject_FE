import React, { useState, useRef } from 'react'
import {Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import LoadingScreen from 'components/LoadingScreen'

const CheckOut = () => {
  const fullNameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /^\d{10}$/;
  const [message, setMessage] = useState()

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    alert(data)
  }
  return (
    <div>
      <div className="mx-40 mt-8">
        <div className="lg:flex lg:shadow-lg lg:rounded-lg my-10">
          {/*------------------------------------ CART -------------------- */}
          <div className="lg:w-4/6 w-full bg-white p-1 sm:p-2 lg:p-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold text-2xl">Shipping Information</h1>
              {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
            </div>
            
            {/* ----------------------------------Shipping Information FORM --------------------------- */}
            <div className='w-full mt-3'>
              <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="mb-2 max-w-lg">
                                <label className="text-md font-medium leading-none text-gray-800">
                                    {" "}
                                    Full name{" "}<span className="text-red-500">*</span>
                                </label>
                                <input id="fullname" aria-labelledby="fullname"
                                    type="text"
                                    {...register("fullName",
                                        {
                                            required: "This field is required!",
                                            pattern: {
                                                value: fullNameRegex,
                                                message: "Invalid full name!"
                                            }
                                        })
                                    }
                                    className="border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2" />
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.fullName && errors?.fullName.message}
                                </p>
                            </div>
                            <div className="max-w-lg mb-2">
                                <label htmlFor="email" className="text-md font-medium leading-none text-gray-800">
                                    {" "}
                                    Email{" "}<span className="text-red-500">*</span>
                                </label>
                                <input id="email" aria-labelledby="email"
                                    type="text"
                                    {...register("email",
                                        {
                                            required: "This field is required!",
                                            pattern: {
                                                value: emailRegex,
                                                message: "Invalid email!"
                                            }
                                        },
                                    )}
                                    className="border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2" />
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.email && errors?.email.message || message}
                                </p>
                            </div>
                            <div className="max-w-lg mb-2 w-full">
                                <label htmlFor="phonenumber" className="text-md font-medium leading-none text-gray-800">
                                    {" "}
                                    Phone number{" "}<span className="text-red-500">*</span>
                                </label>
                                <input id="phonenumber" aria-labelledby="text"
                                    type="text" {...register("phone",
                                        {
                                            required: "This field is required!",
                                            pattern: {
                                                value: phoneRegex,
                                                message: "Invalid phone number!"
                                            }
                                        },
                                    )}
                                    className="border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2" />
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.phone && errors?.phone.message}
                                </p>
                            </div>
                            <div className="mb-2 max-w-lg">
                                <label className="text-md font-medium leading-none text-gray-800">
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
                                    className="border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2" />
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.address && errors?.address.message}
                                </p>
                            </div>
                            <div className="mt-8 flex justify-center item-center">
                                <button type="submit" className=" text-md font-semibold leading-none text-white focus:outline-none bg-pink-400 rounded hover:bg-pink-500 py-4 w-1/3">
                                  Submit
                                </button>
                            </div>
                        </form>
            </div>

            {/* ---------------------------------- FORM --------------------------- */}

          </div>
          {/*---------------------------------- SUMMARY -------------------------------------------------------*/}
          <div id="summary" className="lg:w-2/5 w-full px-8 py-10">
            <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
           
            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-md text-pink-500 uppercase">
                <span>Total cost</span>
                <span className="">$600</span>
              </div>
             
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckOut