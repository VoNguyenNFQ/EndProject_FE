import React from 'react';

const FilterAdminDashboard = ({ setFromDate, setToDate, handleStatistic, fromDate, toDate }) => {

    return (
       
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
                        <div className=''>
                            <div
                                className="relative flex flex-col min-w-0 break-words  mb-6 xl:mb-0 ">
                                <div className="flex-auto px-4 py-5">
                                    <div >
                                        <div class="mb-3 w-full sm:w-auto">
                                            <p className='font-semibold text-base '>From</p>
                                            <input
                                                class="form-select appearance-none h-10 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                type={"date"}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                value={fromDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div
                                className="relative flex flex-col min-w-0 break-words mb-6 xl:mb-0">
                                <div className="flex-auto px-4 py-5">
                                    <div >
                                        <div class="mb-3 w-full sm:w-auto">
                                            <p className='font-semibold text-base '>To</p>
                                            <input
                                                class="form-select appearance-none h-10 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                type={"date"}
                                                onChange={(e) => setToDate(e.target.value)}
                                                value={toDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <div
                                className="relative flex flex-col min-w-0 break-words mb-6 xl:mb-0">
                                <div className="flex-auto px-4 py-5">
                                    <div className="flex flex-wrap">
                                        <div className='mb-3 w-full'>
                                            <p className='font-semibold text-md'></p>
                                            <button onClick={handleStatistic} className='h-10 text-base uppercase sm:w-auto w-full font-normal my-0 sm:mt-6 text-white rounded px-4 py-1.5 bg-pink-400 hover:bg-pink-500'>
                                                Statisticize
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
              
    );
};

export default FilterAdminDashboard;