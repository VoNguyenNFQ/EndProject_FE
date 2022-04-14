import { faker } from '@faker-js/faker';
import { act } from '@testing-library/react';
import ProductItem from 'components/ProductItem';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'

describe("Unit Test Component Product Item", () => {
    let container

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display product Item", async () => {
        const product = {
            id: 1,
            name: "Giày cao gót",
            price:"29",
            gallery: faker.image
        }

        act(() => {
            ReactDOM.render(<MemoryRouter><ProductItem product={product} /></MemoryRouter>, container);
        })

        const productItem = container.querySelector(`#product-${product.id} h4`)
        expect(productItem.textContent).toBe(product.name);
        expect(productItem).toMatchSnapshot();
    })
})