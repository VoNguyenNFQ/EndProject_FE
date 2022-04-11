import { act } from "@testing-library/react";
import FilterSection from '../FIlterSection';
import ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";

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

        act(() => {
            button.dispatchEvent(new MouseEvent('hover', { bubbles: true }))
        })

        userEvent.hover(button);
        let filterContainerAppear = container.querySelector('#filterContainer');
        expect(filterContainerAppear).toBeDefined();

        userEvent.unhover(button);
        let filterContainerDisapear = container.querySelector('#filterContainer');
        expect(filterContainerDisapear).toBeFalsy();
    })
})