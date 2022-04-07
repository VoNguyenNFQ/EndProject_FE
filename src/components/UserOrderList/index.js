import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader"
import { formatMoney } from 'utils/formatNumber'
import { getAllOrder } from 'utils/callAPIs'
const UserOrderList = () => {
  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([
    //{
  //   "id": 1,
  //   "recipientName": "Customer",
  //   "recipientPhone": "0123456789",
  //   "addressDelivery": "dia chi",
  //   "status": "Pending",
  //   "amount": 10,
  //   "totalPrice": "520",
  //   "item": [
  //     {
  //       "id": 1,
  //       "name": "High heel shoe every leather",
  //       "color": "Black",
  //       "gallery": "https://www.vascara.com/uploads/cms_productmedia/2021/July/14/gia-y-bi-t-mu-i-nho-n-nubuck-got-dinh-metallic-bmn-0486-mau-do-dam-main__60556__1626252027.jpg",
  //       "size": 35,
  //       "amount": 3,
  //       "unitPrice": "20",
  //       "price": "450"
  //     },
  //     {
  //       "id": 1,
  //       "name": "High heel shoe every leather",
  //       "color": "Red",
  //       "gallery": "https://www.vascara.com/uploads/cms_productmedia/2021/July/14/gia-y-bi-t-mu-i-nho-n-nubuck-got-dinh-metallic-bmn-0486-mau-do-dam-main__60556__1626252027.jpg",
  //       "size": 36,
  //       "amount": 3,
  //       "unitPrice": "20",
  //       "price": "40"
  //     }
  //   ]
  // },
  // {
  //   "id": 2,
  //   "recipientName": "Customer",
  //   "recipientPhone": "0123456789",
  //   "addressDelivery": "dia chi",
  //   "status": "Pending",
  //   "amount": 10,
  //   "totalPrice": "520",
  //   "item": [
  //     {
  //       "id": 1,
  //       "name": "High heel shoe every leather",
  //       "color": "Black",
  //       "gallery": "https://www.vascara.com/uploads/cms_productmedia/2021/July/14/gia-y-bi-t-mu-i-nho-n-nubuck-got-dinh-metallic-bmn-0486-mau-do-dam-main__60556__1626252027.jpg",
  //       "size": 35,
  //       "amount": 3,
  //       "unitPrice": "20",
  //       "price": "450"
  //     }
  //   ]
  // }
  ])

  useEffect(async () => {

    setLoading(true)

    const getDATA = async () => {
      return await getAllOrder()
        .then((response) => {
          setListOrders(response)
          setLoading(false);
        })
        .catch(err => console.log(err.statusText));
    }

    getDATA()

  }, [])

  if (localStorage.getItem("tokenUser")) {
    return (
      <div>
        <div className="mx-40 mt-8">
          <div className="lg:flex lg:shadow-lg lg:rounded-lg my-5 bg-slate-50">
            <div className="w-full p-1 sm:p-2 lg:p-10 ">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-bold text-2xl">Your order</h1>
                <p className="font-semibold text-xl">{listOrders.length} orders</p>
              </div>
              {/*  order */}
              {
                listOrders.map((order) => {
                  return <Link exact="true" to={`/order-list/${order.id}`}
                  className="flex items-center flex-col -mx-3 px-6 py-5 bg-white mb-5" 
                  key={order.id}
                  
                  >

                    <div className="flex font-bold w-full justify-between py-6 text-base text-pink-500 ">
                        <div className='w-1/6 flex justify-center '>Code: #{order.id}</div>
                        
                        <div className='flex justify-center items-center' >
                          <span className=' text-center text-gray-400'>Status:</span>
                          <span className="uppercase ml-1 tetx-center"> {order.status}</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full border-b-2 border-gray-200">

                      {/* ITEM in Order */}
                      {order.item.map((element) => {
                        return <div className="flex items-center -mx-8 px-6 pb-5" key={element.id}>
                          <div className="flex w-full">
                            <div className="w-1/6 flex justify-center">
                              <img className="w-20" src={element.gallery} alt="" />
                            </div>
                            <div className="flex flex-col justify-start w-3/6 flex-grow">
                              <span className="font-semibold text-lg">{element.name}</span>
                              <span className="text-gray-500 text-s">{element.color} | Size {element.size}</span>
                            </div>
                            <span className="font-semibold  text-md w-1/6">{formatMoney(element.unitPrice)}</span>

                            <span className="text-center w-1/6 font-semibold text-md">x {element.amount}</span>

                          </div>

                        </div>
                      })}
                      {/* ITEM in Order */}
                      
                    </div>

                    <div className="flex font-bold w-full justify-end py-6 text-base text-pink-500 uppercase">
                        <div className='w-4/6'></div>
                        <div className='w-1/6 flex justify-start'>
                          <span>Total cost</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                          <span className="text-xl">{formatMoney(order.totalPrice)}</span>
                        </div>
                    </div>
                  </Link>
                })
              }


              {/*  order */}

              <Link exact="true" to="/product-list" className="flex font-semibold text-pink-500 hover:text-pink-400 text-md mt-5">
                <svg className="fill-current mr-2 text-pink-500 hover:text-pink-400 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>

            </div>

          </div>
        </div>
      </div>
    )
  }
  else {
    return <Navigate to="/sign-in" replace />
  }
}

export default UserOrderList                                                                                                                                                                                                                                                                                                                                                                                                                                                                            