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
if (isset($_POST["nombre"]) && isset($_POST["direccion"]) && isset($_POST["telefono"]) &&
    isset($_POST["celularContacto"])  && isset($_POST["nombreContacto"]) && isset($_POST["apellidoContacto"]) && isset($_POST["cargoContacto"]) && isset($_POST["descripcion"]))
{
  $nombre= $_POST["nombre"];
  $direccion=  $_POST["direccion"];
  $telefono=  $_POST["telefono"];
  $celularContacto=  $_POST["celularContacto"];
  $nombreContacto = $_POST["nombreContacto"];
  $apellidoContacto=  $_POST["apellidoContacto"];
  $cargoContacto=  $_POST["cargoContacto"];
  $descripcion=  $_POST["descripcion"];
  


	$result = mysqli_query($conn,"INSERT INTO empresa (nombre, direccion, telefono, celular_contacto, nombre_contacto, apellido_contacto, cargo_contacto, descripcion) VALUES ('".$nombre."','".$direccion."','".$telefono."','".$celularContacto."','".$nombreContacto."','".$apellidoContacto."','".$cargoContacto."','".$descripcion."')");

	
	echo "Los datos de la Empresa ".$nombre." se Insertaron";
} 
else 
{
  
  $nombre= null;
  $direccion=  null;
  $telefono=  null;
  $celularContacto=  null;
  $nombreContacto = null;
  $apellidoContacto=  null;
  $cargoContacto=  null;
  $descripcion=  null;
  echo "no envio el datos a insertar de la empresa";
}



mysqli_close($conn);


?>