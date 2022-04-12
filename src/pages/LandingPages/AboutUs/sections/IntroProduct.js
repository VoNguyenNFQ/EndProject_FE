import ProductItem from 'components/ProductItem';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduct } from 'utils/callAPIs'
import BeatLoader from "react-spinners/BeatLoader";

function IntroProduct() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getAllProduct().then(data => {
            setProductList(data)
            setLoading(false);
        }
        ).catch(error => console.log(error));
    }, [])

    return (
        <div>
            <div className="mt-6 lg:mt-0 lg:px-5 lg:w-5/5 py-10">
                <h2 className="uppercase text-gray-500 font-normal text-3xl text-center">Our products</h2>
                <div className="flex items-center justify-end text-sm tracking-widest ">

                    <div className="flex items-center text-xl mr-10">
                        <Link to="/product-list"><p className="text-gray-500 ">See more</p></Link>
                    </div>
                </div>
                {
                    loading ?
                        <div className='flex items-center justify-center h-96'>
                            <BeatLoader
                                color={'#FC5DAB'}
                                loading={loading}
                                size={15} /> </div>
                        :
                        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-10">

                            {productList.slice(0,8).map((product) => <ProductItem  key={product.id} product={product} />)}

                        </div>
                }
            </div>
        </div>
    );
}

export default IntroProduct;
