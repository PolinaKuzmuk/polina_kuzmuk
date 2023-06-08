import API from "../services/API";

export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const REMOVE_ACTIVE_USER = 'REMOVE_ACTIVE_USER';
export const UPDATE_ACTIVE_USER = 'UPDATE_ACTIVE_USER';
export const GET_PRODUCTS_LIST = 'GET_PRODUCTS_LIST';

const actionCreator = (type, payload) => {
    if (payload) {
        return { type, payload }
    } else {
        return { type }
    }
}

const setActiveUserAction = (user) => actionCreator(SET_ACTIVE_USER, user);
const removeActiveUserAction = () => actionCreator(REMOVE_ACTIVE_USER, {});
const updateActiveUserAction = (user) => actionCreator(UPDATE_ACTIVE_USER, user);
const getProductsListAction = (list) => actionCreator(GET_PRODUCTS_LIST, list);

export const setActiveUSer = (dispatch, user) => dispatch(setActiveUserAction(user));
export const removeActiveUser = (dispatch) => dispatch(removeActiveUserAction());
export const updateActiveUser = (dispatch, user) => dispatch(updateActiveUserAction(user));
export const getProductsList = (dispatch) => API.getProductsList().then(res => dispatch(getProductsListAction(res)));