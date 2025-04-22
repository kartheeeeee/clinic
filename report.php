<?php
// Connect to the database
$host = "localhost";
$db   = "hospital_bd";
$user = "root";
$pass = "suba";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->query("SELECT * FROM patient_report");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Patient Reports | Chan-care</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #f1f5f9;
    }

    .sidebar {
      width: 250px;
      background-color: #002c55;
      color: white;
      position: fixed;
      top: 0;
      bottom: 0;
      padding: 20px;
    }

    .sidebar h2 {
      font-size: 24px;
      margin-bottom: 30px;
      color: #60a5fa;
    }

    .sidebar a {
      display: block;
      margin: 15px 0;
      color: white;
      text-decoration: none;
    }

    .sidebar a:hover {
      color: #60a5fa;
    }

    .main {
      margin-left: 270px;
      padding: 40px;
    }

    .card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h1 {
      margin-bottom: 20px;
      font-size: 28px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background-color: #002c55;
      color: white;
      text-align: left;
      padding: 12px;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  </style>
</head>
<body>

<div class="sidebar">
  <h2>Chan-care</h2>
  <a href="updateuser.html">Profile Update</a>
 <a href="history.html">Appointment History</a>
  <a href="report.php">Patient Reports</a>
</div>

<div class="main">
  <div class="card">
    <h1>Patient Reports</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Symptoms</th>
          <th>Medication</th>
          <th>New Patient</th>
          <th>Last Checkup</th>
          <th>Appointment Booked</th>
          <th>Appointment Date</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $row): ?>
          <tr>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['age']) ?></td>
            <td><?= htmlspecialchars($row['gmail']) ?></td>
            <td><?= htmlspecialchars($row['symptoms']) ?></td>
            <td><?= htmlspecialchars($row['medication']) ?></td>
            <td><?= $row['new_patient'] ? 'Yes' : 'No' ?></td>
            <td><?= $row['last_checkup'] ?: 'N/A' ?></td>
            <td><?= $row['appointment_booked'] ? 'Yes' : 'No' ?></td>
            <td><?= $row['appointment_date'] ?: 'N/A' ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>

</body>
</html>
