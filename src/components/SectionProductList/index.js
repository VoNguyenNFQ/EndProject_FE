import FilterBar from 'components/FilterBar';
import ProductList from 'components/ProductList';
import React, { useState, useEffect } from 'react';
import { getAllProduct, getFilterProduct } from 'utils/callAPIs';

const SectionProductList = () => {
    const [productList, setProductList] = useState([]);
    const [productQuantity, setProductQuantity] = useState(0);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("atoz");
    const [priceFilter, setPriceFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState(0);
    const [loadingStart, setLoadingStart] = useState(true);


    const handleChangePrice = (data) => {
        setPriceFilter(data);
    }

    const handleChangeColor = (e) => {
        setColorFilter(e.target.value);
    }

    const handleClearFilter = () => {
        setPriceFilter("");
        setColorFilter(0);
        setPage(1);
    }

    const handleChangeSort = (e) => {

    }

    const handleLoadMore = async () => {
        setLoading(true);
        setPage(page + 1)
        setLoading(false);
    }

    const handleCheckDisplayLoadMore = () => {
        return (productQuantity / ((page + 1) * 9)) >= 1
    }

    useEffect(() => {
        setLoading(true);
        setLoadingStart(true);
        getFilterProduct(page, {
            category: categoryFilter,
            color: colorFilter,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        }).then(data => {
            const newProductList = productList.concat(data.data)
            setProductList(newProductList)
            setLoadingStart(false)
            setProductQuantity(data.total);
            setLoading(false);
        })
    }, [page])

    return (
        <div className="container">
            <FilterBar
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                colorFilter={colorFilter}
                priceFilter={priceFilter}
                handleChangePrice={handleChangePrice}
                handleChangeColor={handleChangeColor}
                handleClearFilter={handleClearFilter}
                handleChangeSort={handleChangeSort}
                productList={productList}
                setProductList={setProductList}
                page={page}
                setPage={setPage}
                setProductQuantity={setProductQuantity}
                setLoadingStart={setLoadingStart}
            />
            <ProductList
                productList={productList}
                loading={loading}
                loadingStart={loadingStart}
                handleLoadMore={handleLoadMore}
                handleCheckDisplayLoadMore={handleCheckDisplayLoadMore}
            />
        </div>
    );
};

export default SectionProductList;