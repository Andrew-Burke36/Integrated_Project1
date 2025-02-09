// displays items into the checkout cart yippety yappety
async function displayProducts() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productList = document.querySelector('#checkout-cart-items');
  productList.innerHTML = '';
  
  cart.forEach(product => {
    const productHTML = `
      <div class="cart-item d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex align-items-center">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img me-3 rounded" style="width: 100px; height: auto;">
          <div>
            <h5 class="cart-item-name mb-1">${product.name}</h5>
            <p class="cart-item-price mb-0">$${(product.price * product.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `;
    productList.insertAdjacentHTML('beforeend', productHTML);
  });
}

// update the order sumamry stuff in checkout page
function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const shipping = 5.00;  // shipping fee
  const tax = (subtotal * 0.09);  // 9% tax

  const total = subtotal + shipping + tax;

  document.querySelector('#subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('#shipping-amount').textContent = `$${shipping.toFixed(2)}`;
  document.querySelector('#tax-amount').textContent = `$${tax.toFixed(2)}`;
  document.querySelector('#total-amount').textContent = `$${total.toFixed(2)}`;
}

// Handling form submission
document.querySelector('#checkout-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Clears the cart
  localStorage.removeItem('cart');
  updateCartUI();
  updateOrderSummary();
  window.location.href = 'index.html'; // Redirect to the homepage
});

// initialize the page only once the dom loads
document.addEventListener('DOMContentLoaded', () => {
  displayProducts(); // display products in the checkout cart
  updateOrderSummary(); // initialize for oder summary
});