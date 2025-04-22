// Login form logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");
    const storedName = localStorage.getItem("registeredName");
  
    if (email === storedEmail && password === storedPassword) {
      // Save logged-in user name
      localStorage.setItem("loggedInUser", storedName || "User");
  
      alert("Login successful!");
  
      // Redirect to profile page
      window.location.href = "updateuser.html";
    } else {
      document.getElementById("message").textContent = "Invalid email or password.";
    }
  });
  
  // Forgot password - show reset section with OTP
  document.getElementById("forgotLink").addEventListener("click", function () {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("resetSection").style.display = "block";
  
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById("otpDisplay").textContent = generatedOTP;
    document.getElementById("otpArea").style.display = "block";
  });
  
  // Back to login section
  document.getElementById("backToLogin").addEventListener("click", function () {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("resetSection").style.display = "none";
    document.getElementById("otpArea").style.display = "none";
  });
  
  // OTP logic
  let generatedOTP = null;
  
  document.getElementById("resetForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const enteredOTP = document.getElementById("otp").value;
    const newPassword = document.getElementById("newPassword").value;
  
    if (enteredOTP === generatedOTP) {
      localStorage.setItem("registeredPassword", newPassword);
      alert("Password successfully reset!");
      document.getElementById("backToLogin").click();
    } else {
      alert("Invalid OTP.");
    }
  });
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const storedUser = JSON.parse(localStorage.getItem("chanUser"));
  
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      alert("Login successful!");
      window.location.href = "updateuser.html";
    } else {
      alert("Invalid credentials");
    }
  });
  const adminUser = {
    firstName: "Admin",
    lastName: "User",
    email: "admin@gmail.com",
    password: "admin123",
    isAdmin: true
  };
  
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(u => u.email === adminUser.email);
  if (!exists) {
    users.push(adminUser);
    localStorage.setItem("users", JSON.stringify(users));
  }