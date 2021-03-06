import ProductItem from 'components/ProductItem';
import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from "styled-components";

const Row = styled.div.attrs({
    className: "col-span-1 sm:grid-cols-2 md:col-span-3 lg:col-span-4 xl:col-span-4 text-center"
})``;

const ProductList = ({ productList, handleLoadMore, loading, handleCheckDisplayLoadMore }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 mt-8">
            {
                productList.length > 0
                    ?
                    productList.map((item, index) => <ProductItem key={index} product={item} />)
                    :
                    loading ||
                    <Row className='text-xl text-center text-gray-400'>No Products to show</Row>
            }
            {loading ?
                <Row>
                    <div className='flex items-center justify-center h-96'>
                        <BeatLoader
                            color={'#FC5DAB'}
                            loading={loading}
                            size={15}
                        />
                    </div>
                </Row>
                :
                handleCheckDisplayLoadMore() &&
                <Row>
                    <button 
                    onClick={handleLoadMore}
                     className='bg-pink-400 hover:bg-pink-600 text-white uppercase py-2.5 px-4 rounded-full'>View More</button>
                </Row>
            }
        </div >
    );
};

export default ProductList;