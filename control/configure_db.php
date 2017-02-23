<?php

// Create connection ('mysql' as placeholder password)
$conn = mysqli_connect('localhost', 'root', 'mysql');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Remove old data (by dropping the database)
$remove_db = "DROP DATABASE chess_game";

mysqli_query($conn, $remove_db);

// Create new database.
$create_db = "CREATE DATABASE chess_game";

mysqli_query($conn, $create_db);

mysqli_close($conn);

?>