<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$username = "root";
$password = "suba";
$dbname = "hospital_bd";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("<h3 style='color:red;'>❌ Connection failed: " . $conn->connect_error . "</h3>");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $age = intval($_POST['age']);
    $gmail = filter_var(trim($_POST['gmail']), FILTER_SANITIZE_EMAIL);
    $symptoms = htmlspecialchars(trim($_POST['symptoms']));
    $medication = htmlspecialchars(trim($_POST['medication']));
    $new_patient = isset($_POST['new_patient']) ? 1 : 0;
    $last_checkup = !$new_patient && !empty($_POST['last_checkup']) ? $_POST['last_checkup'] : null;

    $appointment_booked = isset($_POST['appointment_booked']) && $_POST['appointment_booked'] === 'yes' ? 1 : 0;
    $appointment_date = $appointment_booked && !empty($_POST['appointment_date']) ? $_POST['appointment_date'] : null;

    // Prepare SQL
    if ($new_patient && !$appointment_booked) {
        $sql = "INSERT INTO patient_report (name, age, gmail, symptoms, medication, new_patient, appointment_booked)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisssii", $name, $age, $gmail, $symptoms, $medication, $new_patient, $appointment_booked);

    } elseif ($new_patient && $appointment_booked) {
        $sql = "INSERT INTO patient_report (name, age, gmail, symptoms, medication, new_patient, appointment_booked, appointment_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisssiss", $name, $age, $gmail, $symptoms, $medication, $new_patient, $appointment_booked, $appointment_date);

    } elseif (!$new_patient && !$appointment_booked) {
        $sql = "INSERT INTO patient_report (name, age, gmail, symptoms, medication, new_patient, last_checkup, appointment_booked)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sissssis", $name, $age, $gmail, $symptoms, $medication, $new_patient, $last_checkup, $appointment_booked);

    } else {
        $sql = "INSERT INTO patient_report (name, age, gmail, symptoms, medication, new_patient, last_checkup, appointment_booked, appointment_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sissssiss", $name, $age, $gmail, $symptoms, $medication, $new_patient, $last_checkup, $appointment_booked, $appointment_date);
    }

    // Execute and show JS alert + redirect
    if ($stmt->execute()) {
        echo "<script>
                alert('✅ Report submitted successfully!');
                window.location.href = 'history.html';
              </script>";
    } else {
        echo "<h3 style='color:red;'>❌ Error: " . $stmt->error . "</h3>";
    }

    $stmt->close();
}

$conn->close();
?>
