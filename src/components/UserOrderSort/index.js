import React from 'react'

const UserOrderSort = ({ statusFilter, handleChangeStatus }) => {
  return (
    <div>
      <ul className="flex flex-wrap text-base font-medium text-center text-pink-500 border-b border-gray-300 ">
        <li className="mr-2">
          <span 
          onClick={() => { handleChangeStatus(0); setStatusFilter(0) }}
          className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
          ${statusFilter === 0 ? 'bg-pink-400 text-white' : ''}`}>
          All</span>
        </li>
        <li className="mr-2">
        <span 
          onClick={() => { handleChangeStatus(1), setStatusFilter(1) }}
          className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
          ${statusFilter === 1 ? 'bg-pink-400 text-white' : ''}`}>
          Approved</span>
                  </li>
        <li className="mr-2">
        <span 
          onClick={() => { handleChangeStatus(2); setStatusFilter(2) }}
          className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
          ${statusFilter === 2 ? 'bg-pink-400 text-white' : ''}`}>
          Delivery</span>
                  </li>
        <li className="mr-2">
        <span 
          onClick={() => { handleChangeStatus(3); setStatusFilter(3)}}
          className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
          ${statusFilter === 3 ? 'bg-pink-400 text-white' : ''}`}>
          Canceled</span>
                  </li>
        <li>
        <span 
          onClick={() => { handleChangeStatus(4); setStatusFilter(4) }}
          className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
          ${statusFilter === 4 ? 'bg-pink-400 text-white' : ''}`}>
          Completed</span>        </li>
      </ul>

    </div>
  )
}

export default UserOrderSort