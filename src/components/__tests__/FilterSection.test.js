import { act } from "@testing-library/react";
import FilterSection from '../FIlterSection';
import ReactDOM from "react-dom";

describe("Unit Test Component Filter Section", () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })
    it("Hover div to display ", () => {

        act(() => {
            ReactDOM.render(<FilterSection />, container)
        })

        const button = container.querySelector("#filterSection");
        expect(button.textContent).toBe('Filter');
    })
})