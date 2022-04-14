import React from 'react'

const UserDashboard = ({ listOrders }) => {
    const countOrderByStatus=(status) =>{
        let i =0
        listOrders.map((order)=>{
            if(order.status== status){
                i= i +1
            }
        })
        return i

    }
     const countApproved = countOrderByStatus('Approved')
     const countDelivery = countOrderByStatus ('Delivery')
     const countCompleted = countOrderByStatus ('Completed')
     const countCanceled = countOrderByStatus ('Canceled')
    
    return (
        <div >
            <div className='flex xl:flex-row flex-col justify-center gap-5 mb-5'>
                {/* APPROVED */}
                <div class="pl-1 max-w-96 xl:w-96 h-20 bg-gray-400 rounded-lg shadow-md">
                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div class="my-auto">
                            <p class="font-bold">APPROVED</p>
                            <p class="text-base">{countApproved} {countApproved > 1 ? 'orders' : 'order'}</p>
                        </div>
                        
                    </div>
                </div>
                {/* Delivery */}
                <div class="pl-1 max-w-96 xl:w-96 h-20 bg-pink-400 rounded-lg shadow-md">
                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div class="my-auto">
                            <p class="font-bold">DELIVERY</p>
                            <p class="text-base">{countDelivery} {countDelivery > 1 ? 'orders' : 'order'}</p>
                        </div>
                        
                    </div>
                </div>
                {/* Completed */}
                <div class="pl-1 max-w-96 xl:w-96 h-20 bg-green-400 rounded-lg shadow-md">
                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div class="my-auto">
                            <p class="font-bold">COMPLETED</p>
                            <p class="text-base">{countCompleted} {countCompleted > 1 ? 'orders' : 'order'}</p>
                        </div>
                        
                    </div>
                </div>
                {/* Canceled */}
                <div class="pl-1 max-w-96 xl:w-96 h-20 bg-red-400 rounded-lg shadow-md">
                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div class="my-auto">
                            <p class="font-bold">CANCELED</p>
                            <p class="text-BASE">{countCanceled} {countCanceled > 1 ? 'orders' : 'order'}</p>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDashboard