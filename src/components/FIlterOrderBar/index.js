import React from 'react';

const FilterOrderBar = ({ filter, setFilter, handleFilter, statusArray }) => {

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
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        defaultValue="0"
                    >
                        {
                            statusArray.map(item => <option value={item.id}>{item.name}</option>)
                        }
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
                        onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                        value={filter.fromDate}
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
                        onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                        value={filter.toDate}
                    />
                </div>
                <div className='mb-3 w-full'>
                    <p className='font-semibold text-md'></p>
                    <button onClick={handleFilter} className='flex items-center h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterOrderBar;