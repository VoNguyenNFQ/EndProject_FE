import { showAlert } from 'actions/alert';
import { hideLoader, showLoader } from 'actions/loading';
import AddProductForm from "components/AddProductForm";
import EditProductForm from "components/EditProductForm";
import ProductDetailModal from 'components/ProductDetailModal';
import { debounce, isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { getAllProduct, getFilterProduct } from 'utils/callAdminAPIs';
import { getAllCategory } from "utils/callAPIs";
import FilterProductBar from './../../../components/FilterProductBar/index';
import AlertModal from 'components/AlertModal';
import { deleteProduct } from 'utils/callAdminAPIs';


const DataTableProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeBar, setActiveBar] = useState("productList-page");
    const [activeEdit, setActiveEdit] = useState(false);
    const [categoryArray, setCategoryArray] = useState(0)
    const [filter, setFilter] = useState({})
    const [showDetail, setShowDetail] = useState(false);
    const [productDetailProp, setProductDetailProp] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const dispatch = useDispatch();

    const customStyles = {
        rows: {
            style: {
                fontSize: "16px",
                padding: 0
            },
        },
        headCells: {
            style: {
                textTransform: "uppercase",
                fontSize: "16px",
                fontWeight: "700",
                padding: 0
            },
        },
        cells: {
            style: {
                padding: 0
            },
        },
    };

    const getAmoutInStock = (data) => data.reduce((a, b) => a + b.amount, 0)

    const handleEdit = (data) => {
        setShowDetail(false)
        setActiveEdit(true)
        setProductDetailProp(data)
        setActiveBar("addProduct-page")
    }

    const columns = [
        {
            name: "Id",
            selector: row => row.id,
            sortable: true,
            width: "80px",
            sortField: "id"
        },
        {
            name: "Image",
            cell: (row) => <img className="py-2 h-[150px]" src={row["gallery"][0]} />,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            grow: 2,
            sortField: "name"
        },
        {
            name: "Price",
            selector: row => row.price,
            sortable: true,
            center: true,
            sortField: "price"
        },
        {
            name: "Color",
            selector: row => row.color.name,
            sortable: true,
            center: true,
            sortField: "color"
        },
        {
            name: "Category",
            selector: row => row.category.name,
            sortable: true,
            center: true,
            sortField: "category"
        },
        {
            name: "In Stock",
            selector: row => getAmoutInStock(row.items),
            sortable: true,
            sortField: "inStock",
            center: true
        },
        {
            name: "Action",
            center: true,
            cell: row =>
                <>
                    <div
                        className="text-gray-500 flex py-1 px-3 cursor-pointer gap-2"
                    >
                        <svg onClick={() => handleEdit(row)} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <svg onClick={() => { setShowDialog(true) }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <svg onClick={() => { setShowDetail(true); setProductDetailProp(row) }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </>,
            width: "120px"
        }
    ]

    const handleSearchInputChange = (e) => {
        setLoading(true);
        setFilter({ ...filter, name: e.target.value });
        debounceChangeInput(e.target.value, filter.category);
    }

    const getData = async (page, size, filterData) => {
        return await getFilterProduct(page, size, filterData).then(response => {
            setData(response.data)
            setTotalRows(response.total);
            setLoading(false);
        }).catch(error => {
            setLoading(false)
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }

    const getProductFilter = (currentPage, perPage, filter) => {
        setLoading(true)
        getData(currentPage, perPage, filter)
    }

    const handleDelete = (id) => {
        setShowDialog(false);
        dispatch(showLoader())
        deleteProduct(id).then(response => {
            if (response.status == "204") {
                getAllProduct(1, perPage).then(response => {
                    setTotalRows(response.total)
                    setData(response.data)
                    dispatch(hideLoader());
                    dispatch(showAlert({ type: "success", message: "Delete product successfully!" }))
                })
            }
        })
            .catch(error => console.log(error));
    }

    const handleViewProduct = () => {
        setActiveBar("productList-page");
        setActiveEdit(false);
        setProductDetailProp(null);
    }

    const debounceChangeInput = useCallback(
        debounce((value, category) =>
            getProductFilter(currentPage, perPage, { ...filter, name: value, category: category }), 1000),
        []
    )

    const handleFilterCategory = (e) => {
        setLoading(true)
        setCurrentPage(1);
        setFilter({ category: e.target.value, name: "" });
        getData(currentPage, perPage, { category: e.target.value })
    }

    const getAllProductAPI = async (currentPage, size = perPage) => {
        setLoading(true);
        getAllProduct(currentPage, size).then(response => {
            console.log(response)
            setData(response.data);
            setTotalRows(response.total);
            setLoading(false);
        }).catch(error => console.log(error));
    };

    const handleSort = (column, sortDirection) => {
        setLoading(true);
        setFilter({ ...filter, order: { [column.sortField]: sortDirection } })
        getData(currentPage, perPage, { ...filter, order: { [column.sortField]: sortDirection } })
    }

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page);
        setLoading(true)
        isEmpty(filter, true)
            ? getAllProductAPI(currentPage, newPerPage)
            : getProductFilter(currentPage, newPerPage, filter);
    };

    const CustomLoader = () => (
        <div className='flex items-center justify-center h-96'>
            <BeatLoader
                color={'#FC5DAB'}
                loading={true}
                size={15}
            />
        </div>
    )

    useEffect(() => {
        setLoading(true)
        isEmpty(filter, true)
            ? getAllProductAPI(currentPage, perPage)
            : getProductFilter(currentPage, perPage, filter);
    }, [currentPage])

    useEffect(() => {
        getAllCategory().then(data => {
            setCategoryArray(data)
        }).catch(error => {
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }, [])

    useEffect(() => {
        if (activeBar == "productList-page") {
            setLoading(true)
            getAllProduct(1, perPage).then(data => {
                setLoading(false);
                setTotalRows(data.total)
                setData(data.data)
            })
        }
    }, [activeBar])

    return (
        <>
            <div className='md:ml-64'>
                {
                    showDetail &&
                    <ProductDetailModal
                        show={showDetail}
                        setShow={setShowDetail}
                        product={productDetailProp}
                        handleEdit={handleEdit}
                        setShowDialog={setShowDialog}
                    />
                }

                <div className=' bg-pink-500 pt-4 pb-[4rem] px-3 md:px-8 h-auto'></div>
                <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                    <div className='w-full px-4 mb-10'>
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white"
                        >
                            <div className="rounded-t mb-0 px-0 py-4 border-0">
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
                                    filter={filter}
                                />
                            }
                            {
                                activeBar == "productList-page" &&
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    sortServer
                                    onSort={handleSort}
                                    progressPending={loading}
                                    progressComponent={<CustomLoader />}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalRows}
                                    paginationDefaultPage={currentPage}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    paginationPerPage={perPage}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    onChangePage={handlePageChange}
                                    customStyles={customStyles}
                                    defaultSortFieldId={1}
                                    persistTableHead
                                />
                            }
                            {
                                activeBar == "addProduct-page" && !loading &&
                                <>
                                    {
                                        productDetailProp ?
                                            <EditProductForm editData={productDetailProp} />
                                            :
                                            <AddProductForm />
                                    }
                                </>
                            }
                            {showDialog &&
                                <AlertModal setShow={setShowDialog} handleAction={() => handleDelete(productDetailProp.id)} message={"Are you sure you want to delete this product?"} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataTableProduct;