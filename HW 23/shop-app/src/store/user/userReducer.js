import API from "../../services/API";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, UPDATE_ACTIVE_USER } from "./userActions";

const user = localStorage.getItem('user') ? await API.getActiveUser(localStorage.getItem('user')) : {};

const USER_INITIAL_STATE = user

export const userReducer = (state = USER_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_ACTIVE_USER:
            return payload;

        case UPDATE_ACTIVE_USER:
            return payload;

        case REMOVE_ACTIVE_USER:
            return payload;

        default:
            return state;
    }
}