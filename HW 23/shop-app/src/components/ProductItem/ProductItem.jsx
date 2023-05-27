import React from "react";
import API from "../../services/API";
import "./ProductItem.css";

export default function ProductItem({ user, item, addUser, showItemsInCart }) {
    const diskountSum = item.price * item.salePercent / 100;
    const newPrice = item.price - diskountSum;
    let inShoppingCart = false;

    user.shoppingCart.forEach(el => {
        if (el.id === item.id) {
            inShoppingCart = true;
        }
    })

    function addToCart(e) {
        e.preventDefault();
        user.shoppingCart.push({
            id: `${item.id}`,
            count: 1
        });
        API.changeUserData(user).then(() => {
            localStorage.setItem('user', JSON.stringify(user));
            addUser(user);
            e.target.parentElement.classList.add("product__cart—in");
            inShoppingCart = true;
            showItemsInCart();
        });
    }

    function removeFromCart(e) {
        e.preventDefault();
        user.shoppingCart.forEach(el => {
            if (el.id === item.id) {
                const index = user.shoppingCart.indexOf(el);
                user.shoppingCart.splice(index, 1);
                API.changeUserData(user).then(() => {
                    localStorage.setItem('user', JSON.stringify(user));
                    addUser(user);
                    e.target.parentElement.classList.remove("product__cart—in");
                    inShoppingCart = false;
                    showItemsInCart();
                });
            }
        })
    }

    return (
        <div className="product-card" key={item.id}>
            <img className="product-img" width="auto" height="100px" src={`./img/products/${item.img}.png`} alt={item.title}></img>
            <p className="product-title">{item.title}</p>
            <p className={`sale ${item.sale ? "active" : ""}`}>
                <span className="old-price">${item.price}</span>
                <span className="percent">-{item.salePercent}%</span>
            </p>
            <div className="price-wrap">
                <p className="current-price">${item.sale ? newPrice : item.price}</p>
                <a className={`product-cart_link ${inShoppingCart ? "product__cart—in" : ''}`} href="/login" onClick={inShoppingCart ? removeFromCart : addToCart}>
                    <img className="product-cart_img" src="./img/shopping-cart.png" alt="add-to-cart" ></img>
                </a>
            </div>
        </div>
    );
}