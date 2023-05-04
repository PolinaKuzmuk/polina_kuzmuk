const BASE_URL = 'https://634e9f834af5fdff3a625f84.mockapi.io/';
const body = document.querySelector('body');
let currentPage = window.location.href;
let currentUser = JSON.parse(localStorage.getItem('user')) || '';
let productsList = JSON.parse(localStorage.getItem('products')) || '';
let productCartArr;

fetch(`${BASE_URL}products`)
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
    })
    .then(res => {
        localStorage.setItem('products', JSON.stringify(res));
        if (currentPage.includes('index.html')) {
            renderProducts(productsList);
            productCartArr = Array.from(body.getElementsByClassName('product-cart_link'));
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
    const shoppingCartLink = body.querySelector('.shopping-cart-link');
    shoppingCartLink.href = 'shoppingCart.html';
    showUserName(currentUser);
    showItemsInCart();
}

function renderProducts(productsList) {
    const categoriesContainer = document.querySelector('#categoriesContainer');
    for (categoryName in productsList) {
        const categoryValues = productsList[categoryName];
        const section = document.createElement('section');
        setSectionProp(section, categoryName, categoriesContainer);

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category__container');
        section.append(categoryContainer);

        categoryValues.forEach(item => renderItems(item, categoryContainer));
    }
}

function renderItems(item, parentDiv) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.id = item.id;
    parentDiv.append(productCard);

    addProductImage(item, productCard);
    addProductTitle(item, productCard);
    isSale(item, productCard);

    const priceWrap = document.createElement('div');
    priceWrap.classList.add('price-wrap');
    productCard.append(priceWrap);

    addPrice(item, priceWrap);
    addProductCard(priceWrap);
}

function setSectionProp(section, category, parentDiv) {
    section.classList.add('category');
    section.dataset.name = category;
    parentDiv.append(section);
    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('section-title');
    sectionTitle.innerText = category;
    section.append(sectionTitle);
}

function addProductImage(item, parentDiv) {
    const img = document.createElement('img');
    img.classList.add('product-img');
    img.style.width = 'auto';
    img.style.height = '100px';
    img.src = `img/products/${item.img}.png`;
    parentDiv.append(img);
}

function addProductTitle(item, parentDiv) {
    const title = document.createElement('p');
    title.classList.add('product-title');
    title.innerText = item.title;
    parentDiv.append(title);
}

function isSale(item, parentDiv) {
    if (item.sale) {
        const oldPrice = document.createElement('p');
        oldPrice.innerHTML =
            `<span class='old-price'>$${item.price}</span>
                <span class='percent'>-${item.salePercent}%</span>`;
        parentDiv.append(oldPrice);
    }
}

function addPrice(item, parentDiv) {
    const price = document.createElement('p');
    price.classList.add('current-price');
    if (item.sale) {
        const diskountSum = item.price * item.salePercent / 100;
        const newPrice = item.price - diskountSum;
        price.innerText = `$${newPrice}`;
    } else {
        price.innerText = `$${item.price}`;
    }
    parentDiv.append(price);
}

function addProductCard(parentDiv) {
    const productCart = document.createElement('img');
    productCart.classList.add('product-cart_img');
    productCart.src = 'img/shopping-cart.png';

    const cartLink = document.createElement('a');
    cartLink.classList.add('product-cart_link');
    cartLink.href = 'login.html';
    cartLink.append(productCart);

    parentDiv.append(cartLink);
}

if (currentPage.includes('login.html')) {
    const signInForm = body.querySelector('form.sign-in');
    const registrationForm = body.querySelector('form.registration');
    let userList;

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hidePreviousError();
        const userEmail = signInForm.querySelector('input[type="email"]').value;
        const userPassword = signInForm.querySelector('input[type="password"]').value;

        fetch(`${BASE_URL}users`)
            .then(res => res.json())
            .then(res => {
                userList = res;
                let invalidEmailsList = [];
                userList.filter(user => {
                    if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password === userPassword)) {
                        changeStatusAndRedirect(user, true);
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
            fetch(`${BASE_URL}users`)
                .then(res => res.json())
                .then(res => {
                    userList = res;
                    let findDuplicateUser = userList.filter(user => user.email === userEmail);
                    if (findDuplicateUser.length === 0) {
                        const newUser = {
                            name: fullname,
                            email: userEmail,
                            password: userPassword,
                            status: true
                        };
                        fetch(`${BASE_URL}users`, {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(newUser),
                        })
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

function showUserName(user) {
    const userName = body.querySelector('.log-in');
    userName.innerHTML = `${user.name}`;
    userName.href = 'account.html';

    const logOutBtn = body.querySelector('.log-out');
    logOutBtn.style.display = 'inline-block';
    logOutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await changeStatusAndRedirect(user, false);
        localStorage.removeItem('user');
    })
}

function changeStatusAndRedirect(user, status) {
    user.status = status;
    fetch(`${BASE_URL}users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
    })
        .then(res => redirect(res, 'index'))
}

function showItemsInCart() {
    const cartAmount = body.querySelector('.shopping-cart-item');
    if (currentUser.shoppingCart.length > 0) {
        let userOrders = currentUser.shoppingCart ? (currentUser.shoppingCart).reduce((acc, item) => acc + Number(item.count), 0) : 0;
        cartAmount.innerText = `${userOrders}`
    };
}

function showError(target, err) {
    const error = target.querySelector(`.invalid-${err}`);
    error.classList.add('active');
}

function hidePreviousError() {
    const errList = Array.from(body.getElementsByClassName('error'));
    errList.forEach(err => err.classList.remove('active'));
}

function getUserCart() {
    const shoppingCart = currentUser.shoppingCart;
    if (shoppingCart.length < 1) {
        const emptyCart = body.querySelector('.empty-cart');
        emptyCart.classList.add('active');
    } else {
        const userCart = body.querySelector('.cart_wrapper');
        userCart.style.display = 'grid';
        renderItemsInCart();
    }
}

function renderItemsInCart() {
    createTableRows(currentUser.shoppingCart, 7);
}

function calculateTotal() {
    if (currentPage.includes('shoppingCart.html')) {
        const summary = body.querySelector('.totalNumber');
        let totalArr = Array.from(document.getElementsByClassName('total'));
        let totalSum = totalArr.reduce((acc, item) => {
            let itemNumber = +item.textContent.slice(1);
            acc = acc + itemNumber;
            return acc;
        }, 0);
        summary.innerHTML = `$${totalSum}`;
    }
}

if (currentPage.includes('shoppingCart.html')) {
    const completeOrder = body.querySelector('.complete-order');
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

function showUserData() {
    const userName = body.querySelector('.user-name');
    userName.innerHTML = currentUser.name;

    const userEmail = body.querySelector('.user-email');
    userEmail.innerHTML = currentUser.email;

    const deleteAccount = body.querySelector('.delete-account');
    deleteAccount.addEventListener('click', _ => {
        fetch(`${BASE_URL}users/${currentUser.id}`, {
            method: 'DELETE',
        })
            .then(res => {
                redirect(res, 'index');
                localStorage.removeItem('user');
            })
    })
}

function getUserOrders() {
    createTableRows(currentUser.orders, 6);
}

function createTableRows(list, cells) {
    const table = body.querySelector('.table tbody');

    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.dataset.id = item.id;
        table.append(tr);

        createTableCells(tr, cells);

        for (const category in productsList) {
            const categoryList = productsList[category];
            categoryList.forEach(product => {
                if (item.id === product.id) {
                    fillTableRow(product, tr, item);
                }
            })
        }
    })
}

function fillTableRow(product, tr, item) {
    let cell = tr.querySelector(`td[data-id="1"]`);
    addProductImage(product, cell);

    cell = tr.querySelector(`td[data-id="2"]`);
    addProductTitle(product, cell);

    cell = tr.querySelector(`td[data-id="3"]`);
    addPrice(product, cell)

    cell = tr.querySelector(`td[data-id="4"]`);
    addSalePercent(product, cell)

    cell = tr.querySelector(`td[data-id="5"]`);
    addQuantity(cell, item)

    cell = tr.querySelector(`td[data-id="6"]`);
    addTotalPrice(product, item, cell)

    cell = tr.querySelector(`td[data-id="7"]`);
    addTrashCan(cell, item);
}


function createTableCells(row, cells) {
    for (let i = 1; i <= cells; i++) {
        const td = document.createElement('td');
        td.dataset.id = `${i}`;
        row.append(td);
    }
}

function addPrice(product, cell) {
    cell.innerHTML = `$${product.price}`;
}

function addSalePercent(product, cell) {
    if (product.sale === true) {
        const salePercent = document.createElement('p');
        salePercent.innerHTML = `-${product.salePercent}%`;
        salePercent.classList.add('percent');
        cell.append(salePercent);
    }
}

function addQuantity(cell, item) {
    if (currentPage.includes('account.html')) {
        cell.innerHTML = item.count;
    } else {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.value = item.count;
        cell.append(input);
    }
}

function addTotalPrice(product, item, cell) {
    const tr = cell.parentElement;
    const price = product.price;
    let salePercent = 0;
    if (product.salePercent) {
        salePercent = product.salePercent;
    }
    const newPrice = price - (price * salePercent / 100);
    let total = newPrice * item.count;
    cell.innerHTML = `$${total}`;
    cell.classList.add('total');

    calculateTotal();

    if (currentPage.includes('shoppingCart.html')) {
        const quantity = tr.querySelector('td[data-id="5"] input');

        quantity.addEventListener('change', (e) => {
            let count = e.target.value;
            total = newPrice * count;
            cell.innerHTML = `$${total}`;
            if (count > item.count) {
                item.count += 1;
            } else {
                item.count -= 1;
            }
            const updatedUser = currentUser;
            fetch(`${BASE_URL}users/${updatedUser.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedUser),
            })
                .then(res => res.json())
                .then(res => localStorage.setItem('user', JSON.stringify(res)))
            calculateTotal();
            showItemsInCart();
        })
    }
}

function addTrashCan(cell, item) {
    if (cell) {
        const trashImg = document.createElement('img');
        trashImg.classList.add('trash-img');
        trashImg.src = 'img/delete.png';
        cell.append(trashImg);
        trashImg.addEventListener('click', (e) => {
            const parenEl = e.target.parentElement.parentElement;
            const index = currentUser.shoppingCart.indexOf(item);
            currentUser.shoppingCart.splice(index, 1);
            const updatedUser = currentUser;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            fetch(`${BASE_URL}users/${currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedUser),
            })
                .then(res => {
                    if (res.status >= 200 && res.status <= 299) {
                        parenEl.remove();
                        showItemsInCart();
                        calculateTotal();
                    }
                })
        })
    }
}