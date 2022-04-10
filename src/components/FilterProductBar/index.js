import React from 'react';

const FilterProductBar = ({ handleSearchInputChange, handleFilterCategory, categoryArray, keyword }) => {

    return (
        <>
            <div class="flex flex-wrap justify-between sm:flex-nowrap items-center gap-1.5 sm:gap-4">
                <div class="mb-3 flex items-center w-full sm:w-auto min-w-[120px]">
                    <p className='mr-3 font-semibold text-md'>Category</p>
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
                        onChange={handleFilterCategory}
                    >
                        <option value="0" selected>All</option>
                        {
                            categoryArray.length > 0 && categoryArray.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                        }
                    </select>
                </div>
                {/* <div className='mb-3 w-full'>
                    <p className='font-semibold text-md'></p>
                    <button onClick={handleFilter} className='h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>Filter</button>
                </div> */}
                <div className='relative mt-0 sm:mt-2.5 mb-4 min-w-[300px] sm:w-auto w-full text-gray-500 flex items-center bg-transparent-400 bg-opacity-20 py-1 px-3 rounded-lg border border-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                    value={keyword}
                    onChange={handleSearchInputChange} 
                    placeholder='Search' 
                    className='bg-transparent border-none text-sm leading-snug w-full font-normal p-1.5 placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-0' 
                    />
                </div>

            </div>
        </>
    );
};

export default FilterProductBar;