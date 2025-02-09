document.addEventListener("DOMContentLoaded", function () {
  // Updates cart icon when the page loads
  updateCartIcon();

  // Function to retrieve products from API
  async function loadProducts() {
    const url = "https://integratedproject-feca.restdb.io/rest/products";
    const apiKey = "67a8b8d899fb601fa5e983eb";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'x-apikey': apiKey,
          "Content-Type": "application/json"
        }
      });
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    }
  };

  // Update cart display in the shopping cart overlay
  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart'))  || [];
    const cartContainer = document.querySelector('.cart-container');
    
    cartContainer.innerHTML = '';

    // checks if cart is empty
    if (cart.length === 0) {
      const emptyCartMessage = `
        <div class="d-flex flex-column align-items-center justify-content-center" style="height: 100%;">
          <h3>Your cart is empty</h3>
          <p>
            <a href="shop.html" class="btn btn-link p-0">Go browse guitars</a>
          </p>
        </div>
      `;
      cartContainer.innerHTML = emptyCartMessage;
      checkoutBtn.style.display = 'none';
    } else { // else if not update the card with the products the user added
      cart.forEach(item => {
        const itemHTML = `
          <div class="cart-item d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3 rounded" style="width: 100px; height: auto;">
              <div>
                <h5 class="cart-item-name mb-1">${item.name}</h5>
                <p class="cart-item-price mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
                
                <!-- Quantity input -->
                <div class="quantity-control d-flex align-items center mt-1">
                  <button class="btn btn-sm btn-outline-secondary decreasebtn" data-id="${item.id}">-</button>
                  <span class="quantity-value mx-2">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary increasebtn" data-id="${item.id}">+</button>
                </div>
              </div>
            </div>
            <button class="btn btn-danger btn-sm remove-item-btn" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
      });

      // shows the checkout button if there are items in the cart
      checkoutBtn.style.display = 'block';
    }
    
    // waits for user to increase or decrease quantity
    document.querySelectorAll('.increasebtn').forEach(button => {
      button.addEventListener('click', function () {
        changeQuantity(button.getAttribute('data-id'), 1);
      });
    });

    document.querySelectorAll('.decreasebtn').forEach(button => {
      button.addEventListener('click', function () {
        changeQuantity(button.getAttribute('data-id'), -1);
      });
    });

    // removes item from cart
    document.querySelectorAll('.remove-item-btn').forEach(button => {
      button.addEventListener('click', function () {
        removeFromCart(button.getAttribute('data-id'));
      });
    });

    // Show or hide the checkout button based on whether the cart has items
    if (cart.length === 0) {
      checkoutBtn.style.display = 'none';
    } else {
      checkoutBtn.style.display = 'block'; 
    }

    // Allow users to remove items 
    document.querySelectorAll('.remove-item-btn').forEach(button => {
      button.addEventListener('click', function () {
        const itemId = button.getAttribute('data-id');
        const updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCartUI();
        updateCartIcon();
      });
    });
  };

  // Function to update cart icon
  function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.fa-bag-shopping');
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = cartIcon.querySelector('.badge');

    if (cartItemCount > 0) {
      if (cartBadge) {
        cartBadge.textContent = cartItemCount; // Update existing badge
      } else {
        // If no badge exists, create one
        const badge = document.createElement('span');
        badge.classList.add('badge', 'bg-danger');
        badge.textContent = cartItemCount;
        cartIcon.appendChild(badge);
      }
    } else {
      if (cartBadge) {
        cartBadge.remove(); // Remove the badge if the cart is empty
      }
    }
  };

  // Change quantity function
  function changeQuantity(id, amount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === id);

    if (productIndex !== -1) {
      cart[productIndex].quantity += amount;

      if (cart[productIndex].quantity === 0) {
        cart.splice(productIndex, 1);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      updateCartIcon();
    }
  };

  // function to check if the user is logged in or nah
  function isLogged() {
    const isLoggedIN = localStorage.getItem("loggedIN");

    if (isLoggedIN === "true") {
      document.getElementById("login-link").style.display = "none";
      document.getElementById("signup-link").style.display = "none";
      document.getElementById('profile-link').style.display = "block";
      document.getElementById("logout-link").style.display = "block";
    } else {
      document.getElementById("login-link").style.display = "block";
      document.getElementById("signup-link").style.display = "block";
      document.getElementById('profile-link').style.display = "none";
      document.getElementById("logout-link").style.display = "none";
    }
  }

  // event listener to check if the user logs out or not
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtn2 = document.getElementById("logout-link");
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.setItem("loggedIN", "false");
      localStorage.removeItem('userId');
      alert("You have been logged out!");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1250);
    });
  };

  if (logoutBtn2) {
    logoutBtn2.addEventListener("click", function () {
      localStorage.setItem("loggedIN", "false");
      localStorage.removeItem('userId');
      alert("You have been logged out!");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1250);
    });
  };

  // initialize page yes
  loadProducts();
  isLogged();
  updateCartUI();
  updateCartIcon();
});