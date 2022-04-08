import OrderDetailModal from 'components/OrderDetailModal';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { getAllOrder, exportCSV } from 'utils/callAdminAPIs';
import { formatMoney } from 'utils/formatNumber';
const StyledHeaderCell = styled.div.attrs({
    className: "table-header-cell table-cell px-6 align-middle text-center font-bold border border-solid py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap bg-gray-200 text-gray-500 border-gray-100"
})``;

const StyledTableCell = styled.div.attrs({
    className: "table-cell border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4"
})``;

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderDetailProp, setOrderDetailProp] = useState({})
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const page = 1

    const callExport = async (payload) => {
        return await exportCSV(payload)
            .then((response) => {
                console.log(response)
                setLoading(false);
            })
            .catch(err => console.log(err.statusText));
    }

    const handleExport = () => {
        const payload = {
            "fileName": "AAAA",
        }
        callExport(payload)
    }


    useEffect(() => {
        setLoading(true)
        getAllOrder(page).then(data => {
            setLoading(false);
            setOrderList(data.data)
        })



    }, [])

    return (
        <div className='md:ml-64'>
            <OrderDetailModal show={showDialog} setShow={setShowDialog} order={orderDetailProp} />

            <div className=' bg-pink-500 pt-14 pb-[4rem] px-3 md:px-8 h-auto'></div>
            <div className='px-4 md:px-10 mx-auto w-full -m-16'>
                <div className='w-full px-4 mb-10'>
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full px-8 mb-6 shadow-lg rounded-lg bg-white">
                        <div className="mb-0 py-4 border-0">
                            <div className="font-bold text-xl">Order List</div>
                            <div onClick={() => { handleExport() }}>
                                <button>
                                    Export CSV
                                </button>
                            </div>
                        </div>
                        <div className="block rounded w-full overflow-x-auto">


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
                                (orderList.length > 0 && !loading) &&
                                <>

                                    <div className="table items-center w-full bg-transparent border-collapse">
                                        <div className='table-header-group bg-gray-500 border border-b-2'>
                                            <StyledHeaderCell>
                                                ID
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>
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
                                                Status
                                            </StyledHeaderCell>
                                            <StyledHeaderCell>
                                                Detail
                                            </StyledHeaderCell>

                                        </div>

                                        <div className='table-row-group'>
                                            {
                                                orderList.length && orderList.map(order =>
                                                    <div key={order.id} className='table-row border border-b-1 hover:bg-slate-50 border-gray-200'>

                                                        <StyledTableCell className='py-1'>
                                                            #{order.id}
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {
                                                                order.items.map((item) => {
                                                                    return <div className="flex items-center mt-2" key={item.id}>
                                                                        <div className="flex w-4/6">
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
                                                            {order.status}
                                                        </StyledTableCell>
                                                        <StyledTableCell className='flex justify-center items-center '>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="cursor-pointer h-5 w-5 text-gray-600" onClick={() => { setShowDialog(true); setOrderDetailProp(order) }}
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </StyledTableCell>

                                                    </div>

                                                )
                                            }
                                        </div>
                                    </div>

                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;