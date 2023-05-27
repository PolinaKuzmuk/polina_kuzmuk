const BASE_URL = 'https://634e9f834af5fdff3a625f84.mockapi.io/';

export default {
    getUsers: () => {
        return (
            fetch(`${BASE_URL}users`)
                .then(res => res.json())
        )
    },

    changeUserStatus: (user, status) => {
        user.status = status;
        return (
            fetch(`${BASE_URL}users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user),
            })
        )
    },

    changeUserData: (user) => {
        return (
            fetch(`${BASE_URL}users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user),
            })
        )
    },

    createUser: (user) => {
        return (fetch(`${BASE_URL}users`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user),
        }))
    },

    getProductsList: () => {
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
}