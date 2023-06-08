import API from "../services/API";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, GET_PRODUCTS_LIST, UPDATE_ACTIVE_USER } from "./userActions";

const user = localStorage.getItem('user') ? await API.getActiveUser(localStorage.getItem('user')) : {};

const INITIAL_STATE = {
    user: user,
    products: []
}

export const rootReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_ACTIVE_USER:
            return { ...state, user: payload };

        case UPDATE_ACTIVE_USER:
            return { ...state, user: payload };

        case REMOVE_ACTIVE_USER:
            return { ...state, user: payload };

        case GET_PRODUCTS_LIST:
            return { ...state, products: payload };

        default:
            return state;
    }
}