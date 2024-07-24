<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin:http://localhost:3000/Register");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "esier";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $data->name;
  $email = $data->email;
  $password = password_hash($data->password, PASSWORD_BCRYPT);

  
  $sql = "SELECT * FROM users WHERE email = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
  } else {
    
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
      echo json_encode(["success" => true, "message" => "Registration successful"]);
    } else {
      echo json_encode(["success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
  }

  $stmt->close();
  $conn->close();
} else {
  echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
