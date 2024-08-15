function incrementQuantity(index) {
    items[index].quantity++;
    updateCartDisplay();
    document.getElementById(`quantityDisplay${index}`).innerHTML = items[index].quantity;
}

function decrementQuantity(index) {
    if (items[index].quantity > 1) {
        items[index].quantity--;
        document.getElementById(`quantityDisplay${index}`).innerHTML = items[index].quantity;
    } else {
        // if quantity equals 0 remove the item from the cart
        removeFromCart(index);
    }
    updateCartDisplay();
}


function addToCart(index) {
    if (items[index].quantity === 0) {
        items[index].quantity = 1;
        cart.push(items[index]);
        document.getElementById(`add-btn-${index}`).style.display = "none";
        document.getElementById(`quantityControl${index}`).style.display = "flex";
        document.getElementById(`quantityDisplay${index}`).innerHTML = items[index].quantity;
        document.getElementById(`item-image-${index}`).style.boxShadow = "0 0 0 3px #ff7b54";
        
    }
    updateCartDisplay();
}

    
function removeFromCart(index) {
    items[index].quantity = 0;
    cart = cart.filter(item => item.id !== index);
    document.getElementById(`add-btn-${index}`).style.display = "flex";
    document.getElementById(`quantityControl${index}`).style.display = "none";
    document.getElementById(`item-image-${index}`).style.boxShadow = "none";
    updateCartDisplay();
    
}

function updateCartDisplay() {
    let cartPlaceHolder = document.getElementById("filled-cart");
    let print = "";
    let quantity = 0;
    let totalPrice = 0;

    // add items to the cart
    cart.forEach(item => {
        if (item.quantity > 0) {
            print += `
                <div class="singl-item">
                    <div class="items-price-count">
                        <p class="item-name-incart">${item.name}</p>
                        <div class="count-and-price">
                            <p class="item-repeated-number" style="color: red;">${item.quantity}x</p>
                            <p class="single-item-price">@ $${item.price.toFixed(2)}</p>
                            <p class="total-item-price">$${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="remove-icon">
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
                    </div>
                </div>
                <hr>
            `;
            quantity += item.quantity;
            totalPrice += item.quantity * item.price;
        }
    });

    //printing the cart items
    cartPlaceHolder.innerHTML = print;
    document.getElementById("cart-title-number").innerHTML = `Your Cart (${quantity})`;
    document.getElementById("total-price-display").innerHTML = `$${totalPrice.toFixed(2)}`;

    displayCart();
}

// show and hide the cart 
function displayCart() {
    
    if (cart.length > 0) {
        document.getElementById("empty-cart-place").style.display = "none";
        document.getElementById("filled-cart").style.display = "block";
        document.getElementById("confirmation-side").style.display = "block";
    } else {
        document.getElementById("empty-cart-place").style.display = "block";
        document.getElementById("filled-cart").style.display = "none";
        document.getElementById("confirmation-side").style.display = "none";
    }
}

function confirmOrder(){
    
    console.log("in")
    let popup = document.getElementById("my-popup");
    let print = ` 
     <img src="../assets/images/icon-order-confirmed.svg" style="margin:30px 0 0 30px;">
        <h1 style="margin: 30px 0 0 30px;"> Order Confirmed</h1>
        <p style="margin: 0 0 20px 30px; color: gray;"> We hope you enjoy your food!</p>
        <div id="popup-gen" class="items-in-popup">
            <div class="col-popup-items">
    `;
    let totalPrice = 0;
    cart.forEach(item => {
        if (item.quantity > 0) {
            
            print += `
                <div class="outter-popup-item-section">
                    <img src="${item.image.thumbnail}">
                    <div class="inner-popup-item-section">
                    
                        <div>
                            <p>
                            ${item.name}
                            </p>
                            <p> <span style="color:red;">${item.quantity}x</span> <span style="font-size:10px;">@</span>$${item.price.toFixed(2)}</p>
                        </div>

                    <span class="popup-total-item-price"> $${(item.price*item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `;

           
            totalPrice += item.quantity * item.price;
        }
    });

    print +=`

            

            </div>

            <div class="total-order-price">
                <p style="text-align: start; font-size: 12px; padding-top: 20px; padding-left: 20px;">
                    Order Total
                </p>
                <p style="text-align: end; padding-right: 20px; font-size: 24px;
                 font-weight: bold;">
                    $${totalPrice.toFixed(2)}
                </p>
            </div>
            
        </div>
        
        <div class="center-new-order-btn">
            <button class="new-order-btn" onclick="newOrder()"> Start New Order</button>
        </div>

        `;

        // print the popup screen
        popup.innerHTML = print;
        popup.style.display= "block";
        
        
        
   
}

function newOrder(){
    document.getElementById("my-popup").style.display = "none"
    restButtons(cart)
   
    updateCartDisplay()
}

function restButtons(cartItems){
    cartItems.forEach(item =>{
        removeFromCart(item.id)
    })

}

   
