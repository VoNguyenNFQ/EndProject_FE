import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Carousel from 'components/Carousel/index';
import { getProductById } from 'utils/callAPIs';
import { formatMoney } from 'utils/formatNumber';
import { countCartItem, addToCart } from 'utils/callAPIs';
import BeatLoader from "react-spinners/BeatLoader";
import Alert from 'components/Alert';
const ProductDetail = () => {
  let id = useParams().id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [maxAmount, setMaxAmount]= useState()
  const navigate = useNavigate();



  useEffect(() => {
    setLoading(true)
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    }).catch(error => console.log(error))
    
  }, [])

  const [quantity, setQuantity] = useState(1);
  const [chosenSize, setChosenSize] = useState(); //product.items.id
  const [loadingAddCart, setLoadingAddCart] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "", style: "" });
  const showAlert = (show = false, type = "", msg = "", style = "") => {
    setAlert({ show, type, msg, style })
    setTimeout(() => {
      setAlert(false, "", "", "")
    }, 3000);
  }
  const getCountCart = async () => {
    await countCartItem()
     .then((response) => {
       localStorage.setItem("countCart", response.count)
     })
     .catch(err => console.log(err.statusText));
 }
 const getMaxAmount = (id) => {
  product.items.map(item => {
    if (item.id == id) {
      setMaxAmount(item.amount-item.amountInCart) //tong ton kho
    }
  })
}
const handleChooseSize = (id) => {
  setChosenSize(id)
  getMaxAmount(chosenSize)
  setQuantity(quantity > maxAmount ? maxAmount : quantity)
}
  const plusQuantity = () => {
     let result = 0
     if (!chosenSize) {
      result= quantity +1 > 50 ? 50 : quantity + 1
     }
     else {
        result= quantity +1 > maxAmount || quantity +1 >50 ? maxAmount : quantity +1
     }
     setQuantity(result)
  }

  const minusQuantity = () => {
    const result = quantity - 1 < 1 ? 1 : quantity - 1
    setQuantity(result)
  }

  const handleOnChange = (e) => {
     if (!chosenSize) {
       e.target.value < 50 ? setQuantity(e.target.value) : setQuantity(50)
     }
      else 
      setQuantity( e.target.value > maxAmount || e.target.value >50 ? maxAmount : e.target.value)

  }


  const handleAddToCart = () => {
    
      if (chosenSize) {
        const chosenItem = {
          "productItem" : chosenSize,
          "amount" : quantity,
          "price" : product.price
        }
        addToCart(chosenItem) //call api add to cart
        setLoadingAddCart(true);
        showAlert(true, "success", "Product is added to cart", "top-10 -right-5 md:-right-2/4")
        //call api
        const timeout = setTimeout(() => {
          setLoadingAddCart(false);
          getCountCart()
        }, 3000);
        return () => clearTimeout(timeout)
      }
      else {
        showAlert(true, "error", "Please choose product size!", "top-10 -right-5 md:-right-2/4")
      }
    
  }

  return (
    <div>
      {
        loading ?
          <div className='flex items-center justify-center h-96'>
            <BeatLoader
              color={'#FC5DAB'}
              loading={loading}
              size={15} /> </div>
          :
          product.id &&
          <div>

            <section className="bg-gray-100 lg:py-12 lg:flex lg:justify-center z-0">

              <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="lg:w-1/2">
                  {/* CAROUSEL */}
                  <Carousel images={product.gallery} className="z-0" />
                </div>

                <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">{product.name}</h2>
                  <hr className="text-gray-800 mt-2 mb-5" />
                  <h2 className="text-2xl font-bold text-pink-500  md:text-3xl">{formatMoney(product.price)}</h2>
                  <p className="mt-4 text-gray-600 ">{product.description}</p>
                  <div className="mt-5">
                    <span className="mt-4 font-semibold text-pink-500 ">{product.color}</span>
                  </div>
                  <div className="mt-5">
                    <div className="text-gray-600 italic">Size</div>
                    <div className="flex gap-4 flex-row mt-1">
                      {product.items.map((item, index) => (
                         <div key={index}>
                          {item.amount > 0 ?
                          <div>
                            <button
                              key={item.id}
                              className={`px-3 py-2 rounded-full border-2 border-gray-100 ${item.id == chosenSize ? "bg-pink-400 text-white " : "text-gray-600 hover:text-white hover:bg-pink-400 transition-colors duration-200 transform "}`}
                              onClick={() => {handleChooseSize(item.id); getMaxAmount(item.id)}}
                            >
                              {item.size}
                            </button></div>
                            : <div><button
                              key={item.id}
                              className="bg-gray-100 text-gray-400 px-3 py-2 border-2 border-gray-100 cursor-not-allowed rounded-full"
                            >
                              {item.size}
                            </button></div>}
                            
                        </div>
                      ))}
                    </div>
                    {chosenSize ? 
                    <div className="text-gray-500 mt-2 ml-2">{maxAmount} product is available</div>
                    : <></>} 

                  </div>
                  <div className="mt-5">
                    <div className="text-gray-600 italic">Amount</div>
                    <div className="flex justify-center lg:w-2/5 md:w-2/5 sm:w-2/5 w-2/5 mt-3 rounded-full border-2 border-gray-100">

                      <button className="px-6 py-0 " onClick={minusQuantity}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        className="w-12 h-10 text-center outline outline-1 outline-gray-200" onChange={(e) => handleOnChange(e)}
                      />
                      <button className="px-6 py-0 " onClick={plusQuantity}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                    </div>
                  </div>
                  {alert.show && <Alert {...alert} />}
                  <hr className="text-gray-800 mt-5 mb-5" />
                  <div className="mt-3">
                    {
                      loadingAddCart ?
                        <button type="button" className="w-1/3 px-5 py-2 font-semibold text-white flex justify-center transition-colors duration-200 transform bg-pink-400 rounded-full hover:bg-pink-300 cursor-not-allowed">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </button>
                        :
                        <button
                          className="w-1/3 px-5 py-2 font-semibold text-white transition-colors duration-200 transform bg-pink-400 rounded-full hover:bg-pink-300"
                          onClick={handleAddToCart}>
                          Add to cart
                        </button>}

                  </div>
                  
                </div>
              </div>
            </section>

          </div>
      }

    </div>
  )
}

export default ProductDetail