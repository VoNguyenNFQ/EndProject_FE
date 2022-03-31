import CategorySection from 'components/CategorySection';
import FilterSection from 'components/FIlterSection';
import SortSection from 'components/SortSection';
import React, { useEffect } from 'react';
import { getFilterProduct } from 'utils/callAPIs';

const FilterBar = ({
    page,
    setPage,
    sort,
    setLoadingStart,
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
        setLoadingStart(true)
        setProductList([]);
        getFilterProduct(page, {
            category: categoryFilter,
            color: colorFilter,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        }).then(data => {
            setProductQuantity(data.total)
            setProductList(data.data)
            setLoadingStart(false)
        })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleFilter()
    }, [categoryFilter])

    return (
        <div className='sticky top-0 bg-white'>
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
                    />
                    <SortSection
                        sort={sort}
                        handleChangeSort={handleChangeSort}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;