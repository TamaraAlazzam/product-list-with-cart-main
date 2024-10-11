"use strict";

import {blockingOverlay, cartItemsContainer} from "./app.js";
import {resetItems} from "./siteChangingModule.js";

export function openConfirmationModal() {
    const modalWindow = document.getElementById("order-confirmed-modal");
    modalWindow.classList.remove("hidden");

    modalWindow.innerHTML = `
          <img src="assets/images/icon-order-confirmed.svg" id="confirmed-icon" />
          <h2>Order Confirmed</h2>
          <p id="order-modal-text">We hope you enjoy your food!</p>
          <div id="confirmed-items-container"></div>
        `;

    const confirmedItemsContainer = document.getElementById("confirmed-items-container");

    let totalPrice = 0;

    cartItemsContainer.querySelectorAll(".cart-item").forEach((cartItem) => {
        let itemThumbnailSrc = cartItem.getAttribute("data-thumbnail-src");
        let itemName = cartItem.getAttribute("data-name");
        let itemQuantity = parseInt(cartItem.getAttribute("data-quantity"));
        let itemPrice = parseFloat(cartItem.getAttribute("data-price"));

        totalPrice += itemPrice * itemQuantity;

        confirmedItemsContainer.innerHTML += `
              <div class="confirmed-item">
                <img src=${itemThumbnailSrc} width="40px" height="40px"/>
                <div class="confirmed-item-info">
                  <p class="confirmed-item-name" style=
                    "font-family: 'Red Hat Text';
                    font-weight: 600;
                    font-size: 11px;
                    color: var(--rose900);">${itemName}</p>

                  <span class="confirmed-item-quantity">x${itemQuantity}</span>

                  <span class="confirmed-item-price">@ $${itemPrice}</span>
                  <span class="confirmed-item-total-price">$${(itemPrice * itemQuantity).toFixed(2)}
                </div>
              </div>
            `;
    });

    confirmedItemsContainer.innerHTML += `
        <div id=confirmed-order-total>
          <span id="confirmed-order-total-text">Order Total</span>
          <span id="confirmed-order-total-price">$${totalPrice.toFixed(2)}</span>
        </div>
    `;

    document.body.classList.add("modal-open");
    document.getElementById("blocking-overlay").style.display = "block";

    modalWindow.innerHTML += `
          <button id="start-new-order">Start New Order</button>
        `;

    const startNewOrderButton = document.getElementById("start-new-order");
    startNewOrderButton.addEventListener("click", function () {
        hideModal(modalWindow);

        resetItems();
    });

    blockingOverlay.addEventListener("click", function () {
        hideModal(modalWindow);
    });
}

export function hideModal(modalWindow) {
    modalWindow.classList.add("hidden");
    modalWindow.innerHTML = "";
    document.body.classList.remove("modal-open");
    document.getElementById("blocking-overlay").style.display = "none";
}
