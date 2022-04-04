import React from 'react';

const Product = () => {
    return (
        <div className='md:ml-64'>
            <div className=' bg-pink-500 pt-14 pb-28 px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-24'>
                <div className='w-full px-4 mb-10'>
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                    >
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                            <div class="flex flex-wrap items-center">
                                <div
                                    class="relative w-full px-4 max-w-full flex-grow flex-1"
                                >
                                    <h3 class="font-semibold text-lg text-gray-700">
                                        Products
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="block w-full overflow-x-auto">
                            <table
                                class="items-center w-full bg-transparent border-collapse"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                        >
                                            Project
                                        </th>
                                        <th
                                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                        >
                                            Budget
                                        </th>
                                        <th
                                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                        >
                                            Status
                                        </th>
                                        <th
                                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                        >
                                            Users
                                        </th>
                                        <th
                                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span class="ml-3 font-bold text-gray-600">
                                                Argon Design System
                                            </span>
                                        </th>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $2,500 USD
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i class="fas fa-circle text-orange-500 mr-2"></i>
                                            pending
                                        </td>

                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div class="flex items-center">
                                                <span class="mr-2">60%</span>
                                                <div class="relative w-full">
                                                    <div
                                                        class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                                                    >
                                                        <div
                                                            class="w-[60%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                class="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-1-dropdown')"
                                            >
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-1-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    class="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span class="ml-3 font-bold text-gray-600">
                                                Angular Now UI Kit PRO
                                            </span>
                                        </th>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $1,800 USD
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i class="fas fa-circle text-emerald-500 mr-2"></i>
                                            completed
                                        </td>

                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div class="flex items-center">
                                                <span class="mr-2">100%</span>
                                                <div class="relative w-full">
                                                    <div
                                                        class="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"
                                                    >
                                                        <div
                                                            class="w-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                class="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-2-dropdown')"
                                            >
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-2-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    class="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span class="ml-3 font-bold text-gray-600">
                                                Black Dashboard Sketch
                                            </span>
                                        </th>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $3,150 USD
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i class="fas fa-circle text-red-500 mr-2"></i>
                                            delayed
                                        </td>

                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div class="flex items-center">
                                                <span class="mr-2">73%</span>
                                                <div class="relative w-full">
                                                    <div
                                                        class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                                                    >
                                                        <div
                                                            class="w-[73%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                class="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-3-dropdown')"
                                            >
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-3-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    class="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span class="ml-3 font-bold text-gray-600">
                                                React Material Dashboard
                                            </span>
                                        </th>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $4,400 USD
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i class="fas fa-circle text-teal-500 mr-2"></i> on
                                            schedule
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div class="flex items-center">
                                                <span class="mr-2">90%</span>
                                                <div class="relative w-full">
                                                    <div
                                                        class="overflow-hidden h-2 text-xs flex rounded bg-teal-200"
                                                    >
                                                        <div
                                                            class="w-[90%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                class="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-4-dropdown')"
                                            >
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-4-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    class="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                                        >
                                            <span class="ml-3 font-bold text-gray-600">
                                                React Material Dashboard
                                            </span>
                                        </th>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            $2,200 USD
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <i class="fas fa-circle text-emerald-500 mr-2"></i>
                                            completed
                                        </td>

                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                        >
                                            <div class="flex items-center">
                                                <span class="mr-2">100%</span>
                                                <div class="relative w-full">
                                                    <div
                                                        class="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"
                                                    >
                                                        <div
                                                            class="w-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                        >
                                            <a
                                                href="#pablo"
                                                class="text-gray-500 block py-1 px-3"
                                                onclick="openDropdown(event,'table-light-5-dropdown')"
                                            >
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                id="table-light-5-dropdown"
                                            >
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Another action</a
                                                ><a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Something else here</a
                                                >
                                                <div
                                                    class="h-0 my-2 border border-solid border-gray-100"
                                                ></div>
                                                <a
                                                    href="#pablo"
                                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                >Seprated link</a
                                                >
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;