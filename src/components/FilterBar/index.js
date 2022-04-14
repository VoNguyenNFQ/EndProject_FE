import CategorySection from 'components/CategorySection';
import FilterSection from 'components/FIlterSection';
import SortSection from 'components/SortSection';
import React, { useEffect } from 'react';
import { getFilterProduct } from 'utils/callAPIs';
import { useState } from 'react';

const FilterBar = ({
    page,
    setPage,
    sort,
    setLoading,
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

    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const handleChangeCategory = (e, id) => {
        handleClearFilter();
        setCategoryFilter(id);
    }

    const handleFilter = () => {
        setLoading(true)
        setProductList([]);
        getFilterProduct(1, {
            category: categoryFilter,
            color: colorFilter,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        }).then(data => {
            console.log(data);
            setProductQuantity(data.total)
            setProductList(data.data)
            setLoading(false)
        })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleFilter()
    }, [categoryFilter])

    return (
        <div className='sticky top-0 bg-white z-[2]'>
            <div className='flex flex-wrap sm:flex-nowrap justify-between'>
                <CategorySection
                    categoryFilter={categoryFilter}
                    handleChangeCategory={handleChangeCategory}
                />
                <div className='relative flex items-center w-full justify-between sm:justify-end'>
                    <FilterSection
                        setPage={setPage}
                        priceFilter={priceFilter}
                        colorFilter={colorFilter}
                        handleChangePrice={handleChangePrice}
                        handleChangeColor={handleChangeColor}
                        handleClearFilter={handleClearFilter}
                        handleFilter={handleFilter}
                        showFilter={showFilter}
                        setShowFilter={setShowFilter}
                    />
                    <SortSection
                        showSort={showSort}
                        setShowSort={setShowSort}
                        handleChangeSort={handleChangeSort}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;