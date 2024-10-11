"use strict";

import {cartItemsContainer} from "./app.js";
import {updateCart} from "./cartUpdatingModule.js";
import {updateTotal} from "./siteChangingModule.js";
import {removeCartItem, updateCartItemPrice} from "./cartItemManagingModule.js";

export function addToCart(product, button, itemContainer) {
    const quantitySelector = document.createElement("div");
    quantitySelector.classList.add("selector");
    quantitySelector.innerHTML = `
  <button class="decrease"><img src="assets/images/icon-decrement-quantity.svg"/></button>
  <span class="quantity">1</span>
  <button class="increase"><img src="assets/images/icon-increment-quantity.svg"/></button>
  `;

    itemContainer.replaceChild(quantitySelector, button);
    itemContainer.querySelector(".dessert-img").style.border = "1.75px solid hsl(14, 86%, 42%)";

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.setAttribute("data-id", itemContainer.dataset.id);
    cartItem.setAttribute("data-price", product.price);
    cartItem.setAttribute("data-name", product.name);
    cartItem.setAttribute("data-thumbnail-src", product.image.thumbnail);
    cartItem.setAttribute("data-quantity", 1);

    cartItem.innerHTML = `
  <div class="cart-item-container">
  <p class="added-dessert-name">${product.name}</p>
  <span class="added-item-quantity">1</span>
  <span class="item-price">@ $${product.price.toFixed(2)}</span>
  <span class="item-price-total">$${product.price}</span>
  <img src="assets/images/icon-remove-item.svg" class="remove-cart-item">
  </div>
  `;

    cartItemsContainer.appendChild(cartItem);

    updateCart();
    updateTotal();

    const removeButton = cartItem.querySelector(".remove-cart-item");
    removeButton.addEventListener("click", function () {
        removeCartItem(itemContainer, cartItem, button, quantitySelector);
    });

    const quantityElem = quantitySelector.querySelector(".quantity");
    const increaseButton = quantitySelector.querySelector(".increase");
    const decreaseButton = quantitySelector.querySelector(".decrease");

    increaseButton.addEventListener("click", function () {
        let quantity = parseInt(quantityElem.textContent);
        quantity++;
        quantityElem.textContent = quantity;
        itemContainer.setAttribute("data-quantity", quantity);
        updateCartItemPrice(cartItem, product.price, quantity);
        updateTotal();
    });

    decreaseButton.addEventListener("click", function () {
        let quantity = parseInt(quantityElem.textContent);
        if (quantity === 1) {
            removeCartItem(itemContainer, cartItem, button, quantitySelector);
            quantity--;
            updateCartItemPrice(cartItem, product.price, quantity);
        }
        if (quantity > 1) {
            quantity--;
            quantityElem.textContent = quantity;
            itemContainer.setAttribute("data-quantity", quantity);
            document.querySelector("item");
            updateCartItemPrice(cartItem, product.price, quantity);
            updateTotal();
        }
    });
    updateCart();
}
