<?php

include 'config.php';

// Create connection ('mysql' as placeholder password)
$conn = mysqli_connect($config['hostname'], $config['user'], $config['pass'], $config['db']);
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

