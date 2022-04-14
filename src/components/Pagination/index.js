import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllProduct, getFilterProduct } from 'utils/callAdminAPIs';

function PaginatedItems({
    pageCount,
    handlePageClick
}) {

    return (
        <>
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div></div>
                <div className='sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center  border text-sm font-medium"
                        pageLinkClassName="page-link mx-4 my-2 px-0"
                        previousClassName="page-item inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        previousLinkClassName="page-link"
                        nextClassName="page-item ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="sm:flex-1 sm:flex sm:items-center sm:justify-end"
                        activeClassName="active z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </>
    );
}

export default PaginatedItems;