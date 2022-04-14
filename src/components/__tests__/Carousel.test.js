import { faker } from '@faker-js/faker';
import { act } from "@testing-library/react";
import Carousel from 'components/Carousel';
import ReactDOM from 'react-dom';

describe("Unit Test Component Carousel", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })


    
    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display Carousel", () => {
        const images = [ faker.datatype.string]

        act(() => {
            ReactDOM.render(<Carousel images={images} />, container);
        })


    })
})