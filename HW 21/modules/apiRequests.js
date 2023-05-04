import { BASE_URL, currentUser } from '../index.js';

function getProductsList() {
    return (fetch(`${BASE_URL}products`)
        .then((res) => res.json())
        .then((res) => {
            return (res = res.reduce((acc, el) => {
                if (acc[el.category]) {
                    acc[el.category].push(el)
                }
                else {
                    acc[el.category] = [];
                    acc[el.category].push(el);
                }
                return acc;
            }, {}));
        }))
}

function getUsers() {
    return (
        fetch(`${BASE_URL}users`)
            .then(res => res.json()))
}

function createUser(user) {
    return (fetch(`${BASE_URL}users`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
    }))
}

function changeUserData(user, status) {
    user.status = status;
    return (
        fetch(`${BASE_URL}users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user),
        })
    )
}

function deleteUser() {
    return (
        fetch(`${BASE_URL}users/${currentUser.id}`, {
            method: 'DELETE',
        })
    )
}

export { getProductsList, getUsers, createUser, changeUserData, deleteUser }