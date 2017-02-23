<?php

// Create connection
$conn = mysqli_connect('localhost', 'root', 'mysql', 'chess_game');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$getcount = "SELECT COUNT(*) FROM games;";

$result = mysqli_query($conn, $getcount);
$final = mysqli_fetch_array($result);

print($final[0]);

mysqli_close($conn);

?> 

