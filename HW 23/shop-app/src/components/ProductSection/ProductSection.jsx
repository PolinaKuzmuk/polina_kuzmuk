import React from "react";
import ProductItem from "../ProductItem/ProductItem";

export const ProductSection = ({ user, products, addUser, showItemsInCart }) => {
    let renderedProductsArr = [];
    for (const key in products) {
        const categoryItems = products[key];
        const mappedItems = categoryItems.map(item => <ProductItem user={user} item={item} addUser={addUser} showItemsInCart={showItemsInCart} />);
        let section =
            <section key={key} className="category" dataname={key}>
                <h2>{key}</h2>
                <div key={`container-${key}`} className="category__container">{mappedItems}</div>
            </section>;
        renderedProductsArr.push(section);
    }
    return (renderedProductsArr);
}