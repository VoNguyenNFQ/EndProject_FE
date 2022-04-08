import { showAlert } from 'actions/alert';
import { hideLoader, showLoader } from 'actions/loading';
import AddProductForm from 'components/AddProductForm';
import AlertModal from 'components/AlertModal';
import EditProductForm from 'components/EditProductForm';
import PaginatedItems from 'components/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { formatMoney } from 'utils/formatNumber';
import { deleteProduct, getAllProduct } from 'utils/callAdminAPIs';

const StyledHeaderCell = styled.div.attrs({
    className: "table-header-cell table-cell px-6 align-middle text-center font-bold border border-solid py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap bg-gray-200 text-gray-500 border-gray-100"
})``;

const StyledTableCell = styled.div.attrs({
    className: " table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4"
})``;

const Product = () => {
    const [showActionBar, setShowActionBar] = useState(false);
    const [activeBar, setActiveBar] = useState("productList-page");
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0)
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const loadingScreen = useSelector(state => state.loading)
    const dispatch = useDispatch();

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

    const getAmoutInStock = (data) => data.reduce((a, b) => a + b.amount, 0)

    useEffect(() => {
        if (activeBar == "productList-page") {
            setLoading(true)
            getAllProduct(page).then(data => {
                // setLoading(false);
                setTotalProduct(data.total)
                setProductList(data.data)
            })
        }
    }, [activeBar])

    const handleViewProduct = () => {
        setActiveBar("productList-page");
        setActiveEdit(false);
        setEditData(null);
    }

    const handleShowDetail = (data) => {
        setShowDetail(true);
    }

    const handleDelete = () => {
        setShowActionBar(false);
        setShowDialog(false);
        dispatch(showLoader())
        deleteProduct(editData.id).then(data => {
            if (data.status == "204") {
                getAllProduct(1).then(data => {
                    setTotalProduct(data.total)
                    setProductList(data.data)
                    dispatch(hideLoader());
                    dispatch(showAlert({ type: "success", message: "Delete product successfully!" }))
                })
            }
        })
            .catch(error => console.log(error));
    }

    return (
        <div className='md:ml-64'>
            <div className=' bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white"
                    >
                        <div className="rounded-t mb-0 px-16 py-4 border-0">
                            <div className="flex items-center">
                                <div
                                    onClick={() => handleViewProduct()}
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
                        <div className="block rounded w-full overflow-x-auto">
                            {
                                activeBar == "productList-page" &&
                                <>
                                    {
                                        loading &&
                                        <div className='flex items-center justify-center h-96'>
                                            <BeatLoader
                                                color={'#FC5DAB'}
                                                loading={true}
                                                size={15}
                                            />
                                        </div>
                                    }
                                    {
                                        (productList.length > 0 && !loading) &&
                                        <>
                                            <div
                                                className="table items-center w-full bg-transparent border-collapse"
                                            >
                                                <div className='table-header-group bg-gray-500 border border-b-2 '>
                                                    <StyledHeaderCell>
                                                        Image
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>
                                                        Name
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
                                                        In stock
                                                    </StyledHeaderCell>
                                                    <StyledHeaderCell>

                                                    </StyledHeaderCell>
                                                </div>

                                                <div className='table-row-group'>
                                                    {
                                                        productList.length && productList.map(product =>
                                                            <div key={product.id} className='table-row border border-b-1 hover:bg-slate-50 border-gray-200'>
                                                                <StyledTableCell className='py-1'>
                                                                    <img className='w-[80px]' src={product.gallery[0]} />
                                                                </StyledTableCell>
                                                                <StyledTableCell>
                                                                    {product.name}
                                                                </StyledTableCell>
                                                                <StyledTableCell className='text-center'>
                                                                    {formatMoney(product.price)}
                                                                </StyledTableCell>
                                                                <StyledTableCell className='text-center'>
                                                                    {product.color.name}
                                                                </StyledTableCell>
                                                                <StyledTableCell className='text-center'>
                                                                    {product.category.name}
                                                                </StyledTableCell>
                                                                <StyledTableCell className='text-center'>
                                                                    {getAmoutInStock(product.items)}
                                                                </StyledTableCell>
                                                                <StyledTableCell
                                                                    className="relative text-right"
                                                                >
                                                                    <div
                                                                        className="text-gray-500 block py-1 px-3 cursor-pointer"
                                                                        onClick={() => handleSetShowAction(product)}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    {
                                                                        (showActionBar && editData.id === product.id) &&
                                                                        <div
                                                                            onBlur={() => setShowActionBar(false)}
                                                                            className="absolute bg-white top-full right-0 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                                            id="table-light-1-dropdown"
                                                                        >
                                                                            <div
                                                                                onClick={() => handleEdit(product)}
                                                                                className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
                                                                            >
                                                                                Edit
                                                                            </div>
                                                                            <div onClick={() => { setShowDialog(true) }} className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                                                Delete
                                                                            </div>
                                                                            <div onClick={() => { setShowDetail(true) }} className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                                                View Detail
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {showDialog &&
                                                                        <AlertModal setShow={setShowDialog} handleDelete={handleDelete} />
                                                                    }
                                                                    
                                                                </StyledTableCell>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                        </>
                                    }
                                    {productList.length > 0 &&
                                        <PaginatedItems
                                            total={totalProduct}
                                            setProductList={setProductList}
                                            itemsPerPage={10}
                                            loading={loading}
                                            setLoading={setLoading}
                                            page={page}
                                            setPage={setPage}
                                            pageCount={pageCount}
                                            setPageCount={setPageCount}
                                        />
                                    }
                                </>
                            }
                            {
                                activeBar == "addProduct-page" &&
                                <>
                                    {
                                        editData ?
                                            <EditProductForm editData={editData} />
                                            :
                                            <AddProductForm />
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;