import { GET_PRODUCTS_LIST } from "./productsActions";

const PRODUCTS_INITIAL_STATE = {}

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS_LIST:
            return { ...payload };

        default:
            return state;
    }
}