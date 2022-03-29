import FilterBar from 'components/FilterBar';
import ProductList from 'components/ProductList';
import React, { useState, useEffect } from 'react';
import { getAllProduct } from 'utils/callAPIs';

const SectionProductList = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getAllProduct().then(data => console.log(data))
    }, [])

    return (
        <div className="container">
            <FilterBar
                productList={productList}
                setProductList={setProductList}
            />
            <ProductList
                productList={productList}
                setProductList={setProductList}
            />
        </div>
    );
};

export default SectionProductList;