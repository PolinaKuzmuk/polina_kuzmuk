import { SET_ACTIVE_USER, LOGOUT_ACTIVE_USER, UPDATE_ACTIVE_USER, DELETE_ACTIVE_USER } from "./userActions";
import { userReducer } from "./userReducer";
import API from "../../services/API";

const user = {
    "orders": [
        {
            "id": "20",
            "count": 2
        },
        {
            "id": "1",
            "count": 1
        },
        {
            "id": "22",
            "count": 2
        }
    ],
    "shoppingCart": [
        {
            "id": "19",
            "count": 1
        },
        {
            "id": "11",
            "count": 2
        },
        {
            "id": "21",
            "count": 1
        }
    ],
    "id": "264",
    "name": "Polina",
    "email": "polinka2082@gmail.com",
    "password": "123",
    "status": false
}

const updatedUser = {
    "orders": [
        {
            "id": "20",
            "count": 2
        },
        {
            "id": "1",
            "count": 1
        },
        {
            "id": "22",
            "count": 2
        }
    ],
    "shoppingCart": [],
    "id": "264",
    "name": "Polina",
    "email": "polinka2082@gmail.com",
    "password": "123",
    "status": true
}

test('should return the initial state', () => {
    expect(userReducer({}, { type: undefined })).toEqual(
        {}
    )
})

test('should handle a user being added to an initial state', () => {
    const previousState = []

    expect(userReducer(previousState, { type: SET_ACTIVE_USER, payload: user })).toEqual(
        {
            "orders": [
                {
                    "id": "20",
                    "count": 2
                },
                {
                    "id": "1",
                    "count": 1
                },
                {
                    "id": "22",
                    "count": 2
                }
            ],
            "shoppingCart": [
                {
                    "id": "19",
                    "count": 1
                },
                {
                    "id": "11",
                    "count": 2
                },
                {
                    "id": "21",
                    "count": 1
                }
            ],
            "id": "264",
            "name": "Polina",
            "email": "polinka2082@gmail.com",
            "password": "123",
            "status": false
        }
    )
})

test('should handle a user being removed from an initial state', () => {
    const previousState = user;

    expect(userReducer(previousState, { type: LOGOUT_ACTIVE_USER, payload: {} })).toEqual(
        {}
    )
})

test('should handle a user being updated', () => {
    const previousState = user

    expect(userReducer(previousState, { type: UPDATE_ACTIVE_USER, payload: updatedUser })).toEqual(
        {
            "orders": [
                {
                    "id": "20",
                    "count": 2
                },
                {
                    "id": "1",
                    "count": 1
                },
                {
                    "id": "22",
                    "count": 2
                }
            ],
            "shoppingCart": [],
            "id": "264",
            "name": "Polina",
            "email": "polinka2082@gmail.com",
            "password": "123",
            "status": true
        }
    )
})

test('should handle a user being deleted', () => {
    const previousState = user;

    expect(userReducer(previousState, { type: DELETE_ACTIVE_USER, payload: {} })).toEqual(
        {}
    )
})