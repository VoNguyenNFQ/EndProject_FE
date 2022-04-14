import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';

const sidebarList = [
    {
        link: "/admin",
        name: "Main Dashboard",
        icon: <DashboardIcon fontSize='small' />
    },
    {
        link: "/admin/product",
        name: "Product Management",
        icon: <InventoryIcon fontSize='small' />
    },
    {
        link: "/admin/order",
        name: "Order Management",
        icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>,
    },
]

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <>
            <nav
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div
                    className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
                >
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setShowSidebar("-left-64")}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link
                        className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to='/admin'
                    >
                        <p className='font-bold'>VTAK STORE</p>
                    </Link>
                    <div
                        className="flex flex-col items-stretch opacity-100 md:relative md:mt-4 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded mt-[68px] px-9 md:px-0"
                        id="example-collapse-sidebar"
                    >
                        {/* <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-0 px-3 py-2 h-12 border border-solid border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form> */}
                        <hr className="my-4 md:min-w-full" />
                        <h6
                            className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                        >
                            Admin Layout Pages
                        </h6>

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            {
                                sidebarList.length && sidebarList.map((item, index) =>
                                    <li key={index} className="items-center">
                                        <Link
                                            to={item.link}
                                            className={`text-xs flex items-center uppercase py-3 font-bold block ${location.pathname == item.link ? " text-pink-500 hover:text-pink-600 " : " text-gray-700 hover:text-gray-500 "}`}
                                        >
                                            {item.icon}
                                            <p className='ml-3'>{item.name}</p>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Sidebar