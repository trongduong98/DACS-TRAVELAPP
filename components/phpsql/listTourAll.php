<?php
// Thông tin kết nối
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travelapp";
// Tạo kết nối đến cơ sở dữ liệu
$conn = new mysqli($servername, $username, $password, $dbname);
// Kiểm tra kết nối
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM tour_app";
$result = $conn->query($sql);
// Chuẩn bị mảng rỗng
$tours = [];
$images = [];
if ($result->num_rows > 0) {
 // Lần lượt đổ dữ liệu lấy được từ cơ sở dữ liệu vào mảng
 while ($row = $result->fetch_assoc()) {
     $review = explode(',', $row['review']);
     $image1 = (count($review) > 0) ? $review[0] : null ;
     $image2 = (count($review) > 1) ? $review[1] : null ;
     $image3 = (count($review) > 2) ? $review[2] : null ;
     $image4 = (count($review) > 3) ? $review[3] : null ;
     $image5 = (count($review) > 4) ? $review[4] : null ;
     $image6 = (count($review) > 5) ? $review[5] : null ;
     $images = array(
         $image1,
         $image2,
         $image3,
         $image4,
         $image5,
         $image6,
     );
    $tours[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'price' => $row['price'],
        'imageBackground' => $row['imageBackground'],
        'images' => $images,
        'description' => $row['description'],
        'created' => $row['created_at'],
        'updated' => $row['updated_at'],
        'deleted' => $row['deleted_at'],
    );
 }
} else {
 echo "0 results";
}
$conn->close();
// Xuất kết quả Json
echo json_encode($tours);
?>