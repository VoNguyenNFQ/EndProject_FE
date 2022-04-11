import faker from "@faker-js/faker"; 
import { getProductById } from "utils/callAPIs"; 

jest.mock('utils/callAPIs', () => ({ 
    getProductById: jest.fn() 
})) 
 
describe("Unit Test callAPIs", () => { 
 
    let container; 
 
    beforeEach(() => { 
        container = document.createElement('div') 
        document.body.appendChild(container) 
    }) 
 
    afterEach(() => { 
        document.body.removeChild(container) 
        container = null; 
    }) 
 
 
 
    it("Unit Test Call APi Get Product Detail ", async () => { 
 
        const product = {
            id: faker.datatype.number,
            name: faker.datatype.string,
            description: faker.datatype.string,
            price: faker.datatype.number,
            gallery: faker.datatype.array,
            color: "black",
            items: [
                {
                    id: faker.datatype.number,
                    amount: faker.datatype.number,
                    amountInCart: faker.datatype.number,
                    size: "35"
                }
            ]
        }
        
        getProductById.mockResolvedValueOnce([ 
            product
        ]) 
 
        await getProductById().then(data => { 
            expect(data.length).toEqual(1); 
            expect(data[0].id).toEqual(product.id); 
            expect(data[0].name).toEqual(product.name); 
            expect(data[0].description).toEqual(product.description); 
            expect(data[0].price).toEqual(product.price); 
            expect(data[0].gallery).toEqual(product.gallery); 
            expect(data[0].color).toEqual(product.color); 
            expect(data[0].items).toEqual(product.items); 
        }) 
    }) 
})