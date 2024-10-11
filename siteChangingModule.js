"use strict";

import {allElementsCount, cartItemsContainer, productData, productsContainer, totalPriceElem} from "./app.js";
import {generateItemContainers} from "./itemCreationModule.js";
import {updateCart} from "./cartUpdatingModule.js";

export function updateTotal() {
    let totalPrice = 0;
    let totalCount = 0;

    const cartItems = cartItemsContainer.querySelectorAll(".cart-item");

    cartItems.forEach((item) => {
        const price = parseFloat(item.getAttribute("data-price"));
        const quantity = parseInt(item.getAttribute("data-quantity"));

        let quantityElem = item.querySelector(".added-item-quantity");
        quantityElem.textContent = quantity;

        totalPrice += price * quantity;
        totalCount += quantity;
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
    allElementsCount.textContent = totalCount;
}

export function resetItems() {
    productsContainer.innerHTML = "";
    productData.then((data) => generateItemContainers(data));

    cartItemsContainer.childNodes.forEach((cartItem) => {
        cartItem.setAttribute("data-quantity", 0);
        cartItem.remove();
        updateCart();
        updateTotal();
    });
}
