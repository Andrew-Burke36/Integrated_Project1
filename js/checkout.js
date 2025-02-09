// savesa the user id first
const userID = localStorage.getItem('userId');

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

async function checkUser(userID) {
  const apiKey = '67a1bf53c5f8d4c695e4d4f7';
  const databaseUrl = `https://integratedproject-feca.restdb.io/rest/customerinfo/${userID}`;
  
  try {
    const response = await fetch(databaseUrl, {
      method: 'GET',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const UUID = data._id;
    
    if ( UUID === userID) {
      return data; 
    } else {
      console.log('user not found')
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

async function autoFill() {
  if (userID) {
    const userData = await checkUser(userID);
    if (userData) {
      // if user data exists fill the form
      document.getElementById('fullname').value = userData.name;
      document.getElementById('email').value = userData.email;
      document.getElementById('streetaddress').value = userData.street;
      document.getElementById('cityaddress').value = userData.city;
      document.getElementById('postalcode').value = userData.postal;
      document.getElementById('number').value = userData.phone;
      document.getElementById('creditcard').value = userData.card;
      document.getElementById('expirationdate').value = userData.month;
      document.getElementById('cvv').value = userData.cvv;
      document.getElementById('cardholder').value = userData.name;
    } else { 
      // keep the text input empty if there is no data
      document.getElementById('fullname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('streetaddress').value = '';
      document.getElementById('cityaddress').value = '';
      document.getElementById('postalcode').value = '';
      document.getElementById('number').value = '';
      document.getElementById('creditcard').value = '';
      document.getElementById('expirationdate').value = '';
      document.getElementById('cvv').value = '';
      document.getElementById('cardholder').value = '';
    }
  }
}

// update the order summary stuff in checkout page
function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const shipping = 5.00;  // shipping fee
  const tax = (subtotal * 0.09);  // 9% tax uh ohh

  const total = subtotal + shipping + tax;

  document.querySelector('#subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('#shipping-amount').textContent = `$${shipping.toFixed(2)}`;
  document.querySelector('#tax-amount').textContent = `$${tax.toFixed(2)}`;
  document.querySelector('#total-amount').textContent = `$${total.toFixed(2)}`;
}

// Handling form submission
document.querySelector('#checkout-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // pushes the order to the database
  const apiKey = '67a1bf53c5f8d4c695e4d4f7';
  const customerOrderDB = `https://integratedproject-feca.restdb.io/rest/orderhistory`;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const date = new Date().toISOString();
  const orderNumber = Math.floor(Math.random() * 9000) + 1000;
  const productID = cart[0].id;
  const quantity = cart[0].quantity;


  const orderDetails = {
    userID: userID,
    productID: productID,
    quantity: quantity,
    orderDate: date,
    orderNumber: orderNumber,
  };

  try {
    const response = await fetch(customerOrderDB, {
      method: 'POST',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails),
    });

    if (response.ok) {
      alert('Order placed successfully!');
    }

    // Clears the cart
    localStorage.removeItem('cart');
    window.location.href = 'index.html'; // Redirect to the homepage
  } catch (error) {
    console.error('Error placing order:', error);
  }
});

// initialize the page only once the dom loads
document.addEventListener('DOMContentLoaded', async () => {
  await autoFill();
  displayProducts(); // display products in the checkout cart
  updateOrderSummary(); // initialize for order summary
});