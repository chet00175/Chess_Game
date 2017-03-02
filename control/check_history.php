<?php

include 'config.php';

// Create connection
$conn = mysqli_connect($config['hostname'], $config['user'], $config['pass'], $config['db']);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$getcount = "SELECT COUNT(*) FROM games;";

$result = mysqli_query($conn, $getcount);
$final = mysqli_fetch_array($result);

if ($final[0] == 0) {
	print("false");
}
else {
	print("true");
}

mysqli_close($conn);

?> 

