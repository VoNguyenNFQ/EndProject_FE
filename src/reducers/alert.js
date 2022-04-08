const initialState = {
    show: false,
    type: "",
    message: ""
}

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_ALERT":
            return {
                ...state,
                show: true,
                type: action.payload.type,
                message: action.payload.message
            }
        case "HIDE_ALERT":
            return {
                ...state,
                show: false,
                type: "",
                message: ""
            }
        default:
            return state;
    }
}

export default alertReducer;