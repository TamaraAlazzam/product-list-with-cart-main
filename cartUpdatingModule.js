"use strict";

import {cartItemsContainer, emptyCartContainer, totalPriceContainer} from "./app.js";
import {updateTotal} from "./siteChangingModule.js";

export function updateCart() {
    const cartItems = cartItemsContainer.querySelectorAll(".cart-item");

    if (cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        totalPriceContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
    } else {
        cartItemsContainer.classList.remove("hidden");
        totalPriceContainer.classList.remove("hidden");
        emptyCartContainer.classList.add("hidden");
    }
    updateTotal();
}
