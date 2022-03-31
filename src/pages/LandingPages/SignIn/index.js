import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignIn = () => {

  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (

    <div class="h-[100vh] bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div class="flex flex-col items-center justify-center">

        <div class="bg-white shadow rounded-lg lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-10">Login to your account</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label id="email" class="text-sm font-medium leading-none text-gray-800">
                Email
              </label>
              <input
                aria-labelledby="email"
                {...register("email",
                  {
                    required: "This field is required!",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Invalid email!"
                    }
                  },
                )}
                class="bg-gray-200 border rounded-lg  text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <div className={"text-red-500 text-sm"}>
                {errors.email && errors?.email.message}
              </div>
            </div>
            <div class="mt-6  w-full">
              <label for="pass" class="text-sm font-medium leading-none text-gray-800">
                Password
              </label>
              <div class="relative flex items-center justify-center">
                <input
                  {...register("password", {
                    required: "This field is required!",
                    minLength: {
                      value: 8,
                      message: "Minimum length is 8 characters"
                    }
                  })}
                  id="pass"
                  type="password"
                  class="bg-gray-200 border rounded-lg  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>
              <div className={"text-red-500 text-sm"}>
                {errors.password && errors?.password.message}
              </div>
            </div>
            <div class="mt-8">
              <button type='submit' class="focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 text-sm font-semibold leading-none text-white focus:outline-none bg-pink-400 border rounded-lg hover:bg-pink-600 py-4 w-full">Log in</button>
            </div>
            <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <Link to="/signup" class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"> Sign up here</Link></p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default SignIn