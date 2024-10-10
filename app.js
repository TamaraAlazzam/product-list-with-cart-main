"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector(".container");
  const cartItemsContainer = document.getElementById("cart-added-items");
  const totalPriceElem = document.getElementById("total-price");
  const totalPriceContainer = document.getElementById("total-price-container");
  const emptyCartContainer = document.getElementById("empty-cart-wrapper");
  const allElementsCount = document.getElementById("all-elements-count");
  const confirmOrderButton = document.getElementById("confirm-order");
  const blockingOverlay = document.getElementById("blocking-overlay");

  let productData = fetch("./data.json").then((response) =>
    response
      .json()
      .then((data) => data)
      .catch((error) => console.error("Error fetching data:", error))
  );

  function generateItemContainers(data) {
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

  function addToCart(product, button, itemContainer) {
    const quantitySelector = document.createElement("div");
    quantitySelector.classList.add("selector");
    quantitySelector.innerHTML = `
      <button class="decrease"><img src="assets/images/icon-decrement-quantity.svg"/></button>
      <span class="quantity">1</span>
      <button class="increase"><img src="assets/images/icon-increment-quantity.svg"/></button>
      `;

    itemContainer.replaceChild(quantitySelector, button);
    itemContainer.querySelector(".dessert-img").style.border =
      "1.75px solid hsl(14, 86%, 42%)";

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
      cartItem.remove();
      itemContainer.replaceChild(button, quantitySelector);
      itemContainer.querySelector(".dessert-img").style.border = 0;
      updateCart();
      updateTotal();
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

  function updateTotal() {
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

  function updateCartItemPrice(cartItem, price, quantity) {
    const itemPriceElem = cartItem.querySelector(".item-price-total");
    cartItem.setAttribute("data-quantity", quantity);
    itemPriceElem.textContent = (price * quantity).toFixed(2);
  }

  function updateCart() {
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

  function resetItems() {
    productsContainer.innerHTML = "";
    productData.then((data) => generateItemContainers(data));

    cartItemsContainer.childNodes.forEach((cartItem) => {
      cartItem.setAttribute("data-quantity", 0);
      cartItem.remove();
      updateCart();
      updateTotal();
    });
  }

  function openConfirmationModal() {
    const modalWindow = document.getElementById("order-confirmed-modal");
    modalWindow.classList.remove("hidden");

    modalWindow.innerHTML = `
          <img src="assets/images/icon-order-confirmed.svg" id="confirmed-icon" />
          <h2>Order Confirmed</h2>
          <p id="order-modal-text">We hope you enjoy your food!</p>
          <div id="confirmed-items-container"></div>
        `;

    const confirmedItemsContainer = document.getElementById(
      "confirmed-items-container"
    );

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
                  <span class="confirmed-item-total-price">$${(
                    itemPrice * itemQuantity
                  ).toFixed(2)}
                </div>
              </div>
            `;
    });

    confirmedItemsContainer.innerHTML += `
        <div id=confirmed-order-total>
          <span id="confirmed-order-total-text">Order Total</span>
          <span id="confirmed-order-total-price">$${totalPrice.toFixed(
            2
          )}</span>
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

  function hideModal(modalWindow) {
    modalWindow.classList.add("hidden");
    modalWindow.innerHTML = "";
    document.body.classList.remove("modal-open");
    document.getElementById("blocking-overlay").style.display = "none";
  }

  updateCart();
  productData.then((productData) => generateItemContainers(productData));

  confirmOrderButton.addEventListener("click", function () {
    openConfirmationModal();
  });
});
