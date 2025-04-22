document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const termsChecked = document.getElementById("terms").checked;
  
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
  
    if (!termsChecked) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
  
    // Save email and password to localStorage
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
  
    alert("Registration successful!");
  
    // Redirect to login page
    window.location.href = "login.html";
  });
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
  
    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      gender: gender,
      password: document.getElementById("password").value,
      regDate: new Date().toISOString().split('T')[0],
    };
  
    localStorage.setItem("chanUser", JSON.stringify(user));
    localStorage.setItem("userName", `${firstName} ${lastName}`);
    localStorage.setItem("userEmail", email);
    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
  
  });
