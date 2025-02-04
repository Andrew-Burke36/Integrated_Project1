/* Shop page */
/* Filter button */
const FilterButtons = document.querySelectorAll(".filter-options button");
const FilterableCards = document.querySelectorAll(".items .card");

const FilterCards = e => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        
        FilterableCards.forEach( card => {
                card.classList.add('hide');

                if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all") {
                        card.classList.remove("hide")
                }
        });
};

FilterButtons.forEach(button => button.addEventListener("click", FilterCards));

/* Quantity updater */
function changeQuantity(amount) {
        const quantityInput = document.getElementById("product-quantity");
        let currentValue = parseInt(quantityInput.value);
        currentValue = Math.max(1, currentValue + amount);
        quantityInput.value = currentValue;
    };

/* Signup and Login system */
/*document.getElementById("signup-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const apiKey = "67a1bf53c5f8d4c695e4d4f7"; // API Key
        const databaseURL = 'https://integratedproject-feca.restdb.io/rest/customerinfo';

        try {
                const response = await fetch(databaseURL, {
                    method: 'POST',
                    headers: {
                        'x-apikey': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
        
                if (response.ok) {
                    alert('Signup successful! You can now log in.');
                    window.location.href = 'loginpage.html';
                } else {
                    document.getElementById('error-message').style.display = 'block';
                }
            } catch (error) {
                console.error('Error signing up:', error);
            }
        
});
*/
document.getElementById("login-form").onsubmit = function (event) {
        event.preventDefault(); // Prevent page reload
    
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const apiKey = "67a1bf53c5f8d4c695e4d4f7"; // Replace with your actual API Key
        const databaseURL = "https://integratedproject-feca.restdb.io/rest/customerinfo";
    
        // Fetch user data based on email
        fetch(`${databaseURL}?q={"email":"${email}"}`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
                "x-apikey": apiKey,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Fetched user data:", data);
    
            if (data.length > 0) {
                const storedPassword = data[0].password;
    
                if (storedPassword === password) {
                    alert("Login successful!");
                    window.location.href = "index.html"; // Redirect to homepage
                } else {
                    document.getElementById("error-message").style.display = "block";
                    document.getElementById("error-message").textContent = "Incorrect password!";
                }
            } else {
                document.getElementById("error-message").style.display = "block";
                document.getElementById("error-message").textContent = "Email not found!";
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
            document.getElementById("error-message").style.display = "block";
            document.getElementById("error-message").textContent = "Error logging in!";
        });
    };
    