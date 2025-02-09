/* Signup System */
document.getElementById("signup-form").onsubmit = function (event) {
        event.preventDefault();
    
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const errorMessage = document.getElementById("signup-error-message");
    
        const apiKey = "67a8b8d899fb601fa5e983eb";
        const databaseURL = "https://integratedproject-feca.restdb.io/rest/customerinfo";
    
        if (!name || !email || !password) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "All fields are required!";
            return;
        }
    
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
            if (data.length > 0) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Email already in use!";
            } else {
                fetch(databaseURL, {
                    method: "POST",
                    headers: {
                        "x-apikey": apiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password })
                })
                .then(response => {
                    if (response.ok) {
                        alert("Signup successful! You can now log in.");
                        window.location.href = "loginpage.html";
                    } else {
                        errorMessage.style.display = "block";
                        errorMessage.textContent = "Signup failed! Try again.";
                    }
                })
                .catch(error => {
                    console.error("Error signing up:", error);
                    errorMessage.style.display = "block";
                    errorMessage.textContent = "Error signing up!";
                });
            }
        })
        .catch(error => {
            console.error("Error checking email:", error);
            errorMessage.style.display = "block";
            errorMessage.textContent = "Error checking email!";
        });
    };
    
