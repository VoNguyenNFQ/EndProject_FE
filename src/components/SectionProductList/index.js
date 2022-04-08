import FilterBar from 'components/FilterBar';
import ProductList from 'components/ProductList';
import React, { useState, useEffect } from 'react';
import { getAllProduct, getFilterProduct } from 'utils/callAPIs';

const SectionProductList = () => {
    const [productList, setProductList] = useState([]);
    const [productQuantity, setProductQuantity] = useState(0);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState(null);
    const [priceFilter, setPriceFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(0);
    const [loading, setLoading] = useState(true);


    const handleChangePrice = (data) => {
        setPriceFilter(data);
    }

    const handleChangeColor = (data) => {
        const isChecked = colorFilter.some(color => color == data)
        if (isChecked) {
            setColorFilter(
            colorFilter.filter(
              (colorCheck) => colorCheck !== data
            )
          );
        } else {
            setColorFilter(colorFilter.concat(data));
        }
    }

    const handleClearFilter = () => {
        setPriceFilter("");
        setColorFilter([]);
        setPage(1);
    }

    const handleChangeSort = (data) => {
        setSort(data);
        setLoading(true)
        setProductList([]);
        getFilterProduct(page, {
            category: categoryFilter,
            color: colorFilter,
            order: data,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        })
            .then(data => {
                setProductList(data.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    const handleLoadMore = async () => {
        setPage(page + 1)
        setLoading(true);
        getFilterProduct(page + 1, {
            category: categoryFilter,
            color: colorFilter,
            order: sort,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        })
            .then(data => {
                const newProductList = productList.concat(data.data)
                setProductList(newProductList)
                setProductQuantity(data.total);
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    const handleCheckDisplayLoadMore = () => {
        return (productQuantity - (page * 9)) > 0
    }

    useEffect(() => {
        setLoading(true)
        setProductList([]);
        getFilterProduct(page, {
            category: categoryFilter,
            color: colorFilter,
            order: sort,
            priceFrom: priceFilter?.value?.priceFrom || "",
            priceTo: priceFilter?.value?.priceTo || ""
        })
            .then(data => {
                setProductList(data.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [sort])

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
                setLoading={setLoading}
            />
            <ProductList
                productList={productList}
                loading={loading}
                handleLoadMore={handleLoadMore}
                handleCheckDisplayLoadMore={handleCheckDisplayLoadMore}
            />
        </div>
    );
};

export default SectionProductList;