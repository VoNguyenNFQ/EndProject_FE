import React, { useState } from 'react';
import tw from 'tailwind-styled-components'

const SortSection = () => {
    const SortItem = tw.div`
    text-center py-2.5 hover:text-pink-400
`
    const [showSort, setShowSort] = useState(false);
    
    const handleShowSort = () => {
        setShowSort(true)
    }

    const handleHideSort = () => {
        setShowSort(false)
    }
    return (
        <div
            onMouseEnter={handleShowSort}
            onMouseLeave={handleHideSort}
            className='cursor-pointer border relative rounded-full border-pink-400 hover:rounded-b-none hover:rounded-tr-[20px] hover:rounded-tl-[20px] hover:border-b-0 bg-white font-medium uppercase text-sm px-4 py-2.5 mr-2 mt-4'>
            <span className='text-pink-400 px-10'>Name: A - Z</span>
            {showSort &&
                <div className='min-w-full absolute top-full left-[-1px] right-[-1px] bg-white border border-pink-400 rounded-bl-[20px] rounded-br-[20px]'>
                    <SortItem >Name: A - Z</SortItem>
                    <SortItem >Name: Z - A</SortItem>
                    <SortItem >Price: High - Low</SortItem>
                    <SortItem >Price: Low - High</SortItem>
                </div>
            }
        </div>
    );
};

export default SortSection;