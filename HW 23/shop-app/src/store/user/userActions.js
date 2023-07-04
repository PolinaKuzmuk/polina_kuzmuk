import API from "../../services/API";

export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const LOGOUT_ACTIVE_USER = 'LOGOUT_ACTIVE_USER';
export const UPDATE_ACTIVE_USER = 'UPDATE_ACTIVE_USER';
export const DELETE_ACTIVE_USER = 'DELETE_ACTIVE_USER';

const actionCreator = (type, payload) => {
    if (payload) {
        return { type, payload }
    } else {
        return { type }
    }
}

const setActiveUserAction = (user) => actionCreator(SET_ACTIVE_USER, user);
const removeActiveUserAction = () => actionCreator(LOGOUT_ACTIVE_USER, {});
const updateActiveUserAction = (user) => actionCreator(UPDATE_ACTIVE_USER, user);
const deleteActiveUserAction = () => actionCreator(DELETE_ACTIVE_USER, {});

export const setActiveUSerThunk = (user) => {
    return async (dispatch) => {
        await API.changeUserStatus(user, true)
            .then(dispatch(setActiveUserAction(user)))
    }
}

export const removeActiveUserThunk = (user) => {
    return async (dispatch) => {
        await API.changeUserStatus(user, false)
            .then(dispatch(removeActiveUserAction()))
    }
}

export const updateActiveUserThunk = (user) => {
    return async (dispatch) => {
        await API.changeUserData(user)
            .then(dispatch(updateActiveUserAction(user)))
    }
}

export const deleteActiveUserThunk = (user) => {
    return async (dispatch) => {
        await API.deleteUser(user)
            .then(dispatch(deleteActiveUserAction()))
    }
}