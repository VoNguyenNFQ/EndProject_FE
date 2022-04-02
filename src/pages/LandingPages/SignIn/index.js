import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, getUserInfo } from 'utils/callAPIs';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';

const SignIn = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token")
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onSubmit = (data) => {
    console.log(data);
    setErrorMessage("")

    setLoading(true);
    login(data).then(res => {
      console.log(res);
      if (res.status == 200) {
        getUserInfo({ email: data.username })
          .then(userInfo => {
            if (userInfo.roles[0] == "ROLE_USER") {
              localStorage.setItem("tokenUser", res.data.token);
              navigate('/');
            } else {
              localStorage.setItem("tokenAdmin", res.data.token)
              navigate('/admin');
            }
            setLoading(false);
          })
          .catch(error => console.log(error));
      }
      if (res.code == 401) {
        setErrorMessage("Email or password is incorrect!");
        setLoading(false);
      }
    })
  }

  useEffect(() => {
    token && navigate('/')
  }, [])

  return (
    <>
      {
        loading && <LoadingScreen />
      }
      <div className="h-[100vh] w-full py-16 px-4 bg-bg_signin bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded-lg lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabIndex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-8">Login to your account</p>
            <div className='text-red-500 mb-2'>{errorMessage}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label id="email" className="text-sm font-medium leading-none text-gray-800">
                  Email
                </label>
                <input
                  aria-labelledby="email"
                  {...register("username",
                    {
                      required: "This field is required!",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Invalid email!"
                      }
                    },
                  )}
                  className="bg-gray-200 border rounded-lg  text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div className={"text-red-500 text-sm"}>
                  {errors.username && errors?.username.message}
                </div>
              </div>
              <div className="mt-6  w-full">
                <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800">
                  Password
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    {...register("password", {
                      required: "This field is required!",
                    })}
                    id="pass"
                    type="password"
                    className="bg-gray-200 border rounded-lg  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className={"text-red-500 text-sm"}>
                  {errors.password && errors?.password.message}
                </div>
              </div>
              <div className="mt-8">
                <button type='submit' className="focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 text-sm font-semibold leading-none text-white focus:outline-none bg-pink-400 border rounded-lg hover:bg-pink-600 py-4 w-full">Log in</button>
              </div>
              <p tabIndex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <Link to="/signup" className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"> Sign up here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default SignIn 