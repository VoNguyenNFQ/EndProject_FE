import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { changPassword } from 'utils/callAPIs';
import SuccessScreen from 'components/SuccessScreen';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'actions/loading';

const ChangePassword = () => {

    const passwordRegrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    const [showPass, setShowPass] = useState(false)
    const [startAnimation, setStartAnimation] = useState(false)
    const [msg, setMsg ] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const password1 = useRef({});
    password1.current = watch("newpassword", "");
    const onSubmit = async data => {
        const payload = {
            "oldPassword" : data.currentpassword,
            "newPassword" : data.newpassword
        }
        dispatch(showLoader())
        changPassword(payload).then(response => {
            if (response.status == 204) {
                dispatch(hideLoader())
                setMsg("Change password successfully!")
                setStartAnimation(true)
                localStorage.removeItem('tokenUser')
                setTimeout(() => {
                    navigate("/sign-in")
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
            {startAnimation && <SuccessScreen msg={msg}/>}
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className=" mb-2 ">
                    <label htmlFor="password" className="text-md font-medium leading-none text-gray-800">
                        {" "}
                        Current Password{" "}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center justify-center w-full">
                        <input id="password"
                            type={showPass ? "text" : "password"}
                            {...register("currentpassword", {
                                required: "This field is required!",
                            })}
                            className="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />

                    </div>
                    <p className="text-sm text-red-500 mt-2">
                        {errors.currentpassword && errors?.currentpassword.message}
                    </p>

                </div>

                <div className=" mb-2 ">
                    <label htmlFor="password" className="text-md font-medium leading-none text-gray-800">
                        {" "}
                        New Password{" "}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center justify-center w-full">
                        <input id="password"
                            type="password"
                            {...register("newpassword", {
                                required: "This field is required!",
                                pattern: {
                                    value: passwordRegrex,
                                    message: "Password must have at least 08 characters, 01 uppercase letter, 01 lowercase letter"
                                }
                            })}
                            className="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />

                    </div>
                   
                    <p className="text-sm text-red-500 mt-2">
                        {errors.newpassword && errors?.newpassword.message}
                    </p>

                </div>

                <div className="mt-2w-full mb-2">
                    <label htmlFor="repassword" className="text-md font-medium leading-none text-gray-800">
                        {" "}
                        Confirm New Password{" "}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center justify-center w-full">
                        <input id="repassword"
                            type="password"
                            {...register("repassword", {
                                required: "This field is required!",
                                validate: value =>
                                    value === password1.current || "The passwords do not match"
                            })}
                            className="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                      
                    </div>
                    <p className="text-sm text-red-500 mt-2">
                        {errors.repassword && errors?.repassword.message}
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

export default ChangePassword