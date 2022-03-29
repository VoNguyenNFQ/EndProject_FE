import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Carousel from 'components/Carousel/index';
import { getProductById } from 'utils/callAPIs';
import { formatMoney } from 'utils/formatNumber';
import BeatLoader from "react-spinners/BeatLoader";

const ProductDetail = () => {
  let  id  = useParams().id;
  const [product, setProduct] = useState({}); 
  const [loading, setLoading] = useState(false);
  useEffect(() => { 
    setLoading(true)
    getProductById(id).then(data => setProduct(data)).catch(error => console.log(error))
    setTimeout(() => {
        setLoading(false)
    }, 4000)
}, []) 
  
  const [quantity, setQuantity] = useState(1);
  const [chosenSize, setChosenSize] = useState();

  const plusQuantity = () => {
    let result = 0
    if(!chosenSize){
      result= quantity + 1
    }
    else{
      product.items.map(item => {
        if(item.size == chosenSize){
          if(quantity + 1 > item.amount || quantity > 50)
            result= item.amount
          else
            result= quantity + 1
        }
      })
    }

    setQuantity(result)
  }
  const minusQuantity = () => {
    const result= quantity - 1 < 1 ? 1 : quantity - 1
    setQuantity(result)
  }
  const handleOnChange =(e) => {
    if(!chosenSize){
      e.target.value < 50 ? setQuantity(e.target.value) : setQuantity(50)
    }
    else{
      product.items.map(item => {
        if(item.size == chosenSize){
          if(e.target.value > item.amount || quantity > 50)
            setQuantity( item.amount)
          else
            setQuantity(e.target.value)
        }
      })
    }
  }
  const handleChooseSize=(i) =>{
    setChosenSize(i)
    product.items.map(item => {
      if(item.size == i){
        if(quantity > item.amount){
          setQuantity(item.amount)
        }
      }
    })
  }
  const handleAddToCart = () => {
    const chosenItem = {
      "id": product.id,
      "quantity": quantity,
      "size": chosenSize
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
      product.id ? <section className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
      <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
        <div className="lg:w-1/2">
          {/* CAROUSEL */}
          <Carousel images={product.gallery}/>
        </div>

        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">{product.name}</h2>
          <hr className="text-gray-800 mt-2 mb-5" />
          <h2 className="text-2xl font-bold text-pink-500  md:text-3xl">{formatMoney(product.price)}</h2>
          <p className="mt-4 text-gray-600 ">{product.description}</p>
          <div className="mt-5">
            <div className="text-gray-600 italic">Size</div>
            <div className="flex gap-4 flex-row mt-1">
              {product.items.map((item) => (
                <div >
                  {item.amount > 0 ? 
                  <button 
                  key={item.size}
                  className={`px-3 py-2 rounded-full border-2 border-gray-100 ${item.size == chosenSize ? "bg-pink-400 text-white " : "text-gray-600 hover:text-white hover:bg-pink-400 transition-colors duration-200 transform "}`}
                    onClick={()=> handleChooseSize(item.size)}
                    >
                      {item.size}
                  </button>
                  : <button 
                  key={item.size}
                      className="bg-gray-100 text-gray-400 px-3 py-2 border-2 border-gray-100 cursor-not-allowed rounded-full"
                      >
                    {item.size}
                    </button>}
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
                className="w-12 h-10 text-center outline outline-1 outline-gray-200" onChange={(e) =>handleOnChange(e)}
              />
              <button className="px-6 py-0 " onClick={plusQuantity}>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </button>

            </div>
          </div>

          <hr className="text-gray-800 mt-5 mb-5" />

          <div className="mt-3">
            <button className="px-5 py-2 font-semibold text-white transition-colors duration-200 transform bg-pink-400 rounded-full hover:bg-pink-300"
              onClick={handleAddToCart}
            >Add to cart</button>
          </div>
        </div>
      </div>
    </section>  : <div></div>
      }

    </div>
  )
}

export default ProductDetail