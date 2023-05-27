import React from "react";
import { ProductSection } from "../ProductSection/ProductSection";
import "./Index.css";

export default function Index({user, products, addUser, showItemsInCart}) {
    return (
        <main className="main">
            <div className="container">
                <div id="categoriesContainer">
                    <ProductSection user={user} products={products} addUser={addUser} showItemsInCart={showItemsInCart}/>
                </div>
            </div>
        </main>
    )
}