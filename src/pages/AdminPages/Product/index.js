import { showAlert } from 'actions/alert';
import { hideLoader, showLoader } from 'actions/loading';
import AddProductForm from 'components/AddProductForm';
import AlertModal from 'components/AlertModal';
import EditProductForm from 'components/EditProductForm';
import ProductDetailModal from 'components/ProductDetailModal';
import PaginatedItems from 'components/Pagination';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { formatMoney } from 'utils/formatNumber';
import { deleteProduct, getAllProduct, getFilterProduct } from 'utils/callAdminAPIs';
import FilterProductBar from 'components/FilterProductBar';
import { debounce } from 'lodash';
import { getAllCategory } from 'utils/callAPIs';

const StyledHeaderCell = styled.div.attrs({
    className: "table-header-cell table-cell px-6 align-middle text-center font-bold border border-solid py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap bg-gray-200 text-gray-500 border-gray-100"
})``;

const StyledTableCell = styled.div.attrs({
    className: " table-cell border-t-0 px-2 align-middle border-l-0 border-r-0 text-md whitespace-nowrap"
})``;

const Product = () => {
    const [categoryArray, setCategoryArray] = useState([]);
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
    const [productDetailProp, setProductDetailProp] = useState({});
    const loadingScreen = useSelector(state => state.loading)
    const [keyword, setKeyword] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [sortValue, setSortValue] = useState({ id: "DESC" });

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

    const handleViewProduct = () => {
        setActiveBar("productList-page");
        setActiveEdit(false);
        setEditData(null);
    }

    const getProductFilter = (value, cate) => {
        setPage(1)
        setPageCount(0)
        getFilterProduct(1, {
            name: value,
            category: cate
        }).then(data => {
            console.log(data);
            setProductList(data.data)
            setTotalProduct(data.total)
            setPageCount(Math.ceil(data.total / 10));
            setLoading(false);
        }).catch(error => {
            setLoading(false)
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }

    const debounceChangeInput = useCallback(debounce((value, categoryFilter) => getProductFilter(value, categoryFilter), 1000), [])

    const handleSearchInputChange = (e) => {
        setLoading(true);
        console.log(e.target.value);
        setKeyword(e.target.value);
        debounceChangeInput(e.target.value, categoryFilter);
    }

    const handleFilterCategory = (e) => {
        setPage(1)
        setPageCount(0)
        setLoading(true)
        setKeyword("");
        setCategoryFilter(e.target.value);
        getFilterProduct(1, {
            category: e.target.value
        }).then(data => {
            setLoading(false);
            setProductList(data.data)
            setTotalProduct(data.total)
            setPageCount(Math.ceil(data.total / 10));
        }).catch(error => {
            setLoading(false)
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }

    const handleSort = (data) => {
        setPage(1)
        setPageCount(0)
        setLoading(true)
        getFilterProduct(1, {
            order: data
        }).then(data => {
            setLoading(false);
            setProductList(data.data)
            setTotalProduct(data.total)
            setPageCount(Math.ceil(data.total / 10));
        }).catch(error => {
            setLoading(false)
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }

    const handleDelete = () => {
        setPage(1)
        setPageCount(0)
        setShowActionBar(false);
        setShowDialog(false);
        dispatch(showLoader())
        deleteProduct(editData.id).then(data => {
            if (data.status == "204") {
                getAllProduct(1).then(data => {
                    setTotalProduct(data.total)
                    setProductList(data.data)
                    setPageCount(Math.ceil(data.total / 10));
                    dispatch(hideLoader());
                    dispatch(showAlert({ type: "success", message: "Delete product successfully!" }))
                })
            }
        })
            .catch(error => console.log(error));
    }

    const handleSetFieldSort = (field) => {
        setSortValue({
            [field]: sortValue.hasOwnProperty(field)
                ? sortValue[`${field}`] == "ASC" ? "DESC" : "ASC"
                : "ASC"
        })
        handleSort({
            [field]: sortValue.hasOwnProperty(field)
                ? sortValue[`${field}`] == "ASC" ? "DESC" : "ASC"
                : "ASC"
        });
    }

    useEffect(() => {
        if (activeBar == "productList-page") {
            setLoading(true)
            getAllProduct(1).then(data => {
                setLoading(false);
                setTotalProduct(data.total)
                setProductList(data.data)
                setPageCount(Math.ceil(data.total / 10));
            })
        }
    }, [activeBar])

    useEffect(() => {
        getFilterProduct(page, {
            category: categoryFilter,
            order: sortValue
        }).then(data => {
            setLoading(false)
            setProductList(data.data)
            setTotalProduct(data.total)
            setPageCount(Math.ceil(data.total / 10));
        }).catch(error => console.log(error))
    }, [page]);

    const handlePageClick = (event) => {
        setLoading(true)
        const newOffset = event.selected + 1;
        setPage(newOffset);
    };

    useEffect(() => {
        getAllCategory().then(data => {
            setCategoryArray(data)
        }).catch(error => {
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }, [])

    return (
        <div className='md:ml-64'>
            {showDetail && <ProductDetailModal show={showDetail} setShow={setShowDetail} product={productDetailProp} />}

            <div className=' bg-pink-500 pt-4 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white"
                    >
                        <div className="rounded-t mb-0 px-0 sm:px-16 py-4 border-0">
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
                        {
                            activeBar == "productList-page" &&
                            <FilterProductBar
                                categoryArray={categoryArray}
                                handleFilterCategory={handleFilterCategory}
                                handleSearchInputChange={handleSearchInputChange}
                                keyword={keyword}
                            />
                        }
                        <div className="block rounded w-full overflow-x-auto">
                            {
                                activeBar == "productList-page" &&
                                <>
                                    <div
                                        className="table items-center w-full bg-transparent border-collapse"
                                    >
                                        <div className='table-header-group bg-gray-500 border border-b-2 '>
                                            <StyledHeaderCell>
                                                <div
                                                    className='flex items-center cursor-pointer'
                                                    onClick={() => handleSetFieldSort("id")}
                                                >
                                                    <p>Id</p>
                                                    {
                                                        sortValue.hasOwnProperty("id") &&
                                                        (sortValue.id == "ASC"
                                                            ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                            </svg>
                                                        )
                                                    }
                                                </div>
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>
                                                Image
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>
                                                <div
                                                    className='flex items-center cursor-pointer'
                                                    onClick={() => handleSetFieldSort("name")}
                                                >
                                                    <p>Name</p>
                                                    {
                                                        sortValue.hasOwnProperty("name") &&
                                                        (sortValue.name == "ASC"
                                                            ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                            </svg>
                                                        )
                                                    }
                                                </div>
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>
                                                <div
                                                    className='flex items-center cursor-pointer'
                                                    onClick={() => handleSetFieldSort("price")}
                                                >
                                                    <p>Price</p>
                                                    {
                                                        sortValue.hasOwnProperty("price") &&
                                                        (sortValue.price == "ASC"
                                                            ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                            </svg>
                                                        )
                                                    }
                                                </div>
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
                                                <div
                                                    className='flex items-center cursor-pointer'
                                                    onClick={() => handleSetFieldSort("createAt")}
                                                >
                                                    <p>Create At</p>
                                                    {
                                                        sortValue.hasOwnProperty("createAt") &&
                                                        (sortValue.createAt == "ASC"
                                                            ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                            </svg>
                                                        )
                                                    }
                                                </div>
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>

                                            </StyledHeaderCell>
                                        </div>
                                        {
                                            (productList.length > 0 && !loading) &&
                                            <div className='table-row-group'>
                                                {
                                                    productList.length && productList.map(product =>
                                                        <div key={product.id} className='table-row border border-b-1 hover:bg-slate-50 border-gray-200'>
                                                            <StyledTableCell className='py-1'>
                                                                #{product.id}
                                                            </StyledTableCell>
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
                                                            <StyledTableCell className='text-center'>
                                                                {product.createAt}
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
                                                                        <div onClick={() => { setShowDetail(true); setShowActionBar(false); setProductDetailProp(product) }} className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700">
                                                                            View Detail
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {showDialog &&
                                                                    <AlertModal setShow={setShowDialog} handleAction={handleDelete} message={"Are you sure you want to delete this product?"} />
                                                                }

                                                            </StyledTableCell>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        }

                                    </div>
                                    {
                                        (productList.length == 0 && !loading) &&
                                        <div className='my-8 text-center w-full'>No product to display</div>
                                    }
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
                                    {productList.length > 0 && pageCount != 0 &&
                                        <PaginatedItems
                                            pageCount={pageCount}
                                            handlePageClick={handlePageClick}
                                        />
                                    }
                                </>
                            }
                            {
                                activeBar == "addProduct-page" && !loading &&
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