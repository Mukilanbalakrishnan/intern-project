
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin:http://localhost:3000/Login");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $data->username;
  $password = $data->password;

  $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $password);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Login successful"]);
  } else {
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
  }

  $stmt->close();
  $conn->close();
} else {
  echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
