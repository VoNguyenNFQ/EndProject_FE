import React, { useState } from 'react';

const FilterSection = ({
    setPage,
    priceFilter,
    colorFilter,
    handleChangePrice,
    handleChangeColor,
    handleClearFilter,
    handleFilter
}) => {

    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    const handleHideFilter = () => {
        setShowFilter(false);
    }

    const handleCallFilter = () => {
        setPage(1);
        handleFilter();
        handleHideFilter();
    }

    const colorArray = [
        { id: 1, name: "Black" },
        { id: 2, name: "Blue" },
        { id: 3, name: "Cream" },
        { id: 4, name: "Gray" },
        { id: 5, name: "Pink" },
        { id: 6, name: "White" }
    ];
    const priceArray = [
        {
            name: "priceto20",
            title: "< $20",
            value: {
                priceFrom: null,
                priceTo: 20
            },

        },
        {
            name: "pricefrom20to30",
            title: "$20 - $30",
            value: {
                priceFrom: 20,
                priceTo: 30
            },
        },
        {
            name: "pricefrom30to40",
            title: "$30 - $40",
            value: {
                priceFrom: 30,
                priceTo: 40
            },
        },
        {
            name: "pricefrom6to9",
            title: "$40 - $50",
            value: {
                priceFrom: 40,
                priceTo: 50
            },
        },
        {
            name: "pricefrom9",
            title: "> $50",
            value: {
                priceFrom: 50,
                priceTo: null
            },
        },
    ]

    return (
        <div
            onMouseEnter={handleShowFilter}
            onMouseLeave={handleHideFilter}
            id="filterSection"
            className="inline cursor-pointer border relative rounded-full border-pink-400 hover:rounded-b-none hover:rounded-tr-[20px] hover:rounded-tl-[20px] hover:border-b-0 bg-white font-medium text-sm px-4 py-2.5 mr-2 mt-4"
        >
            <span className='text-pink-400 uppercase'>Filter</span>
            {showFilter &&
                <div id="filterContainer" className='min-w-[calc(100vw-32px)] md:min-w-[600px] grid grid-cols-1 md:grid-cols-2 p-8 absolute top-full left-[-1px] bg-white border border-pink-400 rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]'>
                    <div>
                        <div className='mb-4 text-pink-400 uppercase'>
                            Price
                        </div>
                        <form>
                            {
                                priceArray.map((price, index) =>
                                    <div key={index}>
                                        <input
                                            name="price"
                                            id={price.name}
                                            value={price.name}
                                            className='mr-3'
                                            type="radio"
                                            checked={priceFilter?.name === price.name}
                                            onChange={() => handleChangePrice(price)}
                                        />
                                        <label htmlFor={price.name} >{price.title}</label>
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
                                            name="color"
                                            id={"color-" + color.id}
                                            value={color.id}
                                            className='mr-3'
                                            type="radio"
                                            checked={colorFilter == color.id}
                                            onChange={handleChangeColor}
                                        />
                                        <label htmlFor={"color-" + color.id} >{color.name}</label>
                                    </div>
                                )
                            }

                        </form>
                    </div>
                    <div className='col-span-3 text-center mt-4'>
                        <button onClick={handleClearFilter} className='text-gray-500 uppercase py-2.5 px-4 mr-2 border border-gray-500 rounded-full'>Clear</button>
                        <button onClick={handleCallFilter} className='bg-pink-400 hover:bg-pink-600 border-pink-400 text-white uppercase py-2.5 px-4 rounded-full'>Accept</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default FilterSection;
