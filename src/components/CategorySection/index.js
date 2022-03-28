import React, { useState } from 'react';

const categoryListFake = [
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
        name: "Giày Sandals",
    },
    {
        id: 4,
        name: "Giày Sneaker",
    },
]
const CategorySection = ({ handleChangeCategory }) => {
    const [chosenCategory, setChosenCategory] = useState(0);
    const [categoryList, setCategoryList] = useState(categoryListFake);

    //     useEffect(() => {
    //         getAllCategory().then(data => setCategoryList(data)).catch(error => console.log(error));
    //     }, [])

    return (

        <div className='flex my-5 w-full'>
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">

                <li class="mr-2">
                    <button onClick={(e) => { handleChangeCategory(e, 0); setChosenCategory(0) }}
                        className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
                        ${chosenCategory === 0 ? 'bg-pink-400 text-white' : ''}`}
                    >
                        All
                    </button>
                </li>
                {
                    categoryList.map(item =>
                        <li class="mr-2">
                            <button onClick={(e) => { handleChangeCategory(e, item.id); setChosenCategory(item.id) }} key={item.id}
                                className={`inline-block rounded-t-lg text-l hover:text-white hover:bg-pink-400 p-3 px-6
                                        ${chosenCategory === item.id ? 'bg-pink-400 text-white' : ''}`}
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
