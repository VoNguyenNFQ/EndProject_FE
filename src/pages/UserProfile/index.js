import React, { useState } from 'react'
import user from 'assets/images/user.png'
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import PendingOrderList from './PendingOrderList';
import { Navigate, useNavigate } from 'react-router-dom';
const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [showEditInfo, setShowEditInfo] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showPendingOrder, setShowPendingOrder] = useState(true)
    const [active, setActive] = useState(0)
    const navigate= useNavigate()
    const divStyle = {
        transform: 'translateZ(0px)'
    };
    if(localStorage.getItem('tokenUser')){
    return (
        <div>
            <div className="relative block">
                <div className="absolute top-0 w-full h-[300px] py-5 bg-center bg-cover  bg-gradient-to-r from-slate-400 to-pink-400" style={divStyle} >
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

                    <div class="flex flex-wrap justify-start p-10">
                        <div class="w-full lg:w-2/6 px-4 flex flex-col items-center justify-start">
                            <div class="">
                                <img alt="..." src={user} className="w-[130px]" />
                            </div>
                            <div className='flex flex-row items-center justify-center mb-2 mt-5'>
                                <p class="text-2xl font-semibold leading-normal  text-blueGray-700 mr-2 text-center">
                                    {userInfo.full_name}
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"                                     onClick={() => {setActive(1); setShowChangePassword(false);setShowPendingOrder(false); setShowEditInfo(true) }}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>


                            <div class="flex justify-center flex-col mt-5 space-y-2 lg:px-2 lg:space-y-2">
                                <span
                                    onClick={() => { setActive(0); setShowChangePassword(false); setShowEditInfo(false) ; setShowPendingOrder(true) }}
                                    class={`${active== 0 ? 'text-pink-500 hover:text-gray-500' : 'text-gray-500 hover:text-pink-500'} block font-medium  text-lg cursor-pointer text-base`}>
                                    Overview
                                </span>
                                <span
                                    onClick={() => {setActive(1); setShowChangePassword(false);setShowPendingOrder(false); setShowEditInfo(true) }}
                                    class={`${active== 1 ? 'text-pink-500 hover:text-gray-500' : 'text-gray-500 hover:text-pink-500'} block font-medium  text-lg cursor-pointer text-base`}>
                                    Edit Profile
                                </span>
                                <span
                                    onClick={() => { setActive(2); setShowEditInfo(false); setShowPendingOrder(false); setShowChangePassword(true) }}
                                    class={`${active== 2 ? 'text-pink-500 hover:text-gray-500' : 'text-gray-500 hover:text-pink-500'} block font-medium  text-lg cursor-pointer text-base`}>
                                    Change password
                                </span>
                                <span
                                    onClick={() => { localStorage.removeItem('tokenUser'); navigate('/') }}
                                    class="block font-medium text-gray-500 text-lg hover:text-pink-500 cursor-pointer text-base">
                                    Log out
                                </span>
                            </div>
                        </div>

                        <div class="w-full lg:w-4/6 ">
                            
                            <div>
                                {showEditInfo && <EditProfile editUserInfo={setUserInfo}/>}
                                {showChangePassword && <ChangePassword />}
                                {showPendingOrder && <PendingOrderList />}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )}
    else{
        <Navigate to="/sign-in" replace/>
    }
}

export default UserProfile