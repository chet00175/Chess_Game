<?php

// Create connection
$conn = mysqli_connect('localhost', 'root', 'mysql', 'chess_game');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$create_game = "create table games (
	gameid int auto_increment primary key,
	table_name varchar(50)
);";

mysqli_query($conn, $create_game);

mysqli_close($conn);

?> 

