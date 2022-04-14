import { showAlert } from 'actions/alert';
import { hideLoader, showLoader } from 'actions/loading';
import ConfirmCancelModal from 'components/ConfirmCancelOrder';
import FilterOrderBar from 'components/FIlterOrderBar';
import OrderDetailModal from 'components/OrderDetailModal';
import SuccessScreen from 'components/SuccessScreen';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { exportCSV, getAllOrder, updateOrder } from 'utils/callAdminAPIs';
import { formatMoney, formatYMD } from 'utils/formatNumber';

const DataTableOrder = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [orderDetailProp, setOrderDetailProp] = useState(null);
    const [status, setStatus] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState(formatYMD(new Date()));
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [successExportMessage, setSuccessExportMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [perPage, setPerPage] = useState(5)
    const [idOrder, setIdOrder] = useState(0)
    const [cancelMessage, setCancelMessage] = useState("")
    const [filter, setFilter] = useState({
        toDate: formatYMD(new Date()),
        fromDate: "",
        status: 0
    });

    const statusArray = [
        { id: 0, name: "All" },
        { id: 1, name: "Approved" },
        { id: 2, name: "Delivery" },
        { id: 3, name: "Canceled" },
        { id: 4, name: "Completed" },
    ]

    const customStyles = {
        rows: {
            style: {
                fontSize: "16px",
                padding: "0 4px"
            },

        },
        headCells: {
            style: {
                textTransform: "uppercase",
                fontSize: "16px",
                fontWeight: "700",
                padding: "0 4px",
                display: "flex",
                justifyContent: "center"
            },
        },
        cells: {
            style: {
                padding: "0 4px"
            },
        },
    };


    const handleUpdateOrder = (id, status) => {
        setShowAlertModal(false);
        setShowStatusDropdown(false);
        dispatch(showLoader());
        updateOrder(id, { status, cancelMessage }).then(data => {
            getAllOrder(currentPage, perPage, filter).then(data => {
                setData(data.data)
                setTotalRows(data.total)
                dispatch(hideLoader())
                dispatch(showAlert({ type: "success", message: "Update Status Successfully!" }))
            }).catch(error => {
                dispatch(hideLoader());
                dispatch(showAlert({ type: "error", message: "Something wrong!" }))
            })
        })
            .catch(error => {
                dispatch(hideLoader())
                dispatch(showAlert({ type: "error", message: "Something wrong!" }))
            })
    }

    const getStatus = (status) => {
        switch (status) {
            case "Approved":
                return { idNextStep: 2, color: "bg-yellow-500", nextStep: "Delivery" }
            case "Delivery":
                return { idNextStep: 4, color: "bg-orange-500", nextStep: "Complete" }
            case "Completed":
                return { color: "bg-green-500" }
            case "Canceled":
                return { color: "bg-red-500" }
            default:
                throw new Error("Invalid case!")
        }
    }

    const columns = [
        {
            name: "Id",
            selector: row => row.id,
            sortable: false,
            width: "30px",
            sortField: "id"
        },
        {
            name: "Order",
            cell: (row) =>
                <div className='flex flex-wrap'>
                    {row.items.length > 0 &&
                        <div className="flex w-full" key={row.items[0].id}>
                            <div className="flex p-2">
                                <div>
                                    <img className="max-w-[80px]" src={row.items[0].gallery} alt="" />
                                </div>
                                <div className="flex flex-col justify-between ml-4 w-full flex-grow">
                                    <span className="font-semibold text-md truncate w-full">{row.items[0].name}</span>
                                    <span className="text-gray-500 text-s">{row.items[0].color} | Size {row.items[0].size}</span>
                                    <span className="font-semibold text-md -mt-1">x {row.items[0].amount}</span>
                                    <span className="font-semibold text-md ">{formatMoney(row.items[0].unitPrice)}</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>,
            grow: 4
        },
        {
            name: <div>Amount of<br />items</div>,
            selector: row => row.items.length,
            sortable: false,
            sortField: "name",
            center: true
        },
        {
            name: <div>Total<br />price</div>,
            selector: row => <div className='text-pink-500 font-bold'>{formatMoney(row.totalPrice)}</div>,
            sortable: false,
            center: true,
            sortField: "color"
        },
        {
            name: <div>Created<br />date</div>,
            selector: row => row.createAt,
            sortable: false,
            center: true,
            sortField: "category"
        },
        {
            name: "Action",
            selector: row =>
                <>
                    <div onBlur={() => setShowStatusDropdown(false)}>
                        <button
                            onClick={() => { setShowStatusDropdown(!showStatusDropdown); setIdOrder(row.id) }} type="button" className={`px-3 py-1 rounded-full ${getStatus(row.status).color} mx-1`} id="menu-button" >
                            {row.status}
                        </button>
                    </div>
                    {
                        (showStatusDropdown && idOrder == row.id && row.status != "Canceled" && row.status != "Completed") &&
                        <div className="origin-top-right z-[999999] absolute right-0 mt-0.5 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <button
                                    onClick={() => handleUpdateOrder(row.id, getStatus(row.status).idNextStep)}
                                    className={`flex items-center cursor-pointer text-gray-700 px-4 py-2 text-sm`}
                                    id="status-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {getStatus(row.status).nextStep}
                                </button>
                                <button
                                    onClick={() => { setShowAlertModal(true); setIdOrder(row.id) }}
                                    className={`flex items-center cursor-pointer text-gray-700 px-4 py-2 text-sm`}
                                    id="status-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Cancel
                                </button>
                                {showAlertModal &&
                                    <ConfirmCancelModal
                                        setShow={setShowAlertModal}
                                        handleCancelOrder={handleUpdateOrder}
                                        id={idOrder}
                                        setCancelMessage={setCancelMessage}
                                    />
                                    // <AlertModal setShow={setShowAlertModal} handleAction={() => handleUpdateOrder(idOrder, 3)} message={"Are you sure you want to cancel this order?"} />
                                }
                            </div>
                        </div>
                    }
                </>,
            width: "150px",
            sortable: false,
            center: true
        },
        {
            name: "Detail",
            selector: row =>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer h-7 w-7 text-gray-600" onClick={() => { setOrderDetailProp(row); setShowDialog(true) }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>,
            sortable: false,
            center: true
        },
    ]

    useEffect(() => {
        setCurrentPage(1);
    }, [filter])

    const callExport = async (payload) => {
        dispatch(showLoader());
        return await exportCSV(payload)
            .then(response => {
                if (response.status == 200) {
                    dispatch(hideLoader())
                    setSuccessExportMessage('Export file successfully!')
                    setStartAnimation(true)
                    setTimeout(() => {
                        setStartAnimation(false)
                        window.open(response.data.success)
                    }, 3000);
                }
                if (response.status == 400) {
                    dispatch(hideLoader())
                    dispatch(showAlert({ type: "error", message: "Something wrong! Failed to export file." }))
                }
            })
            .catch(err => console.log(err.statusText));
    }

    const getStatusName = (id) => statusArray.filter(item => item.id == id)[0].name

    const handleExport = async () => {
        console.log(`${getStatusName(filter.status)}Order${filter.fromDate && "_" + filter.fromDate}_${filter.toDate}`);
        const payload = {
            "fileName": `${getStatusName(filter.status)}Order${filter?.fromDate && "_" + filter.fromDate}_${filter.toDate}`
        }
        if (filter.fromDate) {
            payload.fromDate = filter.fromDate
        }
        if (filter.toDate) {
            payload.toDate = filter.toDate
        }
        if (filter.status) {
            payload.status = filter.status
        }
        callExport(payload)
    }

    const handleFilter = () => {
        if (errorMessage) return;
        !filter.toDate && setFilter({ ...filter, toDate: formatYMD(new Date()) });
        setLoading(true)
        getAllOrder(currentPage, perPage, filter).then(data => {
            setLoading(false);
            setTotalRows(data.total)
            setData(data.data)
        })
            .catch(error => {
                setLoading(false);
                dispatch(showAlert({ type: "error", message: "Something wrong!" }))
            })
    }

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, limit, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page);
        setLoading(true);
        getAllOrder(currentPage, newPerPage, filter).then(data => {
            setData(data.data)
            setTotalRows(data.total)
            setLoading(false)
        }).catch(error => console.log(error))
    };

    const checkDate = (from, to) => {
        console.log(to);
        if (new Date(from) > new Date(to)) return "Start date cannot be less than end date";
        if (new Date(from) > new Date()) return "Start date cannot be more than Today date";
        if (new Date(to) > new Date()) return "End date cannot be more than Today date";
        return "";
    }

    useEffect(() => {
        setLoading(true);
        getAllOrder(currentPage, perPage, filter).then(data => {
            setData(data.data)
            setTotalRows(data.total)
            setLoading(false)
        }).catch(error => console.log(error))
    }, [currentPage]);

    useEffect(() => {
        const message = checkDate(filter.fromDate, filter.toDate)
        setErrorMessage(message)
    }, [filter.toDate, filter.fromDate])

    const CustomLoader = () => (
        <div className='flex items-center justify-center h-96'>
            <BeatLoader
                color={'#FC5DAB'}
                loading={true}
                size={15}
            />
        </div>
    )

    return (
        <div className='md:ml-64'>
            <OrderDetailModal show={showDialog} setShow={setShowDialog} order={orderDetailProp} />
            {startAnimation && <SuccessScreen msg={successExportMessage} />}
            <div className=' bg-pink-500 pt-4 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-0 py-4 border-0">
                            <div className="font-bold text-xl uppercase">Order List</div>
                        </div>
                        <div className='flex justify-between'>
                            <FilterOrderBar
                                handleFilter={handleFilter}
                                statusArray={statusArray}
                                filter={filter}
                                setFilter={setFilter}
                            />
                            <div onClick={() => { handleExport() }}>
                                <button
                                    className='flex items-center h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export
                                </button>
                            </div>
                        </div>
                        {errorMessage && <p className='text-red-500'>*{errorMessage}</p>}
                        <div className="block rounded w-full overflow-x-auto">
                            <DataTable
                                columns={columns}
                                data={data}
                                sortServer
                                // onSort={handleSort}
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
                            />
                        </div>
                        {
                            (data.length == 0 && !loading) &&
                            <div className='my-8 text-center w-full'>No order to display</div>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
};

export default DataTableOrder;