<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$host = "127.0.0.1";
$user = "root"; 
$password = "";
$database = "tentativaB1";  // ALTERADO AQUI

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexão falhou: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");
?>