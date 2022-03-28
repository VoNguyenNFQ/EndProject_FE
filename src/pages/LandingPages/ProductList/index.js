import ProductItem from 'components/ProductItem';
import React, { useState } from 'react';

const productList = [
    {   id: 1,
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

const ProductList = () => {
    const [list, setList] = useState(productList);
    const [loading, setLoading] = useState(false);

    const callAPILoadMoreProduct = async () => {
        // axios.get().then(data => {}).catch(error => {})
    }

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setList([...list,
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
            },
            ])
            setLoading(false);
        }, 1000)
    }

    return (
        <section className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl px-10 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
                    {list.map((item, index) => <ProductItem key={index} product={item} />)}
                    <div className='col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 text-center'>
                        {
                            loading ?
                                <button type="button" className="inline-flex items-center px-4 py-2.5 leading-6 text-sm shadow rounded-full text-white bg-pink-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </button>
                                :
                                <button onClick={handleLoadMore} className='bg-pink-400 hover:bg-pink-600 text-white uppercase py-2.5 px-4 rounded-full'>View More</button>
                        }
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ProductList;