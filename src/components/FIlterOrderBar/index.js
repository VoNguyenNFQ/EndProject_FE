import React from 'react';

const FilterOrderBar = ({ setStatus, setFromDate, setToDate, handleFilter, fromDate, toDate }) => {

    return (
        <>
            <div class="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-4">
                <div class="mb-3 w-full sm:w-auto min-w-[120px]">
                    <p className='font-semibold text-md'>Order Status</p>
                    <select class="form-select appearance-none
                h-10
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue="0"
                    >
                        <option value="0">All</option>
                        <option value="1">Pending</option>
                        <option value="2">Approved</option>
                        <option value="3">Canceled</option>
                        <option value="4">Completed</option>
                    </select>
                </div>
                <div class="mb-3 w-full sm:w-auto">
                    <p className='font-semibold text-md'>From Date</p>
                    <input class="form-select appearance-none
                h-10
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"date"}
                        onChange={(e) => setFromDate(e.target.value)}
                        value={fromDate}
                    />
                </div>
                <div class="mb-3 w-full sm:w-auto">
                    <p className='font-semibold text-md'>To Date</p>
                    <input class="form-select appearance-none
                h-10
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"date"}
                        onChange={(e) => setToDate(e.target.value)}
                        value={toDate}
                    />
                </div>
                <div className='mb-3 w-full'>
                    <p className='font-semibold text-md'></p>
                    <button onClick={handleFilter} className='h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>Filter</button>
                </div>
            </div>
        </>
    );
};

export default FilterOrderBar;