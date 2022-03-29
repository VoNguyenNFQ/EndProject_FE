import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from 'utils/formatNumber'

const ProductItem = ({ product }) => {
    const { id, name, price, gallery } = product;

    return (
        <Link to={`/product-list/${id}`}>
            <div className='flex flex-col items-center justify-center w-full max-w-lg mx-auto'>
                <img src={gallery[0]} className="object-cover w-full rounded-md hover:shadow-[0_0_8px_1px_#ff529c]" />
                <h4 className='mt-2 text-lg font-normal text-gray-700 truncate w-full'>{name}</h4>
                <p className='text-[#ff529c] font-bold'>{formatMoney(price)}</p>
            </div>
        </Link>
    );
};

export default ProductItem;