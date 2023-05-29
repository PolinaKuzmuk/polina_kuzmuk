import React from "react";
import { ProductSection } from "../ProductSection/ProductSection";
import "./Index.css";

export default function Home({user, products, addUser, removeItemFromCart}) {
    return (
        <main className="main">
            <div className="container">
                <div id="categoriesContainer">
                    <ProductSection user={user} products={products} addUser={addUser} removeItemFromCart={removeItemFromCart}/>
                </div>
            </div>
        </main>
    )
}