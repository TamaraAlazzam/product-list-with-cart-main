let dessersList = document.querySelector(".listproduct");
let listProducts = [];
let carts = [];
let itemIncart = document.querySelector(".getNewdata");
let spanCartSpan = document.querySelector(".quantity");
let totalpriceCart = document.querySelector(".cart-total");
let emptyCartContent = document.querySelector(".empty-content");
let cartItemsSection = document.querySelector(".cart-items");
const confirmOrderbrn = document.querySelector(".confirm-order");

const initApp = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML(); // populate products to HTML
    });
};
initApp();

// add product data to the HTML
const addDataToHTML = () => {
  dessersList.innerHTML = ""; // clear the content
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("products-card");
      newProduct.dataset.name = product.name;
      newProduct.innerHTML = `
        <img class="image-product" src="${product.image.desktop}" alt="product">
        <button class="addToCart"> 
          <img src="assets/images/icon-add-to-cart.svg" alt="cart icon"> Add to cart  
        </button>
        <div class="counter hidden">
          <button class="icon-decrement">-</button>
          <span>0</span>
          <button class="icon-increment">+</button>
        </div>
        <p class="toLeft">${product.category}</p>
        <h2 class="product-name">${product.name}</h2>
        <h3 class="price">$ ${product.price.toFixed(2)}</h3>
      `;
      dessersList.appendChild(newProduct);
    });
    addEventListenersToButtons(); // attach event listeners
  }
};

// add product to cart
const addToCart = (product_name) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_name == product_name
  );

  if (carts.length <= 0) {
    carts = [
      {
        product_name: product_name,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_name: product_name,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }

  addCartToHTML();
  updateCartDisplay();
};

const removeFromCart = (productName) => {
  carts = carts.filter((cartItem) => cartItem.product_name !== productName);
  addCartToHTML();
  updateCartDisplay(); // diplay the aside content
};

const updateCartQuantity = (productName, newQuantity) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_name === productName
  );

  if (positionThisProductInCart >= 0) {
    carts[positionThisProductInCart].quantity = newQuantity;
  }
  addCartToHTML();
};

// update cart HTML and calculate total price
const addCartToHTML = () => {
  itemIncart.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;

  if (carts.length > 0) {
    carts.forEach((cart) => {
      let newCart = document.createElement("div");
      totalQuantity += cart.quantity;

      let positionProduct = listProducts.findIndex(
        (value) => value.name == cart.product_name
      );

      if (positionProduct >= 0) {
        let info = listProducts[positionProduct];
        if (info) {
          totalPrice += info.price * cart.quantity; // add item price to total price
          newCart.innerHTML = `
            <h2>${info.name}</h2>
            <div class="pdcs-infos">
              <p class="product-quantity">${cart.quantity}X</p>
              <p class="single-price">@$${info.price.toFixed(2)}</p>
              <p class="total-price">$${(info.price * cart.quantity).toFixed(
                2
              )}</p>
            </div>
          `;
          itemIncart.appendChild(newCart);
        }
      }
    });
  }

  spanCartSpan.innerText = totalQuantity;
  totalpriceCart.textContent = `$${totalPrice.toFixed(2)}`; // update the total price in the cart
  console.log(totalQuantity);
};

// handle addToCart button click
const handleAddToCartClick = (event) => {
  const addToCartButton = event.target;
  const productCard = addToCartButton.closest(".products-card");
  const counterDiv = productCard.querySelector(".counter");
  const span = counterDiv.querySelector("span");
  const image = productCard.querySelector(".image-product");

  // hide the addToCart button and show the counter
  addToCartButton.style.display = "none";
  counterDiv.classList.remove("hidden");

  span.textContent = 1;
  image.classList.add("image-border");

  spanCartSpan.textContent = parseInt(spanCartSpan.textContent) + 1;

  let productName = productCard.dataset.name;

  addToCart(productName);
  updateCartDisplay();
};

// handle increment/decrement button click
const handleCounterClick = (event) => {
  const button = event.target;
  const counterDiv = button.closest(".counter");
  const span = counterDiv.querySelector("span");
  const addToCartButton = counterDiv.parentElement.querySelector(".addToCart");
  const image = counterDiv.parentElement.querySelector(".image-product");
  const productName = counterDiv.parentElement.dataset.name;
  let currentValue = parseInt(span.textContent);

  // invcerment
  if (button.classList.contains("icon-increment")) {
    span.textContent = currentValue + 1;
    updateCartQuantity(productName, currentValue + 1);
  }

  // DEcrement
  if (button.classList.contains("icon-decrement")) {
    if (currentValue > 1) {
      span.textContent = currentValue - 1;
      updateCartQuantity(productName, currentValue - 1);
    } else if (currentValue === 1) {
      counterDiv.classList.add("hidden");
      addToCartButton.style.display = "block";
      image.classList.remove("image-border");
      span.textContent = 0;
      removeFromCart(productName);

      spanCartSpan.textContent = Math.max(
        0,
        parseInt(spanCartSpan.textContent) - 1
      ); //  cart quantit go below zero
      updateCartDisplay();
    }
  }
};

const updateCartDisplay = () => {
  if (carts.length === 0) {
    emptyCartContent.style.display = "block";
    cartItemsSection.style.display = "none";
  } else {
    emptyCartContent.style.display = "none";
    cartItemsSection.style.display = "block";
  }
};

const resetEverything = () => {
  carts = [];
  addCartToHTML();
  spanCartSpan.innerText = 0;

  updateCartDisplay();

  let productCards = document.querySelectorAll(".products-card");

  productCards.forEach((card) => {
    let addToCartButton = card.querySelector(".addToCart");
    let counterDiv = card.querySelector(".counter");
    let image = card.querySelector(".image-product");
    let span = counterDiv.querySelector("span");

    addToCartButton.style.display = "block";
    counterDiv.classList.add("hidden");
    image.classList.remove("image-border");
    span.textContent = 0;
  });
};

// evntss
const addEventListenersToButtons = () => {
  let addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.removeEventListener("click", handleAddToCartClick);
    button.addEventListener("click", handleAddToCartClick);
  });

  let incrementButtons = document.querySelectorAll(".icon-increment");
  let decrementButtons = document.querySelectorAll(".icon-decrement");

  incrementButtons.forEach((button) => {
    button.removeEventListener("click", handleCounterClick);
    button.addEventListener("click", handleCounterClick);
  });

  decrementButtons.forEach((button) => {
    button.removeEventListener("click", handleCounterClick);
    button.addEventListener("click", handleCounterClick);
  });
};

confirmOrderbrn.addEventListener("click", () => {
  let confirmation = confirm("Do you want to confirm the order?");

  if (confirmation) {
    let totalOrderAmount = totalpriceCart.textContent;
    console.log(`The order total is ${totalOrderAmount}`);

    resetEverything();
  }
});
