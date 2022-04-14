import { faker } from '@faker-js/faker';
import Carousel from 'components/Carousel';
import { act } from "@testing-library/react";
import ReactDOM from 'react-dom';

describe("Unit Test Component Banner", () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display carousel in banner", () => {
        const images = ["http://localhost:8080/image"]

        act(() => {
            ReactDOM.render(<Carousel images={images} />, container);
        })

        const carouselContainer = container.querySelector("#carouselContainer");
        expect(carouselContainer).toBeTruthy();

        const image = container.querySelector(`img[src="${images[0]}"]`)
        expect(image).toBeTruthy();
    })
})