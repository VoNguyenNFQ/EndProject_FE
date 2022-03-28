import BreadScrumTw from 'components/BreadScrum';
import FilterBar from 'components/FilterBar';
import ProductList from 'components/ProductList';
import React, { useState } from 'react';


const productAPIs = [
    {
        id: 1,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: "cover"
            },
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: ""
            },
        ],
        price: '560.000đ'
    },
    {
        id: 2,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: "cover"
            },
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: ""
            },
        ],
        price: '560.000đ'
    },
    {
        id: 3,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: "cover"
            },
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: ""
            },
        ],
        price: '560.000đ'
    },
    {
        id: 4,
        name: 'Giày Sandal Satin Gót Nhũ Geometric',
        gallery: [
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: "cover"
            },
            {
                path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
                type: ""
            },
        ],
        price: '560.000đ'
    },
]

const productAPIs1 =
{
    name: 'Giày Sandal Satin Gót Nhũ Geometric',
    gallery: [
        {
            path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            type: "cover"
        },
        {
            path: "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
            type: ""
        },
    ],
    price: '560.000đ'
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

    return (
        <div className="container">
            <BreadScrumTw />
            <FilterBar
                handleChangeCategory={handleChangeCategory}
            />
            <ProductList
                productList={productList}
                setProductList={setProductList}
            />
        </div>
    );
};

export default SectionProductList;