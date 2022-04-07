const initialState = {
    quantity: 0,
}

export const badgeCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BADGE_CART":
            return {
                ...state,
                quantity: action.payload
            }
        default:
            return state;
    }
}

export default badgeCartReducer;