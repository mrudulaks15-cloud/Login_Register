
// Get HTML elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

// Switch to Login
function showLoginForm() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
}

// Switch to Register
function showRegisterForm() {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
}

// Button events
loginTab.addEventListener("click", showLoginForm);
registerTab.addEventListener("click", showRegisterForm);

document.getElementById("showRegister").addEventListener("click", function(e) {
    e.preventDefault();
    showRegisterForm();
});

document.getElementById("showLogin").addEventListener("click", function(e) {
    e.preventDefault();
    showLoginForm();
});

// Get saved demo users
function getUsers() {
    return JSON.parse(localStorage.getItem("demoUsers") || "[]");
}

// Registration
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");

    message.className = "message";

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        message.classList.add("error");
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.classList.add("error");
        return;
    }

    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        message.textContent = "Email already registered!";
        message.classList.add("error");
        return;
    }

    // Save demo user
    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("demoUsers", JSON.stringify(users));

    message.textContent = "Registration successful! Please login.";
    message.classList.add("success");

    registerForm.reset();
});

// Login
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    message.className = "message";

    const users = getUsers();

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        message.textContent = "Login successful! Welcome, " + user.name;
        message.classList.add("success");
    } else {
        message.textContent = "Invalid email or password!";
        message.classList.add("error");
    }
});

// Show and hide password
document.querySelectorAll(".toggle-password").forEach(function(button) {
    button.addEventListener("click", function() {
        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
});
