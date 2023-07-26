document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".product .btn");
    const clearCartButton = document.querySelector(".clear-cart");
    const cartItemsList = document.querySelector(".cart-items");
    const totalPriceElement = document.querySelector(".total-price");
  
    let totalPrice = 0;
    const cartItems = [];
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const product = event.target.closest(".product");
        const productName = product.querySelector("h3").textContent;
        const productPrice = parseFloat(product.querySelector(".price").textContent);
  
        // Check if the product is already in the cart
        const existingCartItem = cartItems.find((item) => item.name === productName);
  
        if (existingCartItem) {
          // If the product is already in the cart, increase the quantity and update the total price
          existingCartItem.quantity++;
          existingCartItem.totalPrice = existingCartItem.quantity * productPrice;
        } else {
          // If the product is not in the cart, add it
          cartItems.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            totalPrice: productPrice,
          });
        }
  
        // Sort cart items based on total price in descending order
        cartItems.sort((a, b) => b.totalPrice - a.totalPrice);
  
        // Update the cart UI
        renderCartItems();
      });
    });
  
    clearCartButton.addEventListener("click", () => {
      cartItems.length = 0; // Clear the cart items array
      totalPrice = 0;
      renderCartItems(); // Update the cart UI
    });
  
    function renderCartItems() {
      cartItemsList.innerHTML = ""; // Clear the cart UI before rendering
  
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
  
        // Attach event listener to the remove button
        const removeButton = cartItem.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
          // Remove the item from the cart
          const itemIndex = cartItems.indexOf(item);
          if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1);
            totalPrice -= item.totalPrice;
            renderCartItems(); // Update the cart UI after removing
          }
        });
  
        // Attach event listener to the quantity buttons
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
  
            // Sort cart items based on total price in descending order
            cartItems.sort((a, b) => b.totalPrice - a.totalPrice);
  
            renderCartItems(); // Update the cart UI after changing the quantity
          });
        });
      });
  
      // Calculate the total price
      totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  
      // Update the total price
      totalPriceElement.textContent = `Total: ${totalPrice} USD`;
    }
  });
  