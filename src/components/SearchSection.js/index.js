import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getFilterProduct } from 'utils/callAPIs';
import { debounce } from 'lodash';
import BeatLoader from 'react-spinners/BeatLoader';
import { formatMoney } from 'utils/formatNumber';

const SearchSection = () => {
    const [keyword, setKeyword] = useState("");
    const [resultList, setResultList] = useState([])
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const getProductFilter = (value) => {
        getFilterProduct(1, {
            name: value
        }).then(data => {
            console.log(data);
            setResultList(data.data)
            setTotal(data.total)
            setLoading(false);
        }).catch(error => {
            setLoading(false)
            dispatch(showAlert({ type: "error", message: "Something wrong!" }))
        })
    }

    const debounceChangeInput = useCallback(debounce((value) => getProductFilter(value), 1000), [])

    const handleSearchInputChange = (e) => {
        if (e.target.value == "") {
            setResultList([]);
            setLoading(false)
            setOpen(false)
        } else {
            setOpen(true);
            setLoading(true)
            setKeyword(e.target.value);
            debounceChangeInput(e.target.value);
        }
    }

    return (
        <div className='relative'>
            <div className='relative mb-4 sm:mb-0 min-w-[300px] sm:w-auto w-full text-gray-500 flex items-center bg-white mr-[50px] py-1 px-3 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    onChange={handleSearchInputChange}
                    placeholder='Search'
                    className='bg-transparent border-none text-sm leading-snug w-full font-normal p-1.5 placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-0'
                />
            </div>
            {
                open &&
                <div className='absolute bg-white rounded w-[calc(100%+6px)] z-[10] max-h-[614px] overflow-y-auto mt-[11px] shadow-md'>
                    {
                        loading ?
                            <div className='flex items-center justify-center h-60'>
                                <BeatLoader
                                    color={'#FC5DAB'}
                                    loading={loading}
                                    size={15}
                                />
                            </div>
                            :
                            <>
                                <p className='mb-5 p-4'>Found {total} results for "{keyword}"</p>
                                {
                                    resultList.length > 0 && resultList.map(item =>
                                        <Link onClick={() => setOpen(false)} key={item.id} to={`/product-list/${item.id}`}>
                                            <div className='flex gap-2 my-2 hover:bg-gray-200 pl-4 py-1.5'>
                                                <img className='w-16' src={item.gallery[0]} />
                                                <div className='flex flex-wrap items-center'>
                                                    <p className='w-full'>{item.name}</p>
                                                    <p className='w-full'>{formatMoney(item.price)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </>
                    }
                </div>
            }
        </div>
    );
};

export default SearchSection;