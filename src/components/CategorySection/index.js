import React, { useState, useEffect } from 'react';
import { getAllCategory } from 'utils/callAPIs'

const CategorySection = ({ categoryFilter, handleChangeCategory }) => {
    const [categoryList, setCategoryList] = useState([]);

        useEffect(() => {
            getAllCategory()
            .then(data => setCategoryList(data))
            .catch(error => console.log(error));
        }, [])

    return (

        <div className='flex my-5 w-full'>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">

                <li className="mr-2">
                    <button onClick={(e) => { handleChangeCategory(e, 0) }}
                        className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
                        ${categoryFilter === 0 ? 'bg-pink-400 text-white' : ''}`}
                    >
                        All
                    </button>
                </li>
                {
                    categoryList.map(item =>
                        <li key={item.id} className="mr-2">
                            <button onClick={(e) => { handleChangeCategory(e, item.id) }} key={item.id}
                                className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
                                        ${categoryFilter === item.id ? 'bg-pink-400 text-white' : ''}`}
                            >
                                {item.name}
                            </button>
                        </li>
                    )
                }
            </ul>

        </div>
    );
};

export default CategorySection;
