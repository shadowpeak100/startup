function login() {
    var username = document.getElementById("usernameInput").value;
    localStorage.setItem("userName", username);

    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.textContent = "Hello, " + username;
    }
}

function toggleLoginBox() {
    var loginBox = document.getElementById("loginBox");
    if (loginBox.style.display === "none") {
        loginBox.style.display = "block";
    } else {
        loginBox.style.display = "none";
    }
}

window.onload = function() {
    var userName = localStorage.getItem('userName');

    if (userName) {
        var loginButton = document.getElementById("loginButton");
        if (loginButton) {
            loginButton.textContent = "Welcome, " + userName;
        }
    }
};