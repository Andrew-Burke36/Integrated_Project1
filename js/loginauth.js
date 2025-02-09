/* Login System */
document.getElementById("login-form").onsubmit = function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");

    const apiKey = "67a8b8d899fb601fa5e983eb";
    const databaseURL = "https://integratedproject-feca.restdb.io/rest/customerinfo";

    if (!email || !password) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please fill in both email and password!";
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

        const user= data[0];
        if (data.length > 0) {
            const storedPassword = data[0].password;

            if (storedPassword === password) {
                localStorage.setItem("loggedIN", "true");  
                localStorage.setItem('userId', user._id);

                alert("Login successful!");
                window.location.href = "index.html";
            } else {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Incorrect password!";
            }
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Email not found!";
        }
    })
    .catch(error => {
        console.error("Error logging in:", error);
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error logging in!";
    });
};

