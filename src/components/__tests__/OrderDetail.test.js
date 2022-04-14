import { getOrderDetail } from "utils/callAPIs"; 

jest.mock('utils/callAPIs', () => ({ 
    getOrderDetail: jest.fn() 
})) 
 
describe("Unit Component Order Detail", () => { 
 
    let container; 
 
    beforeEach(() => { 
        container = document.createElement('div') 
        document.body.appendChild(container) 
    }) 
 
    afterEach(() => { 
        document.body.removeChild(container) 
        container = null
    }) 
 
 
 
    it("Unit Test Call API Get order Detail ", async () => { 
 
        const order = {
            "id": 44,
            "createAt": "11-04-2022",
            "recipientName": "Lan Anh",
            "recipientEmail": "votinhthanh.dev@gmail.com",
            "recipientPhone": "0123456789",
            "addressDelivery": "225 dia chi",
            "status": "Pending",
            "amount": 1,
            "shippingCost": 10,
            "totalPrice": "30",
            "items": [
                {
                    "id": 45,
                    "name": "NEW SLIP-ON SANDALS SHOE",
                    "color": "Navy",
                    "size": "36",
                    "amount": 1,
                    "unitPrice": "20",
                    "price": "20",
                    "gallery": "http://127.0.0.1:8080/uploads/images/giay-mui-nhon-satin-trang-tri-khoa-cai-trapezium-gbb-0420-mau-xanh-navy-1-59125-1614917709-medium-6253f41bc7634.jpg"
                }
            ]
        }
        
        getOrderDetail.mockResolvedValueOnce([ 
            order
        ]) 
 
        await getOrderDetail(order.id).then(data => { 
            expect(data.length).toEqual(1); 
            expect(data[0].id).toEqual(order.id); 
            expect(data[0].createAt).toEqual(order.createAt); 
            expect(data[0].recipientName).toEqual(order.recipientName); 
            expect(data[0].recipientPhone).toEqual(order.recipientPhone); 
            expect(data[0].addressDelivery).toEqual(order.addressDelivery); 
            expect(data[0].status).toEqual(order.status); 
            expect(data[0].amount).toEqual(order.amount); 
            expect(data[0].shippingCost).toEqual(order.shippingCost); 
            expect(data[0].totalPrice).toEqual(order.totalPrice); 
            expect(data[0].items).toEqual(order.items); 

        }) 
    }) 
})