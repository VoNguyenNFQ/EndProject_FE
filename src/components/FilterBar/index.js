import CategorySection from 'components/CategorySection';
import FilterSection from 'components/FIlterSection';
import SortSection from 'components/SortSection';
import React, { useState } from 'react';

const FilterBar = ({ handleChangeCategory }) => {

    const [sort, setSort] = useState("atoz");
    const [priceFilter, setPriceFilter] = useState("");
    const [colorFilter, setColorFilter] = useState([]);

    const handleChangePrice = (e) => {
        setPriceFilter(e.target.value);
    }

    const handleChangeColor = (data) => {
        const isChecked = colorFilter.some(color => color === data)
        if (isChecked) {
            setColorFilter(
                colorFilter.filter(
                    (color) => color !== data
                )
            );
        } else {
            setColorFilter(colorFilter.concat(data));
        }
    }

    const handleClearFilter = () => {
        setPriceFilter("");
        setColorFilter([]);
    }

    const handleChangeSort = (e) => {

    }

    return (
        <div>
            <CategorySection
                handleChangeCategory={handleChangeCategory}
            />
            <div className='flex justify-between'>
                <FilterSection
                    priceFilter={priceFilter}
                    colorFilter={colorFilter}
                    handleChangePrice={handleChangePrice}
                    handleChangeColor={handleChangeColor}
                    handleClearFilter={handleClearFilter}
                />
                <SortSection
                    sort={sort}
                    handleChangeSort={handleChangeSort}
                />

            </div>
        </div>
    );
};

export default FilterBar;