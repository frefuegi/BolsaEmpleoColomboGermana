<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {  
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 80');   
}  
  
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))  
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))  
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
}  
$servername = "localhost";
$username = "id1038231_admin";
$password = "colombo";
$dbname = "id1038231_bolsa";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo (string)$conn;
if (isset($_POST["idEstudiante"])  && isset($_POST["nombreRef"]) && isset($_POST["telefonoRef"]) && isset($_POST["cargoRef"]))
{
  $idEstudiante = $_POST["idEstudiante"];
  $nombreRef=  $_POST["nombreRef"];
  $telefonoRef=  $_POST["telefonoRef"];
  $cargoRef=  $_POST["cargoRef"];

	$result = mysqli_query($conn,"INSERT INTO referencia (id_estudiante, nombre_ref, telefono_ref, cargo_ref) VALUES (".$idEstudiante.",'".$nombreRef."','".$telefonoRef."','".$cargoRef."')");

	
	echo "Los datos del Estudiante ".$idEstudiante." se Insertaron";
} 
else 
{
  $idEstudiante = null;
  $idEstudiante = null;
  $nombreRef= null;
  $telefonoRef= null;
  $cargoRef= null;
  echo "no envio el datos a actualizar del estudiante";
}



mysqli_close($conn);


?>