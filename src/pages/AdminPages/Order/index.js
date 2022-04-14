import OrderDetailModal from 'components/OrderDetailModal';
import React, { useEffect, useState, useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { getAllOrder, exportCSV, updateOrder } from 'utils/callAdminAPIs';
import { formatMoney } from 'utils/formatNumber';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'actions/loading';
import { showAlert } from 'actions/alert';
import FilterOrderBar from 'components/FIlterOrderBar';
import PaginatedItems from 'components/Pagination';
import SuccessScreen from 'components/SuccessScreen'
import { formatYMD } from 'utils/formatNumber';
import AlertModal from 'components/AlertModal';

const StyledHeaderCell = styled.div.attrs({
    className: "table-header-cell table-cell px-3 align-middle text-center font-bold border border-solid py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap bg-gray-200 text-gray-500 border-gray-100"
})``;

const StyledTableCell = styled.div.attrs({
    className: "table-cell border-t-0 px-3 align-middle border-l-0 border-r-0 text-md whitespace-nowrap"
})``;

const Order = () => {
    const dispatch = useDispatch();

    const [orderList, setOrderList] = useState([]);
    const [orderDetailProp, setOrderDetailProp] = useState({})
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [idOrder, setIdOrder] = useState(0);
    const [status, setStatus] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState(formatYMD(new Date()));
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [successExportMessage, setSuccessExportMessage]= useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [showAlertModal, setShowAlertModal] = useState(false);

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

    const handleExport = async () => {
        const payload = {
            "fileName": "OrderStatistics"
        }
        if(fromDate){
            payload.fromDate = fromDate
        }
        if(toDate){
            payload.toDate = toDate
        }
        callExport(payload)
    }

    const handleUpdateOrder = (id, status) => {
        setShowAlertModal(false);
        setShowStatusDropdown(false);
        dispatch(showLoader());
        updateOrder(id, { status }).then(data => {
            console.log(data);
            getAllOrder(1).then(data => {
                setOrderList(data.data)
                setTotalOrder(data.total)
                setPageCount(Math.ceil(data.total / 5));
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

    const handleFilter = () => {
        if (errorMessage) return;
        !toDate && setToDate(formatYMD(new Date()));
        setPage(1)
        setPageCount(0)
        setLoading(true)
        getAllOrder(1, status, fromDate, toDate).then(data => {
            setLoading(false);
            setTotalOrder(data.total)
            setOrderList(data.data)
            setPageCount(Math.ceil(data.total / 5));
        })
            .catch(error => {
                setLoading(false);
                dispatch(showAlert({ type: "error", message: "Something wrong!" }))
            })
    }

    const getStatus = (status) => {
        switch (status) {
            case "Pending":
                return { idNextStep: 2, color: "bg-yellow-500", nextStep: "Approve" }
            case "Approved":
                return { idNextStep: 4, color: "bg-orange-500", nextStep: "Complete" }
            case "Completed":
                return { color: "bg-green-500" }
            case "Canceled":
                return { color: "bg-red-500" }
            default:
                throw new Error("Invalid case!")
        }
    }

    const handlePageClick = (event) => {
        setLoading(true)
        const newOffset = event.selected + 1;
        setPage(newOffset);
    };

    const checkDate = (from, to) => {
        console.log(to);
        if (new Date(from) > new Date(to)) return "Start date cannot be less than end date";
        if (new Date(from) > new Date()) return "Start date cannot be less than Today date";
        if (new Date(to) > new Date()) return "End date cannot be more than Today date";
        return "";
    }

    useEffect(() => {
        getAllOrder(page, status, fromDate, toDate).then(data => {
            setOrderList(data.data)
            setTotalOrder(data.total)
            setPageCount(Math.ceil(data.total / 5));
            setLoading(false)
        }).catch(error => console.log(error))
    }, [page]);

    useEffect(() => {
        const message = checkDate(fromDate, toDate)
        setErrorMessage(message)
    }, [fromDate, toDate])

    // useEffect(() => {
    //     setLoading(true)
    //     getAllOrder(page, status, fromDate, toDate).then(data => {
    //         setLoading(false);
    //         setOrderList(data.data)
    //     })

    // }, [])

    return (
        <div className='md:ml-64'>
            <OrderDetailModal show={showDialog} setShow={setShowDialog} order={orderDetailProp} />
            {startAnimation && <SuccessScreen msg={successExportMessage}/>}
            <div className=' bg-pink-500 pt-4 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-0 py-4 border-0">
                            <div className="font-bold text-xl">Order List</div>
                            <div onClick={() => { handleExport() }}>
                            <button
                                    className='h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>
                                    Export</button>
                            </div>
                        </div>
                        <FilterOrderBar
                            handleFilter={handleFilter}
                            setStatus={setStatus}
                            setFromDate={setFromDate}
                            setToDate={setToDate}
                            fromDate={fromDate}
                            toDate={toDate}
                        />
                        {errorMessage && <p className='text-red-500'>*{errorMessage}</p>}
                        <div className="block rounded w-full overflow-x-auto">
                            <div className="table items-center w-full bg-transparent border-collapse">
                                <div className='table-header-group bg-gray-500 border border-b-2'>
                                    <StyledHeaderCell>
                                        ID
                                    </StyledHeaderCell>
                                    <StyledHeaderCell className='min-w-[445px]'>
                                        Items
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        <p>Amount</p> of Item
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        <p>Total</p> Quantity
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        <p>Total</p> Price
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        <p>Created</p> Date
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        Action
                                    </StyledHeaderCell>
                                    <StyledHeaderCell>
                                        Detail
                                    </StyledHeaderCell>

                                </div>
                                {
                                    (orderList.length > 0 && !loading) &&
                                    <div className='table-row-group'>
                                        {
                                            orderList.length > 0 && orderList.map(order =>
                                                <div key={order.id} className='table-row border border-b-1 hover:bg-slate-50 border-gray-200'>
                                                    <StyledTableCell className='py-1'>
                                                        #{order.id}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {
                                                            order.items.length > 0 && order.items.map((item) => {
                                                                return <div className="flex items-center" key={item.id}>
                                                                    <div className="flex w-4/6 p-2">
                                                                        <div className="">
                                                                            <img className="max-w-[80px]" src={item.gallery} alt="" />
                                                                        </div>
                                                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                                                            <span className="font-semibold text-md">{item.name}</span>
                                                                            <span className="text-gray-500 text-s">{item.color} | Size {item.size}</span>
                                                                            <span className="font-semibold text-md -mt-1">x {item.amount}</span>
                                                                            <span className="font-semibold text-md ">{formatMoney(item.unitPrice)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell className='text-center'>
                                                        {order.items.length}
                                                    </StyledTableCell>
                                                    <StyledTableCell className='text-center'>
                                                        {order.amount} {order.amount > 1 ? "items" : "item"}
                                                    </StyledTableCell>
                                                    <StyledTableCell className='text-center text-pink-500 font-semibold'>
                                                        {formatMoney(order.totalPrice)}
                                                    </StyledTableCell>
                                                    <StyledTableCell className='text-center'>
                                                        {order.createAt}
                                                    </StyledTableCell>
                                                    <StyledTableCell className='text-center'>
                                                        <div class="relative inline-block text-left">
                                                            <div>
                                                                <button onClick={() => { setShowStatusDropdown(!showStatusDropdown); setIdOrder(order.id) }} type="button" class={`inline-flex justify-center min-w-full px-2 py-1 rounded-full ${getStatus(order.status).color} mx-1`} id="menu-button" >
                                                                    {order.status}
                                                                </button>
                                                            </div>
                                                            {
                                                                (showStatusDropdown && idOrder == order.id && order.status != "Canceled" && order.status != "Completed") &&
                                                                <div class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                                                    <div class="py-1" role="none">
                                                                        <button
                                                                            onClick={() => handleUpdateOrder(order.id, getStatus(order.status).idNextStep)}
                                                                            class={`text-gray-700 block px-4 py-2 text-sm`}
                                                                            id="status-1">
                                                                            {getStatus(order.status).nextStep}
                                                                        </button>
                                                                        <button
                                                                            // onClick={() => handleUpdateOrder(order.id, 3)}
                                                                            onClick={() => {
                                                                                setIdOrder(order.id)
                                                                                setShowAlertModal(true);
                                                                                // handleUpdateOrder(order.id, 3)
                                                                            }}
                                                                            class="text-gray-700 block px-4 py-2 text-sm"
                                                                            id="status-2">
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {showAlertModal &&
                                                                <AlertModal setShow={setShowAlertModal} handleAction={() => handleUpdateOrder(idOrder, 3)} message={"Are you sure you want to cancel this order?"} />
                                                            }

                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell className='flex justify-center items-center '>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="cursor-pointer h-5 w-5 text-gray-600" onClick={() => { setShowDialog(true); setOrderDetailProp(order) }}
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </StyledTableCell>

                                                </div>

                                            )
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            (orderList.length == 0 && !loading) &&
                            <div className='my-8 text-center w-full'>No order to display</div>
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
                        {orderList.length > 0 && pageCount != 0 &&
                            <PaginatedItems
                                pageCount={pageCount}
                                handlePageClick={handlePageClick}
                            />
                        }
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Order;