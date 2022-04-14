import { act } from "@testing-library/react";
import SuccessSignUp from 'components/SuccessSignUp';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe("Unit Test Component Success Sign up", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display Success Signup", () => {

        act(() => {
            ReactDOM.render(<MemoryRouter> <SuccessSignUp /></MemoryRouter>, container);
        })
    })
})