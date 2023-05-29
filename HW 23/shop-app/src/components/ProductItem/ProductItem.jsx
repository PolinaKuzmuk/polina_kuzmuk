import React from "react";
import API from "../../services/API";
import "./ProductItem.css";

export default function ProductItem({ user, item, addUser, removeItemFromCart }) {
    const diskountSum = item.price * item.salePercent / 100;
    const newPrice = item.price - diskountSum;
    let inShoppingCart = false;

    if (user.shoppingCart) {

        user.shoppingCart.forEach(el => {
            if (el.id === item.id) {
                inShoppingCart = true;
            }
        })
    }

    function addToCart(e) {
        if (user.status) {
            e.preventDefault();
            addUser({
                ...user, shoppingCart: [...user.shoppingCart, {
                    id: `${item.id}`,
                    count: 1
                }]
            });
            API.changeUserData(user).then(() => {
                e.target.parentElement.classList.add("product__cart—in");
                inShoppingCart = true;
            });
        }
    }

    function removeFromCart(e) {
        e.preventDefault();
        user.shoppingCart.forEach(el => {
            if (el.id === item.id) {
                removeItemFromCart(el);
                API.changeUserData(user).then((res) => {
                    e.target.parentElement.classList.remove("product__cart—in");
                    inShoppingCart = false;
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