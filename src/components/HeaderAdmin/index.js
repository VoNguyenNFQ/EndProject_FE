import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminInfo")

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("adminInfo");
    navigate('/admin/sign-in');
  }

  const getName = () => localStorage.getItem("adminInfo") && JSON.parse(localStorage.getItem("adminInfo")).full_name

  return (
    <nav
      className="bg-pink-500 md:ml-64 py-6 px-3"
    >
      <div className='container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10'>
        <div className='md:hidden'>
          <button onClick={() => setShowSidebar("left-0")} className='relative overflow-hidden false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-full w-12 h-12 p-0 grid place-items-center text-sm leading-relaxed bg-transparent'>
            <span className='material-icons text-white text-2xl leading-none'>menu</span>
          </button>
        </div>
        <div
          className="flex justify-between items-center w-full"
        >
          <h4
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="./index.html"
          >Dashboard</h4
          >
          <div className='flex items-center'>
            {/* <div className='relative lg:w-60 sm:w-full text-white flex items-center bg-white bg-opacity-20 py-1 px-3 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input placeholder='Search' className='bg-transparent border-none text-sm leading-snug w-full font-normal p-1.5 placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0' />
            </div> */}
            <div className='-mr-4 ml-6'>
              <div>
                <button className='cursor-default p-0 text-white false flex items-center justify-center gap-1 rounded-lg font-bold outline-none capitalize tracking-wider focus:outline-none transition-all duration-300 rounded-full pl-7 pr-5 text-sm leading-normal'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className='text-white'>{getName()}</p>
                </button>
              </div>
            </div>
            <button onClick={handleLogout} className='bg-white rounded-lg py-1 px-3 ml-4 font-semibold text-pink-500 '>Log out</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeaderAdmin