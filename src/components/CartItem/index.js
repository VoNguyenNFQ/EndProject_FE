import React from 'react'
import { formatMoney } from 'utils/formatNumber'
const CartItem = ({item,test}) => {
  return (        
        <div className="flex items-center -mx-8 px-6 py-5">
              <div className="flex w-3/6">
                <div className="w-20">
                  <img className="w-90" src="https://www.vascara.com/uploads/cms_productmedia/2022/February/25/giay-sandal-satin-got-nhu-geometric-sdn-0704-mau-xanh-navy-main__63113__1645769894-medium@2x.jpg" alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-semibold text-md">{item.name}</span>
                  <span className="text-gray-500 text-s">{item.color} | Size {item.size}</span>
                  <span 
                  className="font-semibold hover:text-red-500 text-red-500 text-xs cursor-pointer"
                  onClick={()=>test(item.id)}
                  >
                  Remove</span>
                </div>
              </div>
              {/* quantity input  */}
              <div className="flex justify-center w-2/6 lg:w-1/6 rounded-full border-2 border-gray-100">

                    <button className="px-1 md:px-2 py-0 " >
                      <svg className="fill-current text-gray-600 w-3 mr-2" viewBox="0 0 448 512">
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      value={item.amount}
                      className="w-8 md:w-10 lg:w-12 h-7 lg:h-10 text-center outline outline-1 outline-gray-200" 
                    />
                    <button className="px-1 md:px-2 py-0 " >
                      <svg className="fill-current text-gray-600 w-3 ml-2" viewBox="0 0 448 512">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>

                  </div>
              <span className="text-center w-1/6 font-semibold text-md hidden md:block">{formatMoney(item.unitPrice)}</span>
              <span className="text-center w-1/6 font-semibold text-md">{formatMoney(item.price)}</span>
            </div>
  )
}

export default CartItem