import CategorySection from 'components/CategorySection';
import FilterSection from 'components/FIlterSection';
import SortSection from 'components/SortSection';
import React, { useEffect, useState } from 'react';
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

const FilterBar = ({ productList, setProductList }) => {

    const [sort, setSort] = useState("atoz");
    const [priceFilter, setPriceFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(0);

    const handleChangeCategory = (e, id) => {
        setCategoryFilter(id);
    }

    // Fake API filter function
    const handleFilter = () => {

        console.log("Category: ", categoryFilter)
        console.log("Color: ", colorFilter)
        console.log("priceFrom: ", priceFilter.value.priceFrom)
        console.log("priceTo: ", priceFilter.value.priceTo)
        // getFilterProduct({
        //     category: categoryFilter,
        //     color: colorFilter,
        //     priceFrom: priceFilter.value.priceFrom,
        //     priceTo: priceFilter.value.priceTo
        // })
    }

    const handleChangePrice = (data) => {
        setPriceFilter(data);
    }

    const handleChangeColor = (e) => {
        setColorFilter(e.target.value);
    }

    const handleClearFilter = () => {
        setPriceFilter("");
        setColorFilter("");
    }

    const handleChangeSort = (e) => {

    }

    useEffect(() => {
        let newList = [];
        if (categoryFilter === 0) {
            getAllProduct().then(data => setProductList(data));
            return;
        }
        for (let i = 1; i <= categoryFilter; i++) {
            newList.push(productAPIs1);
        }
        setProductList(newList);
    }, [categoryFilter])

    return (
        <div>
            {/* <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div class="animate-spin ease-linear rounded-full border-4 border-t-4 border-pink-200 h-12 w-12 mb-4"></div>
                <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
            </div> */}

            <CategorySection
                categoryFilter={categoryFilter}
                handleChangeCategory={handleChangeCategory}
            />
            <div className='flex justify-between'>
                <FilterSection
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