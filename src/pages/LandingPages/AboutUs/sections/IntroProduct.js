import ProductItem from 'components/ProductItem';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduct } from 'utils/callAPIs'

function IntroProduct() {
    // const data = [
    //     {
    //         "id": 1,
    //         "name": "SQUARE TOE SLINGBACK ",
    //         "description": "Loại sản phẩm: Giày Cao Gót",
    //         "price": "25",
    //         "color": "Black",
    //         "gallery": [
    //             "https://www.vascara.com/uploads/cms_productmedia/2021/December/30/giay-sandal-quai-phoi-metallic-sdn-0703-mau-den-4__62026__1640846516-medium.jpg",
    //             "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
    //             "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
    //             "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
    //             "https://www.vascara.com/uploads/cms_productmedia/2022/February/6/giay-bit-mui-nhon-satin-dinh-no-bmn-0504-mau-xanh-navy-main__62754__1644132859-medium@2x.jpg",
    //         ]
    //     },
    // ]

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        getAllProduct().then(data => setProductList(data)).catch(error => console.log(error));
    }, [])

    return (
        <div>
            <div class="mt-6 lg:mt-0 lg:px-5 lg:w-5/5 py-10">
                <h2 class="uppercase text-gray-500 font-normal text-2xl text-center">Our products</h2>
                <div class="flex items-center justify-end text-sm tracking-widest ">

                    <div class="flex items-center">
                        <Link to="/product-list"><p class="text-gray-500 ">See more</p></Link>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-10">

                    {productList.map((product) =>
                        <ProductItem product={product} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default IntroProduct;
