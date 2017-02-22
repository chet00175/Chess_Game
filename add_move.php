<?php

// Create connection
$conn = mysqli_connect('localhost', 'root', 'mysql', 'chess_game');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$get_table = "SELECT table_name FROM games where gameid=(SELECT MAX(gameid) FROM games);";

$result = mysqli_query($conn, $get_table);
$final = mysqli_fetch_array($result);

$tablename = $final[0];

$s_x = $_POST['startX'];
$s_y = $_POST['startY'];
$e_x = $_POST['endX'];
$e_y = $_POST['endY'];

$insert_move = "INSERT INTO $tablename (start_x, start_y, end_x, end_y)
VALUES ($s_x, $s_y, $e_x, $e_y)";

mysqli_query($conn, $insert_move);

mysqli_close($conn);

?> 

