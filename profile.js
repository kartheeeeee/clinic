window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  // Fill in profile data
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("regDate").textContent = user.regDate || "N/A";
  document.getElementById("updateDate").textContent = user.updateDate || user.regDate || "N/A";

  document.getElementById("userName").value = `${user.firstName} ${user.lastName}`;
  document.getElementById("address").value = user.address;
  document.getElementById("city").value = user.city;
  document.getElementById("gender").value = user.gender;
  document.getElementById("email").value = user.email;

  // ✅ Store name/email for use in other pages
  localStorage.setItem("userName", `${user.firstName} ${user.lastName}`);
  localStorage.setItem("userEmail", user.email);

  // Edit and Save buttons
  const form = document.getElementById("profileForm");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  editBtn.addEventListener("click", () => {
    form.querySelectorAll("input:not([id='userName']):not([id='email']), textarea").forEach(el => el.disabled = false);
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    user.address = document.getElementById("address").value;
    user.city = document.getElementById("city").value;
    user.gender = document.getElementById("gender").value;
    user.updateDate = new Date().toISOString().split('T')[0];

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("chanUser", JSON.stringify(user));

    alert("Profile updated!");
    document.getElementById("updateDate").textContent = user.updateDate;
    form.querySelectorAll("input, textarea").forEach(el => el.disabled = true);
    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";
  });
});
