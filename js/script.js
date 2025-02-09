/* Shop page */
/* Filtering code */
// Initialize Isotope on #product-list for filtering
var $grid = $('#product-list').isotope({
  // options can be added if needed
});

// Filter items on button click
$('.filter-button-group').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

// Updates cart icon when the page loads
document.addEventListener('DOMContentLoaded', updateCartIcon);

// Function to retrieve products from restDB
async function loadProducts() {
  const url = "https://integratedproject-feca.restdb.io/rest/products";
  const apiKey = "67a1bf53c5f8d4c695e4d4f7";
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

// dynamic loading script for products in shop/anywhere else
async function displayProducts() {
  const products = await loadProducts();
  const productList = document.querySelector('#product-list');

  products.forEach(product => {
    const productHTML = `
      <div class="col-lg-3 col-md-4 col-sm-6 ${product.category}">
          <div class="product-item">
              <div class="product-img">
                  <img src="${product.image}" class="img-fluid d-block mx-auto" alt="${product.name}">
              </div>
              <div class="product-content text-center py-3">
                  <span class="d-block text-uppercase fs-5 fw-bold">${product.name}</span>
                  <span class="d-block fs-5 mt-1">$${product.price.toFixed(2)}</span>
                  <button type="button" class="btn btn-warning mt-2 fw-semibold view-product"
                     data-id="${product._id}"
                     data-name="${product.name}"
                     data-price="${product.price}"
                     data-image="${product.image}"
                     data-description="${product.description}">
                     View
                  </button>
              </div>
          </div>
      </div>
    `;
    productList.insertAdjacentHTML('beforeend', productHTML);
  });

  // this is to help reload the format of the cards due to buggy issues
  // Helped by online sources and chatgpt for this solution
  $('#product-list').isotope('reloadItems').isotope({
      itemSelector: '.col',
      layoutMode: 'fitRows'
  });

  requestAnimationFrame(() => {
    const bootstrapGrid = document.querySelector('#product-list');
    bootstrapGrid.classList.add('d-none');
    bootstrapGrid.offsetHeight;
    bootstrapGrid.classList.remove('d-none');
  });
};

// updates the modal when user presses view on a product
document.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.view-product')) {
    e.preventDefault();
    const button = e.target;
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = button.getAttribute('data-price');
    const productImage = button.getAttribute('data-image');
    const productDescription = button.getAttribute('data-description');

    // updates the modal overlay with the new product content
    const modalProductName = document.getElementById('productModalName'); 
    modalProductName.textContent = productName; 
    document.getElementById('productModalLabel').textContent = productName; 
    const modalImage = document.getElementById('productModalImage');
    modalImage.src = productImage;
    modalImage.alt = productName;
    document.getElementById('productModalDescription').textContent = productDescription;
    document.getElementById('productModalPrice').textContent = `$${parseFloat(productPrice).toFixed(2)}`;

    // Update the "Add to cart" button inside the modal with product data
    const addToCartBtn = document.getElementById('modalAddToCartBtn');
    addToCartBtn.setAttribute('data-id', productId);
    addToCartBtn.setAttribute('data-name', productName);
    addToCartBtn.setAttribute('data-price', productPrice);
    addToCartBtn.setAttribute('data-image', productImage);

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
  }
});

// Add to cart for modal overlay
document.getElementById('modalAddToCartBtn').addEventListener('click', function () {
  const productId = this.getAttribute('data-id');
  const productName = this.getAttribute('data-name');
  const productPrice = parseFloat(this.getAttribute('data-price'));
  const productImage = this.getAttribute('data-image');
  const userLogged = localStorage.getItem('loggedIN');
  // checks if the user is logged in first
  if (userLogged === "true") {
    addToCart(productId, productName, productPrice, productImage);
    const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
  } else {
    alert("Please login to add items to your cart!");
    const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
  }
});

// Update cart display in the shopping cart overlay
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
              <div class="quantity-control d-flex align-items center mt-2">
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



// Add product to cart function
function addToCart(id, name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === id);

  if (productIndex === -1) {

    cart.push({ id, name, price, image, quantity: 1 });
  } else {

    cart[productIndex].quantity++;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartIcon();
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

// Function to update cart icon
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartIcon = document.querySelector('.fa-bag-shopping');
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = cartIcon.querySelector('.badge');

  if (cartItemCount > 0) {
    if (cartBadge) {
      cartBadge.textContent = cartItemCount; 
    } else {

      const badge = document.createElement('span');
      badge.classList.add('badge', 'bg-danger');
      badge.textContent = cartItemCount;
      cartIcon.appendChild(badge);
    }
  } else {
    if (cartBadge) {
      cartBadge.remove(); 
    }
  }
};


// call the function to update the page
displayProducts();
updateCartUI();
updateCartIcon();
