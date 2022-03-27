import React, { useState, useEffect } from 'react';

const FilterSection = (props) => {
    const { priceFilter, colorFilter, handleChangePrice, handleChangeColor, handleClearFilter } = props
    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    const handleHideFilter = () => {
        setShowFilter(false);
    }

    const colorArray = ["Black", "Blue", "Cream", "Gray", "Pink", "White"];
    const priceArray = [
        {
            value: "priceTo400000",
            title: "< 400.000đ"
        },
        {
            value: "priceFrom400000&priceTo600000",
            title: "400.000đ - 600.000đ"
        },
        {
            value: "priceFrom600000&priceTo900000",
            title: "600.000 - 900.000đ"
        },
        {
            value: "priceFrom900000",
            title: "> 900.000đ"
        },
    ]

    useEffect(() => {
        console.log(colorFilter)
    }, [colorFilter])

    return (
        <div
            onMouseEnter={handleShowFilter}
            onMouseLeave={handleHideFilter}
            className="inline cursor-pointer border relative rounded-full border-pink-400 hover:rounded-b-none hover:rounded-tr-[20px] hover:rounded-tl-[20px] hover:border-b-0 bg-white font-medium text-sm px-4 py-2.5 mr-2 mt-4"
        >
            <span className='text-pink-400 uppercase'>Filter</span>
            {showFilter &&
                <div className='grid grid-cols-2 p-8 min-w-[600px] absolute top-full left-[-1px] bg-white border border-pink-400 rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]'>
                    <div>
                        <div className='mb-4 text-pink-400 uppercase'>
                            Price
                        </div>
                        <form>
                            {
                                priceArray.map((price, index) =>
                                    <div>
                                        <input
                                            name="price"
                                            id={price.value}
                                            value={price.value}
                                            className='mr-3'
                                            type="radio"
                                            checked={priceFilter == price.value}
                                            onChange={handleChangePrice}
                                        />
                                        <label htmlFor={price.value} >{price.title}</label>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                    <div>
                        <div className='mb-4 text-pink-400 uppercase'>
                            Color
                        </div>
                        <form>
                            {
                                colorArray.map((color, index) =>
                                    <div key={index}>
                                        <input
                                            name={color}
                                            id={color}
                                            value={color}
                                            className='mr-3'
                                            type={"checkbox"}
                                            checked={colorFilter.some(item => item === color)}
                                            onChange={() => handleChangeColor(color)}
                                        />
                                        <label htmlFor={color} >{color}</label>
                                    </div>
                                )
                            }

                        </form>
                    </div>
                    <div className='col-span-3 text-center mt-4'>
                        <button onClick={handleClearFilter} className='text-gray-500 uppercase py-2.5 px-4 mr-2 border border-gray-500 rounded-full'>Clear</button>
                        <button className='bg-pink-400 hover:bg-pink-600 border-pink-400 text-white uppercase py-2.5 px-4 rounded-full'>Accept</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default FilterSection;