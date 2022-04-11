import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const UserIcon = () => {
    const [show, setShow]= useState(false)
    const nameUser= localStorage.getItem("userInfo")
    return (

            <div class="relative">
                <div>
                    <button type="button" class=" flex text-sm rounded-full"
                    onClick={()=>{setShow(!show)}}
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <span>{nameUser.full_name}</span>
                </div>

                {show && 
                <div class="origin-top-right absolute -right-5  mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <Link to="/order-list" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50" role="menuitem" tabIndex="-1" id="user-menu-item-1">Your Orders</Link>
                    <Link to="/user-profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50" role="menuitem" tabIndex="-1" id="user-menu-item-2">User Profile</Link>
                </div>}
            </div>
    )
}

export default UserIcon