import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { editProfile } from 'utils/callAPIs';
import SuccessScreen from 'components/SuccessScreen';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'actions/loading';

const EditProfile = ({editUserInfo}) => {
  const fullNameRegex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
  const phoneRegex = /^\d{10}$/;
  const [startAnimation, setStartAnimation] = useState(false)
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const [msg, setMsg] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async data => {
    const payload = {
      "fullName": data.fullName,
      "phoneNumber": data.phone
    }
    dispatch(showLoader())
    editProfile(payload).then(response => {
      if (response.status == 204) {
        dispatch(hideLoader())
        setMsg("Update profile successfully!")
        setStartAnimation(true)
        localStorage.setItem('userInfo', JSON.stringify({...userInfo, full_name: data.fullName, phone_number: data.phone}))
        editUserInfo({...userInfo, full_name: data.fullName, phone_number: data.phone})
        setTimeout(() => {
          setStartAnimation(false)
      }, 2000);
      }
      if (response.status == 400) {
        dispatch(hideLoader())
        // alert 
        dispatch(showAlert({ type: "error", message: response.data.error.email }))
      }
    })
  };
  return (
    <div>
      {startAnimation && <SuccessScreen msg={msg} />}
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
                value: userInfo.full_name,
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
        <div className="max-w-lg mb-2 w-full">
          <label htmlFor="phonenumber" className="text-md font-medium leading-none text-gray-800">
            {" "}
            Phone number{" "}<span className="text-red-500">*</span>
          </label>
          <input id="phonenumber" aria-labelledby="text"
            type="text" {...register("phone",
              {
                required: "This field is required!",
                value: userInfo.phone_number,
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

        <div className="mt-8 flex justify-center item-center">
          <button type="submit" className=" text-md font-semibold leading-none text-white focus:outline-none bg-pink-400 rounded hover:bg-pink-500 py-4 w-1/3">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile