import CategorySection from 'components/CategorySection';
import FilterSection from 'components/FIlterSection';
import SortSection from 'components/SortSection';
import React, { useEffect, useState } from 'react';
import { getAllProduct, getFilterProduct } from 'utils/callAPIs';

const FilterBar = ({
    page,
    setPage,
    sort,
    categoryFilter,
    priceFilter,
    colorFilter,
    setProductList,
    setProductQuantity,
    setCategoryFilter,
    handleChangePrice,
    handleChangeColor,
    handleClearFilter,
    handleChangeSort,
}) => {

    const handleChangeCategory = (e, id) => {
        handleClearFilter();
        setCategoryFilter(id);
    }

    const handleFilter = () => {
        getFilterProduct(page, {
            category: categoryFilter,
            color: colorFilter,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        }).then(data => {
            setProductQuantity(data.total)
            setProductList(data.data)
        })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleFilter()
    }, [categoryFilter])

    return (
        <div>
            <CategorySection
                categoryFilter={categoryFilter}
                handleChangeCategory={handleChangeCategory}
            />
            <div className='flex justify-between'>
                <FilterSection
                    setPage={setPage}
                    priceFilter={priceFilter}
                    colorFilter={colorFilter}
                    handleChangePrice={handleChangePrice}
                    handleChangeColor={handleChangeColor}
                    handleClearFilter={handleClearFilter}
                    handleFilter={handleFilter}
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