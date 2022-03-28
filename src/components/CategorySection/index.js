import React, { useState } from 'react';

const categoryList = [
    {
        id: 1,
        name: "Giày Cao gót",
    },
    {
        id: 2,
        name: "Giày Búp bê",
    },
    {
        id: 3,
        name: "Giày Saldals",
    },
    {
        id: 4,
        name: "Giày Sneaker",
    },
]

const CategorySection = ({ handleChangeCategory }) => {

    return (
        <div className='flex my-5 w-full'>
            <button onClick={(e) => handleChangeCategory(e, 0)} className='bg-pink-400 hover:bg-pink-600 border-pink-400 text-white uppercase py-2.5 px-4 rounded-full mr-4'>Tất cả</button>
            {
                categoryList.map(item =>
                    <button onClick={(e) => handleChangeCategory(e, item.id)} key={item.id} className='bg-white hover:bg-pink-600 hover:text-white border-pink-400 border text-pink-400 uppercase py-2.5 px-4 rounded-full mr-4'>{item.name}</button>
                )
            }
        </div>
    );
};

export default CategorySection;