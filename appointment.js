document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    document.getElementById("username").value = `${user.firstName} ${user.lastName}`;
    document.getElementById("userEmail").value = user.email;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const purpose = form.querySelector("input[placeholder='Purpose Of Appointment']").value.trim();
    const mobile = form.querySelector("input[placeholder='Mobile Number']").value.trim();
    const department = form.querySelector("select").value;
    const date = form.querySelector("input[type='date']").value;
    const time = form.querySelectorAll("select")[1].value;

    if (!purpose || !mobile || !department || !date || !time) {
      alert("Please fill all fields properly.");
      return;
    }

    const appointmentData = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      purpose,
      mobile,
      department,
      date,
      time,
      doctorName: "Dr. Ganesh",
      fees: "550"
    };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("✅ Appointment booked successfully!");

    // Ask user to upload report
    const goToUpload = confirm("Would you like to upload a report now?");
    if (goToUpload) {
      window.location.href = "patient_report.html";
    } else {
      window.location.href = "history.html";
    }
  });
});
