var items = [];
var cart = [];
var isClosed = false;

fetch("../data.json")
.then(response => {
    if (!response.ok) 
        throw Error("error");
    return response.json();
})
.then(data => {
    let placeholder = document.querySelector("#print-card");
    let print = "";

    data.forEach((product, index) => {
        print += `
            <div class="cards">
                <img id="item-image-${index}" class="image-of-item" src=".${product.image.desktop}" alt="Item image">
                <button class="add-to-cart-btn" id="add-btn-${index}" onclick="addToCart(${index})"> 
                    <img class="btn-cart-icon" src="../assets/images/icon-add-to-cart.svg"> 
                    <span class="add-to-cart-span">Add to Cart</span> 
                </button>
                <div id="quantityControl${index}" class="quantity-control" style="display: none">
                    <button class="quantity-btn" onclick="decrementQuantity(${index})">-</button>
                    <span id="quantityDisplay${index}" class="quantity-display"></span>
                    <button class="quantity-btn" onclick="incrementQuantity(${index})">+</button>
                </div>
                <p class="item-name">${product.category}</p>
                <p class="item-description">${product.name}</p>
                <p class="item-price">$${product.price}</p>
            </div>
        `;
        // store data in array of objects
        let item = {
            id: index,
            name: product.category,
            description: product.name,
            price: product.price,
            image: {    thumbnail: `.${product.image.thumbnail}`,
                        mobile: `.${product.image.mobile}`,
                        tablet: `.${product.image.tablet}`,
                        desktop: `.${product.image.thumbnail}`,


            },
            
            quantity: 0
        };
        items.push(item);
    });
    // printing the cards
    placeholder.innerHTML = print;
   
});

