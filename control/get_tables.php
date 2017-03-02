<?php

include 'config.php';

// Create connection ('mysql' as placeholder password)
$conn = mysqli_connect($config['hostname'], $config['user'], $config['pass'], $config['db']);
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

