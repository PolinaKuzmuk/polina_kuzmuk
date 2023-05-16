import { getProductsList, changeUserData, deleteUser } from "./apiRequests.js";
import { redirect, currentUser, currentPage } from "../index.js";
import { calculateTotal } from "./utils.js";

function renderProducts(productsList) {
    const categoriesContainer = document.querySelector('#categoriesContainer');
    for (Object.keys in productsList) {
        const categoryValues = productsList[Object.keys];
        const section = document.createElement('section');
        setSectionProp(section, Object.keys, categoriesContainer);

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

function showUserName(user) {
    const userName = document.querySelector('.log-in');
    userName.innerHTML = `${user.name}`;
    userName.href = 'account.html';

    const logOutBtn = document.querySelector('.log-out');
    logOutBtn.style.display = 'inline-block';
    logOutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        changeUserData(user, false)
            .then(res => redirect(res, 'index'));
    })
}

function showItemsInCart() {
    const cartAmount = document.querySelector('.shopping-cart-item');
    if (currentUser.shoppingCart) {
        if (currentUser.shoppingCart.length > 0) {
            let userOrders = currentUser.shoppingCart ? (currentUser.shoppingCart).reduce((acc, item) => acc + Number(item.count), 0) : 0;
            cartAmount.innerText = `${userOrders}`
        }
    }
}

function showError(target, err) {
    const error = target.querySelector(`.invalid-${err}`);
    error.classList.add('active');
}

function hidePreviousError() {
    const errList = Array.from(document.getElementsByClassName('error'));
    errList.forEach(err => err.classList.remove('active'));
}

function getUserCart() {
    const shoppingCart = currentUser.shoppingCart;
    if (shoppingCart.length < 1) {
        const emptyCart = document.querySelector('.empty');
        emptyCart.classList.add('active');
    } else {
        const userCart = document.querySelector('.cart_wrapper');
        userCart.style.display = 'grid';
        renderItemsInCart();
    }
}

function renderItemsInCart() {
    createTableRows(currentUser.shoppingCart, 7);
}

function showUserData() {
    const userName = document.querySelector('.user-name');
    userName.innerHTML = currentUser.name;

    const userEmail = document.querySelector('.user-email');
    userEmail.innerHTML = currentUser.email;

    const deleteAccount = document.querySelector('.delete-account');
    deleteAccount.addEventListener('click', _ => {
        deleteUser()
            .then(res => {
                redirect(res, 'index');
                localStorage.removeItem('user');
            })
    })
}

function getUserOrders() {
    if (currentUser.orders.length > 0) {
        const orders = document.querySelector('.orders');
        orders.style.display = 'grid';
        createTableRows(currentUser.orders, 6);
    } else {
        const emptyTitle = document.querySelector('.empty');
        emptyTitle.classList.add('active');
    }
}

function createTableRows(list, cells) {

    const table = document.querySelector('.table tbody');
    getProductsList()
        .then(res => {
            const productsList = res;
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
        })
}

function fillTableRow(product, tr, item) {
    let cell = tr.querySelector(`td[data-id="1"]`);
    addProductImage(product, cell);

    cell = tr.querySelector(`td[data-id="2"]`);
    addProductTitle(product, cell);

    cell = tr.querySelector(`td[data-id="3"]`);
    addCurrentPrice(product, cell)

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

function addCurrentPrice(product, cell) {
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
            changeUserData(updatedUser, true)
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
            changeUserData(updatedUser, true)
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

export { renderProducts, showUserName, showItemsInCart, showError, hidePreviousError, getUserCart, getUserOrders, showUserData }