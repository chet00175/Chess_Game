<?php

include 'config.php';

// Create connection ('mysql' as placeholder password)
$conn = mysqli_connect($config['hostname'], $config['user'], $config['pass']);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Remove old data (by dropping the database)
$remove_db = "DROP DATABASE IF EXISTS chess_game";

mysqli_query($conn, $remove_db);

// Create new database.
$create_db = "CREATE DATABASE chess_game";

mysqli_query($conn, $create_db);

$create_game = "create table chess_game.games (
	gameid int auto_increment primary key,
	table_name varchar(50)
);";

mysqli_query($conn, $create_game);

mysqli_close($conn);

?>