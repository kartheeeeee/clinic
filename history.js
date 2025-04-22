document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const container = document.getElementById("appointmentDetails");

  if (!user) {
    container.innerHTML = "<p>Please log in to view appointments.</p>";
    return;
  }

  const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const appointmentsToShow = user.isAdmin
    ? allAppointments
    : allAppointments.filter(app => app.email === user.email);

  if (appointmentsToShow.length === 0) {
    container.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  // Create table element
  const table = document.createElement("table");
  table.className = "appointment-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Department</th>
        <th>Doctor</th>
        <th>Name</th>
        <th>Email</th>
        <th>Purpose</th>
        <th>Date</th>
        <th>Time</th>
        <th>Fees</th>
      </tr>
    </thead>
    <tbody>
      ${appointmentsToShow.map(app => `
        <tr>
          <td>${app.department || 'N/A'}</td>
          <td>${app.doctorName || 'N/A'}</td>
          <td>${app.name || 'N/A'}</td>
          <td>${app.email || 'N/A'}</td>
          <td>${app.purpose || 'N/A'}</td>
          <td>${app.date || 'N/A'}</td>
          <td>${app.time || 'N/A'}</td>
          <td>₹${app.fees || '0'}</td>
        </tr>
      `).join("")}
    </tbody>
  `;

  container.appendChild(table);
});


