"use strict"

import {updateCart} from "./cartUpdatingModule.js";
import {updateTotal} from "./siteChangingModule.js";

export function removeCartItem(itemContainer, cartItem, button, quantitySelector) {
    itemContainer.replaceChild(button, quantitySelector);
    itemContainer.querySelector(".dessert-img").style.border = 0;
    cartItem.remove();
    updateCart();
    updateTotal();
}

export function updateCartItemPrice(cartItem, price, quantity) {
    const itemPriceElem = cartItem.querySelector(".item-price-total");
    cartItem.setAttribute("data-quantity", quantity);
    itemPriceElem.textContent = (price * quantity).toFixed(2);
}