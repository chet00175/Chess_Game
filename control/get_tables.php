<?php

// Create connection
$conn = mysqli_connect('localhost', 'root', 'mysql', 'chess_game');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$num = $_POST['n'];
$table = 'table' . $num;

$getTable = "SELECT * FROM $table;";

$result = mysqli_query($conn, $getTable);

$rows = array();
while ($row = mysqli_fetch_array($result)) {
    $rows[] = $row;
}

print(json_encode($rows));

mysqli_close($conn);

?> 

