import { faker } from '@faker-js/faker';
import { act } from "@testing-library/react";
import ProductDetail from 'pages/LandingPages/ProductDetail';
import ReactDOM from 'react-dom';

describe("Unit Test Component Product Detail", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display product detail", () => {
        const product = {

            id: faker.datatype.number,
            name: faker.commerce.productName,
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.",
            price: faker.commerce.price,
            gallery: faker.image,
            color: "black",
            items: [
                {
                    id: faker.datatype.number,
                    amount: faker.datatype.number,
                    size: "35"
                }
            ]
        }

        act(() => {
            ReactDOM.render(<ProductDetail product={product} />, container);
        })


    })
})