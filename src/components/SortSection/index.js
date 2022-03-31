import React, { useState } from 'react';
import styled from 'styled-components';

const SortItem = styled.div.attrs({
    className: "px-10 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-pink-200"
})``;

const SortSection = () => {

    const [showSort, setShowSort] = useState(false);

    const handleToggleSort = () => {
        setShowSort(!showSort)
    }

    return (
        <div
            className='cursor-pointer h-full font-medium self-center text-sm px-4 py-2.5 mr-2 mt-4'>
            <div
                onClick={handleToggleSort}
                className='flex h-full items-center text-pink-400 uppercase'
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <p className='mx-1'>Sort</p>
                {
                    showSort ?
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                }

            </div>
            {showSort &&
                <div className='right-0 absolute top-full bg-white border border-pink-400 rounded-lg'>
                    <SortItem className='rounded-b-none rounded-lg rounded-b-none' >Name: A - Z</SortItem>
                    <SortItem >Name: Z - A</SortItem>
                    <SortItem >Price: High - Low</SortItem>
                    <SortItem className='rounded-t-none rounded-lg rounded-t-none' >Price: Low - High</SortItem>
                </div>
            }
        </div>
    );
};

export default SortSection;