import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-tailwind/react/Icon';
import AdminNavbar from 'components/AdminNavbar';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <nav
                class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
            >
                <div
                    class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
                >
                    <button
                        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onclick="toggleNavbar('example-collapse-sidebar')"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                    <a
                        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        href="../../index.html"
                    >
                        Practise FE
                    </a>
                    <ul class="md:hidden items-center flex flex-wrap list-none">
                        <li class="inline-block relative">
                            <a
                                class="text-blueGray-500 block py-1 px-3"
                                href="#pablo"
                                onclick="openDropdown(event,'notification-dropdown')"
                            ><i class="fas fa-bell"></i
                            ></a>
                            <div
                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                id="notification-dropdown"
                            >
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Another action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Something else here</a
                                >
                                <div
                                    class="h-0 my-2 border border-solid border-blueGray-100"
                                ></div>
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Seprated link</a
                                >
                            </div>
                        </li>
                        <li class="inline-block relative">
                            <a
                                class="text-blueGray-500 block"
                                href="#pablo"
                                onclick="openDropdown(event,'user-responsive-dropdown')"
                            ><div class="items-center flex">
                                    <span
                                        class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
                                    ><img
                                            alt="..."
                                            class="w-full rounded-full align-middle border-none shadow-lg"
                                            src="../../assets/img/team-1-800x800.jpg"
                                        /></span></div
                                ></a>
                            <div
                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                id="user-responsive-dropdown"
                            >
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Another action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Something else here</a
                                >
                                <div
                                    class="h-0 my-2 border border-solid border-blueGray-100"
                                ></div>
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Seprated link</a
                                >
                            </div>
                        </li>
                    </ul>
                    <div
                        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
                        id="example-collapse-sidebar"
                    >
                        <div
                            class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
                        >
                            <div class="flex flex-wrap">
                                <div class="w-6/12">
                                    <a
                                        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        href="../../index.html"
                                    >
                                        Notus JS
                                    </a>
                                </div>
                                <div class="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onclick="toggleNavbar('example-collapse-sidebar')"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form class="mt-6 mb-4 md:hidden">
                            <div class="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>
                        <hr class="my-4 md:min-w-full" />
                        <h6
                            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                        >
                            Admin Layout Pages
                        </h6>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                            <li class="items-center">
                                <a
                                    href="./dashboard.html"
                                    class="text-xs uppercase py-3 font-bold block text-pink-500 hover:text-pink-600"
                                >
                                    <i class="fas fa-tv mr-2 text-sm opacity-75"></i>
                                    Dashboard
                                </a>
                            </li>

                            <li class="items-center">
                                <a
                                    href="./settings.html"
                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                >
                                    <i class="fas fa-tools mr-2 text-sm text-blueGray-300"></i>
                                    Settings
                                </a>
                            </li>

                            <li class="items-center">
                                <a
                                    href="./tables.html"
                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                >
                                    <i class="fas fa-table mr-2 text-sm text-blueGray-300"></i>
                                    Tables
                                </a>
                            </li>

                            <li class="items-center">
                                <a
                                    href="./maps.html"
                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                >
                                    <i
                                        class="fas fa-map-marked mr-2 text-sm text-blueGray-300"
                                    ></i>
                                    Maps
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="relative md:ml-64 bg-blueGray-50">
                <nav
                    class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
                >
                    <div
                        class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
                    >
                        <a
                            class="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                            href="./index.html"
                        >Dashboard</a
                        >
                        <form
                            class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
                        >
                            <div class="relative flex w-full flex-wrap items-stretch">
                                <span
                                    class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                                ><i class="fas fa-search"></i
                                ></span>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                                />
                            </div>
                        </form>
                        <ul
                            class="flex-col md:flex-row list-none items-center hidden md:flex"
                        >
                            <a
                                class="text-blueGray-500 block"
                                href="#pablo"
                                onclick="openDropdown(event,'user-dropdown')"
                            >
                                <div class="items-center flex">
                                    <span
                                        class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
                                    ><img
                                            alt="..."
                                            class="w-full rounded-full align-middle border-none shadow-lg"
                                            src="../../assets/img/team-1-800x800.jpg"
                                        /></span>
                                </div>
                            </a>
                            <div
                                class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                id="user-dropdown"
                            >
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Another action</a
                                ><a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Something else here</a
                                >
                                <div
                                    class="h-0 my-2 border border-solid border-blueGray-100"
                                ></div>
                                <a
                                    href="#pablo"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                >Seprated link</a
                                >
                            </div>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Sidebar