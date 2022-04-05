import AddProductForm from 'components/AddProductForm';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllProduct } from 'utils/callAdminAPIs';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const StyledHeaderCell = styled.div.attrs({
    className: "table-header-cell table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
})``;

const Product = () => {
    const [showActionBar, setShowActionBar] = useState(false);
    const [activeBar, setActiveBar] = useState("productList-page")
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);

    const handleEdit = (data) => {
        setActiveEdit(true)
        setEditData(data)
        setShowActionBar(false)
        setActiveBar("addProduct-page")
    }

    const handleSetShowAction = (data) => {
        setEditData(data)
        setShowActionBar(!showActionBar)
    }

    useEffect(() => {
        getAllProduct().then(data => {
            setLoading(false);
            setProductList(data.data)
        }).catch(error => console.log(error))
    }, [])

    return (
        <div className='md:ml-64'>
            <div className=' bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                    >
                        <div className="rounded-t mb-0 px-16 py-4 border-0">
                            <div className="flex flex-wrap items-center">
                                <div
                                    onClick={() => setActiveBar("productList-page")}
                                    className={`inline-block rounded-lg text-l hover:text-white hover:bg-pink-400 p-2 px-4 border border-pink-400
                                    ${activeBar === "productList-page" ? 'bg-pink-400 text-white' : ''}
                                    `}
                                >
                                    <h3 className="cursor-pointer font-semibold">
                                        Product List
                                    </h3>
                                </div>
                                <div
                                    onClick={() => setActiveBar("addProduct-page")}
                                    className={`inline-block rounded-lg text-l hover:text-white hover:bg-pink-400 p-2 px-4 ml-2 border border-pink-400
                                    ${activeBar === "addProduct-page" ? 'bg-pink-400 text-white' : ''}
                                    `}
                                >
                                    <h3 className="cursor-pointer font-semibold">
                                        {activeEdit ? "Edit Product" : "Add Product"}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {
                                activeBar == "productList-page" &&
                                <>
                                    {
                                        loading ?
                                            <div className='flex items-center justify-center h-96'>
                                                <BeatLoader
                                                    color={'#FC5DAB'}
                                                    loading={true}
                                                    size={15}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="table items-center w-full bg-transparent border-collapse"
                                            >
                                                <div className='table-header-group'>
                                                    <StyledHeaderCell>
                                                        Product
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>
                                                        Price
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>
                                                        Color
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>
                                                        Category
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>
                                                        Items
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>

                                                    </StyledHeaderCell>
                                                </div>

                                                <div className='table-row-group'>
                                                    {
                                                        productList.length && productList.map(product =>
                                                            <div key={product.id} className='table-row'>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                                                >
                                                                    {product.name}
                                                                </div>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                                                >
                                                                    {product.price}
                                                                </div>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                                                >
                                                                    {product.color}
                                                                </div>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                                                >
                                                                    {product.category}
                                                                </div>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                                                >
                                                                    1
                                                                </div>
                                                                <div
                                                                    className="table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                                                                >
                                                                    <div
                                                                        className="relative text-gray-500 block py-1 px-3 cursor-pointer"
                                                                        onClick={() => handleSetShowAction(product)}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    {
                                                                        (showActionBar && editData.id === product.id) &&
                                                                        <div
                                                                            className="absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                                            id="table-light-1-dropdown"
                                                                        >
                                                                            <div
                                                                                onClick={() => handleEdit(product)}
                                                                                className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                                            >
                                                                                Edit
                                                                            </div>
                                                                            <div className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                                                Delete
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                    }
                                </>
                            }
                            {
                                activeBar == "addProduct-page" &&
                                <AddProductForm editData={editData}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;