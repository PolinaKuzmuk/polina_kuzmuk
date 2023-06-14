import API from "../../services/API";

export const GET_PRODUCTS_LIST = 'GET_PRODUCTS_LIST';

const actionCreator = (type, payload) => {
    if (payload) {
        return { type, payload }
    } else {
        return { type }
    }
}

const getProductsListAction = (list) => actionCreator(GET_PRODUCTS_LIST, list);

export const getProductsListThunk = () => {
    return async (dispatch) => {
        await API.getProductsList()
            .then(res => dispatch(getProductsListAction(res)))
    }
}