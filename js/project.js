document.addEventListener('DOMContentLoaded', function() {
    // const favoriteIcons = document.querySelectorAll('.favorite-icon');
  
    // favoriteIcons.forEach(icon => {
    //   icon.addEventListener('click', function() {
    //     icon.classList.toggle('favorite'); // Toggle favorite class on click
    //     const productImage = icon.parentElement.querySelector('img').src;
    //     const productname = icon.parentElement.querySelector('.product-name').textContent;
    //     addProductToFavorites(productImage);
    //   });
    // });
  
    // function addProductToFavorites(productImage,productname) {
    //   const favoriteProducts = document.getElementById('favorite-products');
    //   const product = document.createElement('img');
    //   product.src = productImage;
    //   favoriteProducts.appendChild(product);
    // }


    const favoriteIcons = document.querySelectorAll('.favorite-icon');

favoriteIcons.forEach(icon => {
  icon.addEventListener('click', function() {
    icon.classList.toggle('favorite'); // Toggle favorite class on click
    const productImage = icon.parentElement.querySelector('img').src;
    const productName = icon.parentElement.querySelector('.product-name').textContent;
    addProductToFavorites(productImage, productName); // Pass both productImage and productName to the function
  });
});

function addProductToFavorites(productImage, productName) {
  const favoriteProducts = document.getElementById('favorite-products');
  const productContainer = document.createElement('div'); // Create a container for each product (you can customize this)
  const image = document.createElement('img');
  image.src = productImage;
  const name = document.createElement('p');
  name.textContent = productName;
  productContainer.appendChild(image);
  productContainer.appendChild(name);
  favoriteProducts.appendChild(productContainer);
}



   





// const addToCartButton = document.getElementById("add-to-cart");
// const counter = document.getElementById("counter");
// const quantityInput = counter.querySelector("#quantity");
// const plusButton = counter.querySelector(".plusbtn");
// const minusButton = counter.querySelector(".minusbtn");

// addToCartButton.addEventListener("click", function() {
//   addToCartButton.style.display = "none";
//   counter.style.display = "flex"; // Assuming display style for visibility
// });

// plusButton.addEventListener("click", function() {
//   let quantity = parseInt(quantityInput.value);
//   quantity = Math.max(quantity + 1, 1); // Ensure minimum quantity is 1
//   quantityInput.value = quantity;
// });

// minusButton.addEventListener("click", function() {
//   let quantity = parseInt(quantityInput.value);
//   quantity = Math.max(quantity - 1, 1); // Ensure minimum quantity is 1
//   quantityInput.value = quantity;
// });

// // Error handling for invalid user input (non-numeric values)
// quantityInput.addEventListener("input", function() {
//   let value = quantityInput.value;
//   if (isNaN(value) || value.trim() === "") {
//     quantityInput.value = 1; // Reset to minimum quantity on invalid input
//   } else {
//     // Ensure the value is a valid number within the allowed range (min: 1)
//     quantityInput.value = Math.max(parseInt(value), 1);
//   }
// });
 
// document.addEventListener('DOMContentLoaded', function () {
  // Get all add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Add click event listener to each button
  addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function () {
          button.style.display = "none";
          const quantityControls = this.parentNode.querySelector('.quantity-controls');
          quantityControls.style.display = (quantityControls.style.display === 'none' || quantityControls.style.display === '') ? 'flex' : 'none';
      });
  });
  document.querySelectorAll('.plus-btn, .minus-btn').forEach(function(button) {
      button.addEventListener('click', function () {
          const input = this.parentNode.querySelector('.qty-input');
          let value = parseInt(input.value);
          if (this.classList.contains('plus-btn')) {
              value++;
          } else {
              // Check if value is greater than 1 before decrementing
              if (value > 1) {
                  value--;
              } else {
                  const productCard = this.closest('.product-card');
                  const addButton = productCard.querySelector('.add-to-cart-btn');
                  const quantityControl = productCard.querySelector('.quantity-controls');
                  addButton.style.display = "inline-block";
                  quantityControl.style.display = "none";
              }
          }
          input.value = value;
      });
  });   
  });
  