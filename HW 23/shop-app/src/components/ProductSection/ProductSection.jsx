import React from "react";
import ProductItem from "../ProductItem/ProductItem";

export const ProductSection = ({ user, products, addUser, removeItemFromCart }) => {
    let renderedProductsArr = Object.keys(products).map(key => {
        const categoryItems = products[key];
        const mappedItems = categoryItems.map(item => <ProductItem user={user} item={item} addUser={addUser} removeItemFromCart={removeItemFromCart} />);
        let section =
            <section key={key} className="category" dataname={key}>
                <h2>{key}</h2>
                <div key={`container-${key}`} className="category__container">{mappedItems}</div>
            </section>;
        return section;
    })
    return (renderedProductsArr);
}