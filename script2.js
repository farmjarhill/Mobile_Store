document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".product .btn");
    const clearCartButton = document.querySelector(".clear-cart");
    const cartItemsList = document.querySelector(".cart-items");
    const totalPriceElement = document.querySelector(".total-price");
    const cartWindowContainer = document.querySelector(".cart-window-container");
  
    let totalPrice = 0;
    const cartItems = [];
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const product = event.target.closest(".product");
        const productName = product.querySelector("h3").textContent;
        const productPrice = parseFloat(product.querySelector(".price").textContent);
  
        const existingCartItem = cartItems.find((item) => item.name === productName);
  
        if (existingCartItem) {
          existingCartItem.quantity++;
          existingCartItem.totalPrice = existingCartItem.quantity * productPrice;
        } else {
          cartItems.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            totalPrice: productPrice,
          });
        }
  
        cartItems.sort((a, b) => b.totalPrice - a.totalPrice);
  
        renderCartItems();
        renderCartWindowItems();
      });
    });
  
    clearCartButton.addEventListener("click", () => {
      cartItems.length = 0;
      totalPrice = 0;
      renderCartItems();
      renderCartWindowItems();
    });
  
    function renderCartItems() {
      cartItemsList.innerHTML = "";
  
      cartItems.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
          ${item.name} - ${item.price} USD 
          <button class="quantity-btn" data-product="${item.name}" data-change="decrease">-</button>
          Quantity: ${item.quantity}
          <button class="quantity-btn" data-product="${item.name}" data-change="increase">+</button>
          Total: ${item.totalPrice} USD
          <button class="remove-btn">Xóa</button>
        `;
        cartItemsList.appendChild(cartItem);
  
        const removeButton = cartItem.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
          const itemIndex = cartItems.indexOf(item);
          if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1);
            totalPrice -= item.totalPrice;
            renderCartItems();
            renderCartWindowItems();
          }
        });
  
        const quantityButtons = cartItem.querySelectorAll(".quantity-btn");
        quantityButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product");
            const changeType = button.getAttribute("data-change");
            const cartItem = cartItems.find((item) => item.name === productName);
  
            if (changeType === "increase") {
              cartItem.quantity++;
            } else if (changeType === "decrease") {
              cartItem.quantity = Math.max(1, cartItem.quantity - 1);
            }
  
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
  
            cartItems.sort((a, b) => b.totalPrice - a.totalPrice);
  
            renderCartItems();
            renderCartWindowItems();
          });
        });
      });
  
      totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  
      totalPriceElement.textContent = `Total: ${totalPrice} USD`;
    }
  
    function renderCartWindowItems() {
      cartWindowContainer.innerHTML = "";
  
      if (cartItems.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Giỏ hàng trống.";
        cartWindowContainer.appendChild(emptyMessage);
      } else {
        cartItems.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-window-item";
          cartItem.innerHTML = `
            <span>${item.name}</span>
    
            <span>Quantity: ${item.quantity}</span>
            
            <span>Price: ${item.price} USD</span>
          `;
          cartWindowContainer.appendChild(cartItem);
        });
      }
  
      const totalElement = document.createElement("p");
      totalElement.className = "total-price-window";
      totalElement.textContent = `Total: ${totalPrice} USD`;
      cartWindowContainer.appendChild(totalElement);
    }
  
    const cartWindow = document.querySelector(".cart-window-container");
    document.querySelector(".fa-cart-shopping").addEventListener("click", () => {
      cartWindow.classList.toggle("open");
    });
  });
  
  document.addEventListener("click", (event) => {
    const cartWindow = document.querySelector(".cart-window-container");
    const cartIcon = document.querySelector(".fa-cart-shopping");
  
    if (!cartWindow.contains(event.target) && event.target !== cartIcon) {
      cartWindow.classList.remove("open");
    }
  });
  
  function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = totalQuantity;
  }
  
  // Call the function to update the cart counter on page load
  updateCartCounter();
  