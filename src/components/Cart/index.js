import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getCartItem, deleteCartItem, updateCart } from 'utils/callAPIs'
import { formatMoney } from 'utils/formatNumber'
import cart from "assets/images/cart.png"
import BeatLoader from "react-spinners/BeatLoader"

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("tokenUser")
  const [checkToken, setCheckToken] = useState(token ? token : "")
  const [listItems, setListItems] = useState([])
  const [countTotalQuantity, setCountTotalQuantity] = useState(0)
  const [totalCost, setTotalCost] = useState()
  useEffect(async () => {
    if (token) {
      setCheckToken(token);
    }
    setLoading(true)

    const getDATA = async () => {
      return await getCartItem()
        .then((response) => {
          setListItems(response)
          setLoading(false);
        })
        .catch(err => console.log(err.statusText));
    }

    getDATA()
    if (listItems.length > 0) {
      putCartToLocalStorage(listItems)
      localStorage.setItem("countCart", listItems.length)
     
    }


  }, [])
  const putCartToLocalStorage = (arr) => {
    localStorage.setItem("cartItems", JSON.stringify(arr))
  }

  const minusQuantity = (id, amount, unitPrice) => {
    const resultAmount = amount - 1 < 1 ? 1 : amount - 1
    const payload = {
      "amount": resultAmount,
      "price": unitPrice
    }
    updateCart(payload, id)
    const newList = listItems.map((item) => {
      const newItem = { ...item, amount: resultAmount }
      return item.id === id ? { ...newItem } : item;
    })
    setListItems(newList)
    putCartToLocalStorage(newList)
    
  }


  const plusQuantity = (id, amount, unitPrice, totalAmount) => {
    const resultAmount = amount + 1 > totalAmount ? totalAmount : amount + 1
    const payload = {
      "amount": resultAmount > 50 ? 50 : resultAmount,
      "price": unitPrice
    }
    updateCart(payload, id)
    const newList = listItems.map((item) => {
      const newItem = { ...item, amount: resultAmount }
      return item.id === id ? { ...newItem } : item;
    })
    setListItems(newList)
    putCartToLocalStorage(newList)
    
  }

  const handleDeleteItem = (id) => {
    //callapi delete
    deleteCartItem(id)
    const newList = listItems.filter((item) => {
      return item.id != id
    })
    setListItems(newList)
    putCartToLocalStorage(newList)
    
    localStorage.setItem("countCart", newList.length)
    
  }
  const handleOnChange = (e, id, unitPrice, totalAmount) => {
    const resultAmount = e.target.value > totalAmount ? totalAmount : e.target.value
    const payload = {
      "amount": resultAmount > 50 ? 50 : resultAmount,
      "price": unitPrice
    }
    updateCart(payload, id)
    const newList = listItems.map((item) => {
      const newItem = { ...item, amount: resultAmount }
      return item.id === id ? { ...newItem } : item;
    })
    setListItems(newList)
    putCartToLocalStorage(newList)

  }
  return (

    checkToken ?
      <div>
        <div className="mx-40 mt-8">
          <div className="lg:flex lg:shadow-lg lg:rounded-lg my-10">
            {/*------------------------------------ CART -------------------- */}
            <div className="lg:w-3/4 w-full bg-white p-1 sm:p-2 lg:p-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-bold text-2xl">Shopping Cart</h1>
                {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
              </div>
              {
                loading ?
                  <div className='flex items-center justify-center h-96'>
                    <BeatLoader
                      color={'#FC5DAB'}
                      loading={loading}
                      size={15} />
                  </div>
                  :
                  (
                    listItems.length == 0 ?
                      <div className="flex justify-center flex-col items-center p-10">
                        <div>
                          <img src={cart} alt="empty-cart" />
                          {/* EMPTY */}
                        </div>
                        <div className="mt-10 text-gray-600 font-semibold text-xl">Your cart is empty!</div>
                      </div>
                      :
                      <div>
                        <div className="flex mt-10 mb-5">
                          <h3 className="font-semibold text-gray-600 text-s md:text-md uppercase w-3/6">Product Details</h3>
                          <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-2/6 lg:w-1/6 text-center">Quantity</h3>
                          <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-1/6 text-center hidden md:block">Price</h3>
                          <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-1/6 text-center">Total</h3>
                        </div>
                        {
                          listItems.map((item) => {
                            return <div className="flex items-center -mx-8 px-6 py-5 hover:bg-slate-50" key={item.id}>
                              <div className="flex w-3/6">
                                <div className="w-20">
                                  <img className="w-90" src={item.gallery} alt="" />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                  <span className="font-semibold text-md">{item.name}</span>
                                  <span className="text-gray-500 text-s">{item.color} | Size {item.size}</span>
                                  <span
                                    className="font-semibold hover:text-red-500 text-red-500 text-xs cursor-pointer"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    Remove</span>
                                </div>
                              </div>
                              {/* quantity input  */}
                              <div className="flex flex-col justify-start w-2/6 lg:w-1/6 ">
                                <div className='flex flex-row rounded-full border-2 border-gray-100 bg-white'>
                                  <button className="px-1 md:px-2 py-0" onClick={() => minusQuantity(item.id, item.amount, item.unitPrice)}>
                                    <svg className="fill-current text-gray-600 w-3 mr-2" viewBox="0 0 448 512">
                                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    value={item.amount}
                                    onChange={(e) => handleOnChange(e, item.id, item.unitPrice, item.totalAmount)}
                                    className="w-8 md:w-10 lg:w-12 h-7 lg:h-10 text-center outline outline-1 outline-gray-200"
                                  />
                                  <button className="px-1 md:px-2 py-0 " onClick={() => plusQuantity(item.id, item.amount, item.unitPrice, item.totalAmount)}>
                                    <svg className="fill-current text-gray-600 w-3 ml-2" viewBox="0 0 448 512">
                                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                  </button>
                                </div>
                                <div>
                                  {item.totalAmount - item.amount <= 5 && item.totalAmount - item.amount > 0 ?
                                    <p className="font-semibold text-red-500  text-xs w-full">
                                      {item.totalAmount - item.amount} left available products
                                    </p>
                                    : <p className='className="font-semibold text-white text-xs w-full'> .</p>}

                                </div>
                              </div>
                              <span className="text-center w-1/6 font-semibold text-md hidden md:block -mt-1">{formatMoney(item.unitPrice)}</span>
                              <span className="text-center w-1/6 font-semibold text-md -mt-1">{formatMoney(item.unitPrice * item.amount)}</span>
                            </div>
                          })
                        }
                      </div>
                  )
              }

              <Link exact="true" to="/product-list" className="flex font-semibold text-pink-500 hover:text-pink-400 text-md mt-5">
                <svg className="fill-current mr-2 text-pink-500 hover:text-pink-400 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>

            </div>
            {/*---------------------------------- SUMMARY -------------------------------------------------------*/}
            <div id="summary" className="lg:w-1/4 w-full px-8 py-10">
              <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-gray-600 text-md uppercase">Items</span>
                <span className="font-semibold text-md">{listItems.length}</span>
              </div>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-gray-600 text-md uppercase">Total quantity</span>
                <span className="font-semibold text-md">{listItems.reduce((a,c)=> a + c.amount,0)}</span>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-bold justify-between py-6 text-md text-pink-500 uppercase">
                  <span>Total cost</span>
                  <span className="">{formatMoney(listItems.reduce((a,c)=> a + c.unitPrice*c.amount,0))}</span>
                </div>
                <Link exact="true" to="/check-out">
                  <button className="bg-pink-400 font-semibold hover:bg-pink-300 py-3 text-sm text-white uppercase w-full">
                    Check out
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div> : <Navigate to='/sign-in' replace />
  )


}

export default Cart