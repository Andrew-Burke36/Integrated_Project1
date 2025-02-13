// This is to handle the settings page 

// handles profile username, email and etc.
document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveBtn");

  if (saveBtn) {
    saveBtn.addEventListener("click", async function (event) {
      event.preventDefault();

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const username = document.getElementById("profileName").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const apiKey = "67a8b8d899fb601fa5e983eb";
      const databaseUrl = `https://integratedproject-feca.restdb.io/rest/customerinfo/${userId}`;

      const updatedData = {
        name: username,
        phone: phone,
        email: email,
        password: password,
      };

      try {
        const response = await fetch(databaseUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": apiKey,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    });
  }
});

// handles the address book stuff
document.addEventListener("DOMContentLoaded", function () {
  const addressBtn = document.getElementById("updateaddressBtn");

  if (addressBtn) {
    addressBtn.addEventListener("click", async function (event) {
      event.preventDefault();

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const street = document.getElementById("street").value;
      const city = document.getElementById("city").value;
      const postal = document.getElementById("postal").value;
      const apiKey = "67a8b8d899fb601fa5e983eb";
      const databaseUrl = `https://integratedproject-feca.restdb.io/rest/customerinfo/${userId}`;

      const updatedData = {
        street: street,
        city: city,
        postal: postal,
      };

      try {
        const response = await fetch(databaseUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": apiKey,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert("Address book updated successfully!");
          document.getElementById("street").value = "";
          document.getElementById("city").value = "";
          document.getElementById("postal").value = "";

        } else {
          alert("Failed to update address book.");
        }
      } catch (error) {
        console.error("Error updating address book:", error);
      }
    });
  }
});

// handles payment options
document.addEventListener("DOMContentLoaded", function () {
  const paymentBtn = document.getElementById("savepaymentBtn");

  if (paymentBtn) {
    paymentBtn.addEventListener("click", async function (event) {
      event.preventDefault();

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const card = document.getElementById("card").value;
      const cvv = document.getElementById("cvv").value;
      const month = document.getElementById("month").value;
      const apiKey = "67a8b8d899fb601fa5e983eb";
      const databaseUrl = `https://integratedproject-feca.restdb.io/rest/customerinfo/${userId}`;

      const updatedData = {
        card: card,
        cvv: cvv,
        month: month,
      };

      try {
        const response = await fetch(databaseUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": apiKey,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert("Card information updated successfully!");
          document.getElementById("card").value = "";
          document.getElementById("cvv").value = "";
          document.getElementById("month").value = "";

        } else {
          alert("Failed to update card information.");
        }
      } catch (error) {
        console.error("Error updating card information:", error);
      }
    });
  }
});

// loads the users orders into their order history
async function OrderHistoryretrieve() {
  const apiKey = "67a8b8d899fb601fa5e983eb";
  const customerOrderDB = `https://integratedproject-feca.restdb.io/rest/orderhistory`;

  try {
    const response = await fetch(customerOrderDB, {
      method: 'GET',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const orderDetails = await response.json();
    return orderDetails;
    
  } catch (error) {
    console.error('erorr loading item');
  }
};


async function OrderHistoryLoader() {
  const orderDetails = await OrderHistoryretrieve();
  const orderHistoryTable = document.querySelector('#orderHistory');
  const usersessionID = localStorage.getItem('userId');
  const orderuserID = orderDetails[0].userID;

  if (orderuserID === usersessionID) {
    orderDetails.forEach(order => {
      const orderRow = document.createElement('tr');
      orderRow.innerHTML = `
        <td>#${order.orderNumber}</td>
        <td>${order.orderDate}</td>
        <td>${order.quantity}</td>
        <td><span class="badge bg-warning">Processing</span></td>
      `;
      orderHistoryTable.appendChild(orderRow);
    });
  } else {
    console.log('no orders found');
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await OrderHistoryretrieve();
  OrderHistoryLoader();
});
