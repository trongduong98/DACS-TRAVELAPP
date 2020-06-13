<?php
// Nhận dữ liệu gửi lên từ React Native
$json = file_get_contents('php://input');
$obj = json_decode($json, TRUE);
// Kiểm tra tính hợp lệ của dữ liệu
if (!isset($obj['phone']) || $obj['phone'] == '') {
 $result = [
 'error' => 'Vui lòng nhập số điện thoại',
 ];
 echo json_encode($result);
 return;
}
$fullName = $obj['fullName'];
$phone = $obj['phone'];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travelapp";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}
// Thực thi SQL lưu vào database
$sql = "INSERT INTO `bill_tour` (`id`, `fullName`, `phone`) VALUES
(NULL, '" . $fullName . "', '" . $phone . "');";
$conn->query($sql);
$conn->close();
$result = [
 'fullName' => $fullName,
 'phone' => $phone,
];
echo json_encode($result);
?>