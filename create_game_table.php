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

$tablename = 'table' . $final[0];

$games_insert = "INSERT INTO games (table_name)
VALUES ('$tablename');";

mysqli_query($conn, $games_insert);

$create_game = "CREATE TABLE $tablename (
	moveid int auto_increment primary key,
	start_x int,
	start_y int,
	end_x int,
	end_y int
);";

mysqli_query($conn, $create_game);

mysqli_close($conn);

?> 

