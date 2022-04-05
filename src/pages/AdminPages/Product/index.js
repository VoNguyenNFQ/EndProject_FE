import React, { useState } from 'react';

const Product = () => {
    const [showActionBar, setShowActionBar] = useState(false);
    return (
        <div className='md:ml-64'>
            <div className=' bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div
                                    className="relative px-4 "
                                >
                                    <h3 className="font-semibold text-lg text-gray-700">
                                        Products
                                    </h3>
                                </div>
                                <div
                                    className="relative px-4 "
                                >
                                    <h3 className="font-semibold text-lg text-gray-700">
                                        Products
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* <div
                                className="table items-center w-full bg-transparent border-collapse"
                            >
                                <div className='table-header-group'>
                                    <div
                                        className=" table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                    >
                                        Project
                                    </div>
                                    <div
                                        className=" table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                    >
                                        Budget
                                    </div>
                                    <div
                                        className=" table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                    >
                                        Status
                                    </div>
                                    <div
                                        className=" table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                    >
                                        Users
                                    </div>
                                    <div
                                        className=" table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                    ></div>
                                </div>
                                <div className='table-row-group'>
                                    <div className='table-row'>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span className="ml-3 font-bold text-gray-600">
                                                Argon Design System
                                            </span>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $2,500 USD
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i className="fas fa-circle text-orange-500 mr-2"></i>
                                            pending
                                        </div>

                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">60%</span>
                                                <div className="relative w-full">
                                                    <div
                                                        className="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                                                    >
                                                        <div
                                                            className="w-[60%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <div
                                                className="relative text-gray-500 block py-1 px-3 cursor-pointer"
                                                onClick={() => setShowActionBar(!showActionBar)}
                                            >
                                                <i className="fas fa-ellipsis-v"></i>
                                            </div>

                                            {
                                                showActionBar &&
                                                <div
                                                    className="absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                    id="table-light-1-dropdown"
                                                >
                                                    <div className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                        Edit
                                                    </div>
                                                    <div className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                        Delete
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span className="ml-3 font-bold text-gray-600">
                                                Angular Now UI Kit PRO
                                            </span>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $1,800 USD
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i className="fas fa-circle text-emerald-500 mr-2"></i>
                                            completed
                                        </div>

                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">100%</span>
                                                <div className="relative w-full">
                                                    <div
                                                        className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"
                                                    >
                                                        <div
                                                            className="w-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                className="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-2-dropdown')"
                                            >
                                                <i className="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-2-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    className="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span className="ml-3 font-bold text-gray-600">
                                                Black Dashboard Sketch
                                            </span>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $3,150 USD
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i className="fas fa-circle text-red-500 mr-2"></i>
                                            delayed
                                        </div>

                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">73%</span>
                                                <div className="relative w-full">
                                                    <div
                                                        className="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                                                    >
                                                        <div
                                                            className="w-[73%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                className="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-3-dropdown')"
                                            >
                                                <i className="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-3-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    className="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span className="ml-3 font-bold text-gray-600">
                                                React Material Dashboard
                                            </span>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $4,400 USD
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i className="fas fa-circle text-teal-500 mr-2"></i> on
                                            schedule
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">90%</span>
                                                <div className="relative w-full">
                                                    <div
                                                        className="overflow-hidden h-2 text-xs flex rounded bg-teal-200"
                                                    >
                                                        <div
                                                            className="w-[90%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                className="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-4-dropdown')"
                                            >
                                                <i className="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-4-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    className="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span className="ml-3 font-bold text-gray-600">
                                                React Material Dashboard
                                            </span>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $2,200 USD
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i className="fas fa-circle text-emerald-500 mr-2"></i>
                                            completed
                                        </div>

                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">100%</span>
                                                <div className="relative w-full">
                                                    <div
                                                        className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"
                                                    >
                                                        <div
                                                            className="w-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                className="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-5-dropdown')"
                                            >
                                                <i className="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-5-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    className="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;