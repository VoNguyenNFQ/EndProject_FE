import { combineReducers } from "redux";

import loading from './loading';
import alert from './alert';
import badgeCart from './badgeCart'

const allReducers = combineReducers({
    loading, alert, badgeCart
})

export default allReducers;