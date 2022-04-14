import { faker } from '@faker-js/faker';
import { act } from "@testing-library/react";
import SuccessScreen from 'components/SuccessScreen';
import ReactDOM from 'react-dom';

describe("Unit Test Component Success Screen", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Display Success animation", () => {
        const msg = faker.datatype.string

        act(() => {
            ReactDOM.render(<SuccessScreen msg={msg} />, container);
        })

    })
})