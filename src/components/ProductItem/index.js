import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from 'utils/formatNumber'
import 'assets/css/main.css';

const ProductItem = ({ product}) => {
    const { id, name, price, gallery } = product;
    //417
    return (
        <Link to={`/product-list/${id}`}>
            <div id={"product-" + id} className='flex flex-col items-center justify-center w-full max-w-lg mx-auto'>
            <div class="img-hover-zoom">
                <img src={gallery[0]} alt={name} className={`h-[417px] object-cover w-full rounded-md hover:shadow-[0_0_8px_1px_#ff529c]`} />
            </div>
                <h4 className='mt-2 text-lg font-normal text-gray-700 text-center truncate w-full'>{name}</h4>
                <p className='text-pink-400 font-bold'>{formatMoney(price)}</p>
            </div>
        </Link>
    );
};

export default ProductItem;