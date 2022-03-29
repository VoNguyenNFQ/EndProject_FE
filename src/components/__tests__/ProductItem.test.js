import { faker } from '@faker-js/faker';
import ProductItem from 'components/ProductItem';
import ReactDOM from 'react-dom';

describe("Unit Test Component Product Item", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display product Item", () => {
        const product = {
            id: faker.datatype.number,
            name: faker.commerce.productName,
            price: faker.commerce.price,
            gallery: faker.image
        }

        act(() => {
            ReactDOM.render(<ProductItem product={product} />, container);
        })

        
    })
})