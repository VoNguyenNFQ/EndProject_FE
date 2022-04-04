import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from 'components/CartItem'
import { deleteCartItem } from 'utils/callAPIs'
const Cart = () => {
  const [listItems, setListItems] = useState([
    {
      "id": 1,
      "name": "SNEAKER DA NUBUCK",
      "color": "Pink",
      "size": "39",
      "amount": 2,
      "price": "72",
      "unitPrice": "36",
      "gallery": [
        "https://www.vascara.com/uploads/cms_productmedia/2021/December/31/giay-cao-got-bit-mui-nhon-quyen-ru-bmn-0534-mau-do-dam-main__62063__1640922382-medium@2x.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg"
      ]
    },
    {
      "id": 2,
      "name": "SNEAKER DA NUBUCK",
      "color": "Pink",
      "size": "39",
      "amount": 2,
      "price": "72",
      "unitPrice": "36",
      "gallery": [
        "https://www.vascara.com/uploads/cms_productmedia/2021/December/31/giay-cao-got-bit-mui-nhon-quyen-ru-bmn-0534-mau-do-dam-main__62063__1640922382-medium@2x.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg"
      ]
    },
    {
      "id": 3,
      "name": "SNEAKER DA NUBUCK",
      "color": "Pink",
      "size": "39",
      "amount": 2,
      "price": "72",
      "unitPrice": "36",
      "gallery": [
        "https://www.vascara.com/uploads/cms_productmedia/2021/December/31/giay-cao-got-bit-mui-nhon-quyen-ru-bmn-0534-mau-den-main__62078__1640923902-medium@2x.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg",
        "notCover.jpg"
      ]
    }
  ])
  const handleDeleteItem = (id) => {
    //callapi delete
    // deleteCartItem(id)
    const newList = listItems.filter((item) => {
      return item.id != id
    })
    setListItems(newList)
    console.log("Item deleted" + id)
  }
  return (

    <div>
      <div className="mx-40 mt-8">
        <div className="lg:flex lg:shadow-lg lg:rounded-lg my-10">
          {/*------------------------------------ CART -------------------- */}
          <div className="lg:w-3/4 w-full bg-white p-1 sm:p-2 lg:p-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold text-2xl">Shopping Cart</h1>
              {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-s md:text-md uppercase w-3/6">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-2/6 lg:w-1/6 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-1/6 text-center hidden md:block">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-s md:text-md uppercase w-1/6 text-center">Total</h3>
            </div>

            {/* ---------------------------------- CART ITEM --------------------------- */}
            {listItems.map((item) =>
              <CartItem
                key={item.id}
                item={item}
                test={handleDeleteItem}/>)
              }
            {/* ---------------------------------- CART ITEM --------------------------- */}

            <Link exact="true" to="/product-list" className="flex font-semibold text-gray-500 hover:text-gray-400 text-md mt-5">
              <svg className="fill-current mr-2 text-gray-500 hover:text-gray-400 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </Link>

          </div>
          {/*---------------------------------- SUMMARY -------------------------------------------------------*/}
          <div id="summary" className="lg:w-1/4 w-full px-8 py-10">
            <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-gray-600 text-md uppercase">Items</span>
              <span className="font-semibold text-md">3</span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-md text-pink-500 uppercase">
                <span>Total cost</span>
                <span className="">$600</span>
              </div>
              <button className="bg-pink-400 font-semibold hover:bg-pink-300 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart