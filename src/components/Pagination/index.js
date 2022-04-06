import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllProduct } from 'utils/callAdminAPIs';

function PaginatedItems({ total, setProductList, itemsPerPage, setLoading, page, setPage }) {
    const [pageCount, setPageCount] = useState(0);
    // const [page, setPage] = useState(1);

    useEffect(() => {
        setPageCount(Math.ceil(total / itemsPerPage));
        getAllProduct(page).then(data => {
            setProductList(data.data)
            setLoading(false)
        }).catch(error => console.log(error))
    }, [page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setLoading(true)
        const newOffset = event.selected + 1;
        setPage(newOffset);
    };

    return (
        <>
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div></div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        pageLinkClassName="page-link"
                        previousClassName="page-item inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        previousLinkClassName="page-link"
                        nextClassName="page-item ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                        activeClassName="active z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </>
    );
}

export default PaginatedItems;