import { getProductsList, getUsers, createUser, changeUserData } from './modules/apiRequests.js';
import { renderProducts, showUserName, showItemsInCart, showError, hidePreviousError, getUserCart, getUserOrders, showUserData } from './modules/render.js';

const BASE_URL = 'https://634e9f834af5fdff3a625f84.mockapi.io/';
let currentPage = window.location.href;
let currentUser = JSON.parse(localStorage.getItem('user')) || '';
let productCartArr;

export { BASE_URL }

getProductsList()
    .then(res => {
        const productsList = res;
        if (currentPage.includes('index.html')) {
            renderProducts(productsList);
            productCartArr = Array.from(document.getElementsByClassName('product-cart_link'));
            productCartArr.forEach(cart => {
                if (currentUser.status === true) {
                    if (currentUser.shoppingCart) {
                        currentUser.shoppingCart.forEach(item => {
                            const productID = cart.parentElement.parentElement.id;
                            if (item.id === productID) {
                                cart.classList.add('product__cart—in');
                            }
                        })
                    }

                    cart.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (cart.classList.contains('product__cart—in')) {
                            const newProductID = e.target.parentElement.parentElement.parentElement.id;

                            currentUser.shoppingCart.forEach(item => {
                                if (item.id === newProductID) {
                                    const index = currentUser.shoppingCart.indexOf(item);
                                    currentUser.shoppingCart.splice(index, 1);
                                    cart.classList.remove('product__cart—in');
                                    localStorage.setItem('user', JSON.stringify(currentUser));
                                    showItemsInCart();
                                }
                            })
                        } else {
                            const prodId = cart.parentElement.parentElement.id;
                            currentUser.shoppingCart.push({
                                id: `${prodId}`,
                                count: 1
                            });
                            cart.classList.add('product__cart—in');
                            localStorage.setItem('user', JSON.stringify(currentUser));
                            showItemsInCart();
                        }
                    })
                }
            })
        } else if (currentPage.includes('shoppingCart.html')) {
            getUserCart()
        }
    })

if (currentUser.status === true) {
    const shoppingCartLink = document.querySelector('.shopping-cart-link');
    shoppingCartLink.href = 'shoppingCart.html';
    showUserName(currentUser);
    showItemsInCart();
}

if (currentPage.includes('login.html')) {
    const signInForm = document.querySelector('form.sign-in');
    const registrationForm = document.querySelector('form.registration');
    let userList;

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hidePreviousError();
        const userEmail = signInForm.querySelector('input[type="email"]').value;
        const userPassword = signInForm.querySelector('input[type="password"]').value;

        getUsers()
            .then(res => {
                userList = res;
                let invalidEmailsList = [];
                userList.filter(user => {
                    if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password === userPassword)) {
                        changeUserData(user, true)
                            .then(res => redirect(res, 'index'));
                        localStorage.setItem('user', JSON.stringify(user));
                    } else if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password !== userPassword)) {
                        showError(signInForm, 'password');
                    } else {
                        invalidEmailsList.push(user);
                    }
                })

                if (invalidEmailsList.length === userList.length) {
                    showError(signInForm, 'email');
                }
            })
    });
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hidePreviousError();
        const userPassword = registrationForm.querySelector('input[name="password"]').value;
        const verifyPassword = registrationForm.querySelector('input[name="verify-password"]').value;
        const userEmail = registrationForm.querySelector('input[type="email"]').value;
        const fullname = registrationForm.querySelector('input[name="full-name"]').value;
        if (userPassword !== verifyPassword) {
            showError(registrationForm, 'password');
        } else (
            getUsers()
                .then(res => {
                    userList = res;
                    let findDuplicateUser = userList.filter(user => user.email === userEmail);
                    if (findDuplicateUser.length === 0) {
                        const newUser = {
                            orders: [],
                            shoppingCart: [],
                            name: fullname,
                            email: userEmail,
                            password: userPassword,
                            status: true
                        };
                        createUser(newUser)
                            .then(res => {
                                localStorage.setItem('user', JSON.stringify(newUser));
                                redirect(res, 'index');
                            })
                    } else if (findDuplicateUser.length > 0) {
                        const span = registrationForm.querySelector('span.email');
                        span.innerHTML = `${userEmail}`;
                        showError(registrationForm, 'email');
                    }
                })
        )
    })
}

function redirect(res, page) {
    if (res.status >= 200 && res.status <= 299) {
        window.location.href = `${page}.html`;
    } else {
        alert(`Something went wrong. Response status ${res.status}.`)
    }
}

if (currentPage.includes('shoppingCart.html')) {
    const completeOrder = document.querySelector('.complete-order');
    completeOrder.addEventListener('click', _ => {
        currentUser.shoppingCart.forEach(item => currentUser.orders.push(item))
        currentUser.shoppingCart.splice(0);
        const updatedUser = currentUser;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.href = 'account.html';
    })
}

if (currentPage.includes('account.html')) {
    getUserOrders();
    showUserData();
}

export { redirect, currentUser, currentPage }