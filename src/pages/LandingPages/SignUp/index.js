import React, { useState, useRef } from 'react'
import signup from "assets/images/signup.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { signupFunction } from 'utils/callAPIs';
import LoadingScreen from 'components/LoadingScreen';
import RowAlert from 'components/RowAlert';
import SuccessSignUp from 'components/SuccessSignUp';
const SignUp = () => {
    const [showPass, setShowPass] = useState(false)
    const [showRePass, setShowRePass] = useState(false)
    const [message, setMessage] = useState()
    const [alert, setAlert] = useState({ show: false, msg: "", type: "", style: "" });
    const [loading, setLoading] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false)
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg })
        setTimeout(() => {
            setAlert(false, "", "")
        }, 4000);
    }
    const navigate = useNavigate();

    const fullNameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password1 = useRef({});
    password1.current = watch("password", "");

    const onSubmit = async data => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phone,
            password: data.password
        }
        setLoading(true);

        signupFunction(payload).then(response => {
            if (response.status == 201) {
                setLoading(false);
                setStartAnimation(true)
            }
            if (response.status == 400) {
                setLoading(false);
                // error existed email
                setMessage(response.data.error.email ? response.data.error.email : '')
                setTimeout(() => {
                    setMessage('')
                }, 6000);
                // alert 
                showAlert(true, "error", "Create account unsuccessfully!", "top-5 right-2")
            }
        })
    };
    return (
        <div >
            {loading && <LoadingScreen />}

            {startAnimation && <SuccessSignUp/>
                }
            <div className="bg-signupbg bg-cover lg:py-12 lg:flex lg:justify-center sm:px-6 px-6 lg:px-1 md:px-1 md:py-12 py-9 2xl:mx-auto min-h-screen">

                <div className="bg-white mx-8 lg:flex lg:drop-shadow-xl lg:rounded-lg max-w-6xl">

                    <div className="bg-white w-full p-8 ">

                        <div>
                            <p tabIndex={0} className="text-center text-3xl font-extrabold leading-6 text-gray-800 mb-5 mt-3">
                                Sign up
                            </p>
                            {alert.show && <RowAlert {...alert} />}
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
                                <div className=" mb-2 ">
                                    <label htmlFor="password" className="text-md font-medium leading-none text-gray-800">
                                        {" "}
                                        Password{" "}<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center justify-center w-full">
                                        <input id="password"
                                            type={showPass ? "text" : "password"}
                                            {...register("password", {
                                                required: "This field is required!",
                                                pattern: {
                                                    value: passwordRegrex,
                                                    message: "Password must have at least 08 characters, 01 uppercase letter, 01 lowercase letter"
                                                }
                                            })}
                                            className="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />

                                    </div>
                                    <p className="text-sm text-red-500 mt-2">
                                        {errors.password && errors?.password.message}
                                    </p>

                                </div>
                                <div className="mt-2w-full mb-2">
                                    <label htmlFor="repassword" className="text-md font-medium leading-none text-gray-800">
                                        {" "}
                                        Confirm Password{" "}<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center justify-center w-full">
                                        <input id="repassword"
                                            type={showRePass ? "text" : "password"}
                                            {...register("repassword", {
                                                required: "This field is required!",
                                                validate: value =>
                                                    value === password1.current || "The passwords do not match"
                                            })}
                                            className="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                        <div onClick={() => setShowRePass(!showRePass)}
                                            className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                            {showRePass ? <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                                    fill="#71717A"
                                                />
                                            </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#27272A" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={3} y1={3} x2={21} y2={21} />
                                                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                                                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                                                </svg>

                                            }

                                        </div>
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
                            <p tabIndex={0} className="focus:outline-none text-md mt-4 font-medium leading-none text-gray-500">
                                Have account?{" "}
                                <Link to="/sign-in" className="hover:text-pink-600 focus:outline-none text-sm font-medium leading-none text-pink-400 cursor-pointer">
                                    {" "}
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                    </div>

                    <div className="bg-[#ababad] w-full hidden lg:block">
                        <img src={signup} className="block h-full w-full object-cover" />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignUp