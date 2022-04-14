import React from 'react';
import { formatMoney } from 'utils/formatNumber';
const ProductDetailModal = ({ show, setShow, product, handleEdit, setShowDialog }) => {
    console.log(product)
    // const productItems = product.items
    return (
        <>
            {
                show &&
                <div id="extralarge-modal" class="z-[9999999] bg-darkoverlay overflow-y-scroll overflow-x-hidden fixed top-10 right-0 m-auto left-0 z-50 w-full md:inset-0 h-modal md:h-full ">
                    <div class="relative p-4 w-full max-w-7xl h-full md:h-auto">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {/* Modal body */}
                            <div class="">

                                <div id="popup-modal" tabIndex="-1" class=" flex items-center justify-center tabindex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full ">
                                    <div class="relative px-4 w-full max-w-3xl h-full md:h-auto ">
                                        <div class="relative bg-white rounded-lg shadow pt-0 pb-4">
                                            <div class="flex justify-end p-2">
                                                <button onClick={() => setShow(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                            <div className="w-full p-1 sm:p-2 lg:px-10 lg:flex lg:max-w-5xl">
                                                {/* ----------PRODUCT GALLERY---------- */}
                                                <div className="lg:w-1/2">
                                                    <div class="grid-cols-3 grid gap-1 grid-rows-3">
                                                        <div class="w-full rounded">
                                                            <img src={product.gallery[0]} alt="image" />
                                                        </div>
                                                        <div class="w-full col-span-2 row-span-2 rounded">
                                                            <img src={product.gallery[1]} alt="image" />
                                                        </div>
                                                        <div class="w-full rounded">
                                                            <img src={product.gallery[2]} alt="image" />
                                                        </div>
                                                        <div class="w-full rounded">
                                                            <img src={product.gallery[3]} alt="image" />
                                                        </div>
                                                        <div class="w-full rounded">
                                                            <img src={product.gallery[4]} alt="image" />
                                                        </div>
                                                        <div class="w-full rounded">
                                                            <img src={product.gallery[1]} alt="image" />
                                                        </div>
                                                    </div>
                                                    {/* <div className="block lg:hidden max-h-[250px]">
                                                        <Carousel images={product.gallery} />
                                                    </div> */}
                                                </div>
                                                {/* ----------PRODUCT DETAIL---------- */}
                                                <div className="max-w-xl p-6 lg:max-w-5xl lg:w-1/2 flex flex-col justify-start">
                                                    <h2 className="text-base font-bold text-gray-800  md:text-2xl">{product.name}</h2>
                                                    <hr className="text-gray-800 mt-2 mb-5" />
                                                    <h2 className="text-2xl font-bold text-pink-500  md:text-3xl">{formatMoney(product.price)}</h2>
                                                    <div className='mt-5'>
                                                        <span className="font-semibold italic">Color: <i className={`fa-solid fa-square text-${product.color.name.toLowerCase()} border border-pink-400`}></i> - {product.color.name}</span>
                                                    </div>
                                                    <div className="mt-5">
                                                        <div className="font-semibold italic">Amount by size</div>

                                                        <div className="flex gap-4 flex-row mt-1">

                                                            <table className="table-fixed">
                                                                <thead>
                                                                    <tr>
                                                                        <th className='text-center w-[100px]'>Size</th>
                                                                        <th className='text-center w-[100px]'>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {product.items.map((item) => {
                                                                        return <tr key={item.id}>
                                                                            <td className='text-center'>Size {item.size}</td>
                                                                            <td className='text-center'>{item.amount}</td>
                                                                        </tr>
                                                                    })}
                                                                </tbody>
                                                            </table>

                                                        </div>


                                                    </div>
                                                </div>

                                            </div>

                                            <div className='w-full p-1 sm:p-2 lg:px-10 '>
                                                <p className='font-semibold italic'>Description: </p>
                                                <p className="mt-1 text-gray-600 text-justify">{product.description}</p>
                                            </div>
                                            <div className='w-full p-1 sm:p-2 lg:px-10 flex justify-end'>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className='px-4 py-1.5 rounded border border-blue-400 mr-2 flex items-center'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <p className='text-gray-500 ml-1'>Edit</p>
                                                </button>
                                                <button
                                                    onClick={() => setShowDialog(true)}
                                                    className='px-4 py-1.5 rounded border border-red-400 flex items-center'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <p className='text-gray-500 ml-1'>Delete</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductDetailModal;