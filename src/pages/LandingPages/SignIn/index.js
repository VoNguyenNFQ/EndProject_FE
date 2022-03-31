import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (

    <div class="h-[100vh] bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div class="flex flex-col items-center justify-center">

        <div class="bg-white shadow rounded-lg lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-10">Login to your account</p>

          <div>
            <label id="email" class="text-sm font-medium leading-none text-gray-800">
              Email
            </label>
            <input aria-labelledby="email" type="email" class="bg-gray-200 border rounded-lg  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            <div className={"text-red-500 text-sm"}>This field is required!</div>
          </div>
          <div class="mt-6  w-full">
            <label for="pass" class="text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <div class="relative flex items-center justify-center">
              <input id="pass" type="password" class="bg-gray-200 border rounded-lg  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            </div>
            <div className={"text-red-500 text-sm"}>This field is required!</div>
          </div>
          <div class="mt-8">
            <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 text-sm font-semibold leading-none text-white focus:outline-none bg-pink-400 border rounded-lg hover:bg-indigo-600 py-4 w-full">Create my account</button>
          </div>
          <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <Link to="/signup" class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"> Sign up here</Link></p>
        </div>
      </div>
    </div>

  )
}

export default SignIn