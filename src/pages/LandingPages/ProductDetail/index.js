import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
// import Carousel from 'components/Carousel/index';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Carousel}  from 'react-responsive-carousel';
import { getProductById } from 'utils/callAPIs';
import { formatMoney } from 'utils/formatNumber';
import { countCartItem, addToCart } from 'utils/callAPIs';
import BeatLoader from "react-spinners/BeatLoader";
import Alert from 'components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setBadgeCart } from 'actions/badgeCart';
const ProductDetail = () => {
  let id = useParams().id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [maxAmount, setMaxAmount] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const badgeCart = useSelector(state => state.badgeCart)

  useEffect(() => {
    setLoading(true)
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    }).catch(error => console.log(error))
  }, [id])

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
        setMaxAmount(item.amount - item.amountInCart) //tong ton kho
      }
    })
  }
  const handleChooseSize = (id) => {
    product.items.map(item => {
      if (item.id == id) {
        setMaxAmount(item.amount - item.amountInCart) //ton kho
        setQuantity(quantity > item.amount - item.amountInCart ? item.amount - item.amountInCart : quantity)
      }
    })
    setChosenSize(id)

  }
  const plusQuantity = () => {
    let result = 0
    if (!chosenSize) {
      result = quantity + 1 > 50 ? 50 : quantity + 1
      if (result == 50) {
        showAlert(true, "error", "This is max amount of product to add cart!", "-top-10 -right-5 md:-right-2/4")
      }
    }
    else {
      result = quantity + 1 > maxAmount || quantity + 1 > 50 ? maxAmount : quantity + 1
      if (quantity + 1 > maxAmount) {
        showAlert(true, "error", "This is max amount of product to add cart!", "-top-10 -right-5 md:-right-2/4")
      }
    }
    setQuantity(result)
  }

  const minusQuantity = () => {
    const result = quantity - 1 <= 0 ? 0 : quantity - 1

    setQuantity(result)
  }

  const handleOnChange = (e) => {
    if(Number.isInteger(e)){
      const inputValue = Number(e)
    console.log(inputValue)
    if (!chosenSize) {
      inputValue < 50 && inputValue > 0 ? setQuantity(inputValue) : setQuantity(50)
    }
    else {
      setQuantity(inputValue > maxAmount || inputValue > 50 ? maxAmount : inputValue)
      if (inputValue > maxAmount)
        showAlert(true, "error", "This is max amount of product to add cart!", "-top-10 -right-5 md:-right-2/4")
    }
    }
    else{
      showAlert(true, "error", "Invalid number!", "-top-10 -right-5 md:-right-2/4")

    }
  }


  const handleAddToCart = () => {

    if (localStorage.getItem('tokenUser')) {
      if (chosenSize) {
        const chosenItem = {
          "productItem": chosenSize,
          "amount": quantity,
          "price": product.price
        }
        setLoadingAddCart(true);
        //call api add to cart
        addToCart(chosenItem).then(response => {
          if (response.status == 201) {
            setLoadingAddCart(false);
            getCountCart()
            showAlert(true, "success", "Product is added to cart", "-top-10 -right-5 md:-right-2/4")
            // const newProductItems = product.items.map((item) => {
            //   const newItem = { ...item, amountInCart: item.amountInCart + chosenItem.amount }
            //   return item.id == id ? { ...newItem } : item;
            // })
            // setProduct({ ...product, items: newProductItems })
            getMaxAmount(chosenSize)
            product.items.map((item) => {
              if (item.id == chosenSize) {
                dispatch(setBadgeCart(item.amountInCart == 0 ? badgeCart.quantity + 1 : badgeCart.quantity))
              }
            })

          }

          else {
            showAlert(true, "error", "Fail to add product to cart!", "-top-10 -right-5 md:-right-2/4")
          }
        })

      }
      else {
        showAlert(true, "error", "Please choose product size!", "-top-10 -right-5 md:-right-2/4")
      }
    }
    else {
      navigate('/sign-in')
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

              <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg p-8">
                <div className="lg:w-1/2">
                  {/* CAROUSEL */}

                  <div className='z-[1]'>
                    {/* <ReactSlickExample images={product.gallery}/>  */}
                    {/* <Carousel images={product.gallery} className="z-0" /> */}
                    
                    <Carousel>
                      
                          {product.gallery.map((path) => {
                          return <img src={path} alt='product image'  />
                          }
                          )}
                     
                    </Carousel>
                  </div>
                </div>

                <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2 ">
                  <div className="fluid__instructions flex relative -top-[80px] z-[9]">
                    <div id="portal" className="portal" />

                  </div>
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
                                onClick={() => { handleChooseSize(item.id); getMaxAmount(item.id) }}
                              >
                                {item.size}
                              </button></div>
                            : <div><button
                              key={item.id}
                              className="bg-gray-100 text-gray-400 px-3 py-2 border-2 border-gray-100 cursor-not-allowed rounded-full"
                            >
                              {item.size}
                            </button></div>}
                          {/* {item.id == chosenSize &&
                          <div className="absolute text-gray-500 mt-2 ml-2">{item.amount -item.amountInCart} product is available</div>}
                           */}
                        </div>

                      ))}
                    </div>


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
                        className="w-12 h-10 text-center outline outline-1 outline-gray-200" onChange={(e) => setQuantity(e.target.value)} onBlur={()=>handleOnChange(quantity)}
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
                        (quantity <= 0 ?
                          <button
                            className="w-1/3 px-5 py-2 font-semibold text-white transition-colors duration-200 transform bg-gray-400 cursor-not-allowed rounded-full hover:bg-pink-300"
                          >
                            Add to cart
                          </button>
                          :
                          <button
                            className="w-1/3 px-5 py-2 font-semibold text-white transition-colors duration-200 transform bg-pink-400 rounded-full hover:bg-pink-300"
                            onClick={handleAddToCart}>
                            Add to cart
                          </button>)}

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