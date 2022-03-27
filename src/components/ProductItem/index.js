import React from 'react';
import { Link } from 'react-router-dom'

const ProductItem = ({ product }) => {
    const { id, name, price, gallery } = product;

    let imageCover;
    gallery.map(image => {
        if (image.type === "cover") imageCover = image.path
    })

    return (
        // <Link to="#">
        <div className='flex flex-col items-center justify-center w-full max-w-lg mx-auto'>
            <a href={`/product-list/${id}`}>
                <img src={imageCover} className="object-cover w-full rounded-md hover:shadow-[0_0_8px_1px_#ff529c]" />
            </a>
            <h4 className='mt-2 text-lg font-normal text-gray-700'>{name}</h4>
            <p className='text-[#ff529c] font-bold truncate'>{price}</p>
        </div>
        // </Link>
    );
};

export default ProductItem;