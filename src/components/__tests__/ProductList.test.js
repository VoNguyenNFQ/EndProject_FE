import { act } from "@testing-library/react";
import FilterSection from '../FIlterSection';
import ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";
import faker from "@faker-js/faker";
import { getAllProduct } from 'utils/callAPIs';
import ProductList from './../ProductList/index';
import { MemoryRouter } from 'react-router-dom';

jest.mock('utils/callAPIs', () => ({
    getAllProduct: jest.fn()
}))

describe("Unit Test Component Product List", () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })



    it("Unit Test Call APi ProductList ", async () => {

        let id = faker.datatype.number;
        let name = faker.name.firstName;
        let price = faker.datatype.number;
        let gallery = faker.datatype.array;
        getAllProduct.mockResolvedValueOnce([
            { id, name, price, gallery }
        ])

        await getAllProduct()
            .then(data => {
                const handleCheckDisplayLoadMore = jest.fn();

                act(() => {
                    ReactDOM.render(<MemoryRouter><ProductList
                        productList={data}
                        handleCheckDisplayLoadMore={handleCheckDisplayLoadMore}
                    /></MemoryRouter>, container);
                })

                expect(data.length).toEqual(1);
                expect(data[0].id).toEqual(id);
                expect(data[0].name).toEqual(name);
                expect(data[0].price).toEqual(price);
                expect(data[0].gallery).toEqual(gallery);
            })

    })
})