"use strict";

import {updateCart} from "./cartUpdatingModule.js";
import {openConfirmationModal} from "./modalWindowManagingModule.js";
import {generateItemContainers} from "./itemCreationModule.js";

export let productsContainer;
export let cartItemsContainer;
export let totalPriceElem;
export let totalPriceContainer;
export let emptyCartContainer;
export let allElementsCount;
export let confirmOrderButton;
export let blockingOverlay;
export let productData;

document.addEventListener("DOMContentLoaded", function () {
    productsContainer = document.querySelector(".container");
    cartItemsContainer = document.getElementById("cart-added-items");
    totalPriceElem = document.getElementById("total-price");
    totalPriceContainer = document.getElementById("total-price-container");
    emptyCartContainer = document.getElementById("empty-cart-wrapper");
    allElementsCount = document.getElementById("all-elements-count");
    confirmOrderButton = document.getElementById("confirm-order");
    blockingOverlay = document.getElementById("blocking-overlay");

    productData = fetch("./data.json").then((response) => response
        .json()
        .then((data) => data)
        .catch((error) => console.error("Error fetching data:", error)));

    updateCart();
    productData.then((productData) => generateItemContainers(productData));

    confirmOrderButton.addEventListener("click", function () {
        openConfirmationModal();
    });
});
