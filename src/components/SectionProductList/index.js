import BreadScrumTw from 'components/BreadScrum';
import FilterBar from 'components/FilterBar';
import ProductList from 'components/ProductList';
import React, { useState, useEffect } from 'react';
import { getAllProduct } from 'utils/callAPIs';

const productAPIs = [
    {
        id: 1,
        color: 1,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
        ],
        price: 200000
    },
    {
        id: 2,
        color: 2,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
        ],
        price: 500000
    },
    {
        id: 3,
        color: 2,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
        ],
        price: 700000
    },
    {
        id: 4,
        color: 3,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
        ],
        price: 1000000
    },
]

const productAPIs1 =
{
    id: 10,
    name: 'Giày Sandal Satin Gót Nhũ Geometric',
    gallery: [
        "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
        "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
    ],
    price: 560000
}

const SectionProductList = () => {
    const [productList, setProductList] = useState(productAPIs);

    const handleChangeCategory = (e, id) => {
        let newList = [];
        if (id === 0) {
            setProductList(productAPIs);
            return;
        }
        for (let i = 1; i <= id; i++) {
            newList.push(productAPIs1);
        }
        setProductList(newList);
    }

    const handleFilter = (e, payload) => {
        // { color: [1, 2] }
        const key = Object.keys(payload)
        console.log(key);
        const newList = productAPIs.filter(product => payload[key].includes(product[key]));
        setProductList(newList);
    }

    useEffect(() => {
        // getAllProduct().then(data => console.log(data))
    }, [])

    return (
        <div className="container">
            {/* <BreadScrumTw /> */}
            <FilterBar
                handleChangeCategory={handleChangeCategory}
                handleFilter={handleFilter}
            />
            <ProductList
                productList={productList}
                setProductList={setProductList}
            />
        </div>
    );
};

export default SectionProductList;