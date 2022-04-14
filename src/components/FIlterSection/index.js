import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllColor } from 'utils/callAPIs';
import { useDetectClickOutside } from "react-detect-click-outside"

const Button = styled.button.attrs({
    className: "uppercase py-2.5 px-4 rounded-full"
})``;

const Input = styled.input.attrs({
    className: 'mr-3 h-4 w-4 my-1',
    type: "radio"
})``;

const FilterSection = ({
    setPage,
    priceFilter,
    colorFilter,
    handleChangePrice,
    handleChangeColor,
    handleClearFilter,
    handleFilter,
    showFilter,
    setShowFilter,
}) => {

    const [colorArray, setColorArray] = useState([]);

    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
    }

    const handleCallFilter = () => {
        setPage(1);
        handleFilter();
        handleHideFilter();
    }

    const ref = useDetectClickOutside({ onTriggered: () => setShowFilter(false) });

    const priceArray = [
        {
            name: "priceto20",
            title: "< $20",
            value: {
                priceFrom: null,
                priceTo: 19.99
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
                priceFrom: 50.001,
                priceTo: null
            },
        },
    ]

    useEffect(() => {
        getAllColor().then(data => setColorArray(data)).catch(error => console.log(error));
    }, [])

    return (
        <div
            ref={ref}
            className="inline cursor-pointer h-full self-center font-medium text-md px-4 py-2.5 mr-2"
        >
            <div
                id="filterSection"
                onClick={handleToggleFilter}
                className='flex items-center text-pink-400 uppercase h-full'
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <p className='mx-1'>Filter</p>
                {
                    showFilter ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                }
            </div>
            {showFilter &&
                <div id="filterContainer" className='min-w-[calc(100vw-32px)] md:min-w-[600px] grid grid-cols-1 md:grid-cols-2 p-8 right-0 absolute top-full bg-white border border-pink-400 rounded-lg'>
                    <div id="abc">
                        <div className='mb-4 text-pink-400 uppercase'>
                            Price
                        </div>
                        <form>
                            {
                                priceArray.map((price, index) =>
                                    <div key={index}>
                                        <Input
                                            name="price"
                                            id={price.name}
                                            value={price.name}
                                            checked={priceFilter?.name === price.name}
                                            onChange={() => handleChangePrice(price)}
                                        />
                                        <label className='text-gray-500' htmlFor={price.name} >{price.title}</label>
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
                                            type="checkbox"
                                            className="mr-3 h-4 w-4 my-1"
                                            name="color"
                                            id={"color-" + color.id}
                                            value={color.id}
                                            checked={colorFilter.some(item => item === color.id)}
                                            onChange={() => handleChangeColor(color.id)}
                                        />
                                        <label htmlFor={"color-" + color.id} >{color.name}</label>
                                    </div>
                                )
                            }

                        </form>
                    </div>
                    <div className='col-span-3 text-center mt-4'>
                        <Button onClick={handleClearFilter} className='text-gray-500 mr-2 border border-gray-500'>Clear</Button>
                        <Button onClick={handleCallFilter} id="filterButton" className='bg-pink-400 hover:bg-pink-600 border-pink-400 text-white '>Filter</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default FilterSection;
