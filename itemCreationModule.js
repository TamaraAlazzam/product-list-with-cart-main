"use strict";

import {productsContainer} from "./app.js";
import {addToCart} from "./cartPopulatingModule.js";

export function generateItemContainers(data) {
    let i = 1;
    data.forEach((product) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        itemContainer.setAttribute("data-id", i);
        itemContainer.setAttribute("data-name", product.name);
        itemContainer.setAttribute("data-price", product.price);
        itemContainer.setAttribute("data-thumbnail-src", product.image.thumbnail);

        itemContainer.innerHTML = `
    <img class="dessert-img" src="${product.image.desktop}" />
      <button class="add-to-cart">
        <img src="/assets/images/icon-add-to-cart.svg" />
        <span>Add to Cart</span>
      </button>
      <p class="dessert-type">${product.category}</p>
      <p class="dessert-name">${product.name}</p>
      <p class="dessert-price">$${product.price.toFixed(2)}</p>
    `;

        productsContainer.appendChild(itemContainer);

        const addToCartButton = itemContainer.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", function () {
            addToCart(product, addToCartButton, itemContainer);
        });
        i++;
    });
}