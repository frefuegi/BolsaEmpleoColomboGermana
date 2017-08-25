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
if (isset($_POST["idEmpresa"])  && isset($_POST["nombre"]) && isset($_POST["direccion"]) && isset($_POST["telefono"]) &&
    isset($_POST["celularContacto"])  && isset($_POST["nombreContacto"]) && isset($_POST["apellidoContacto"]) && isset($_POST["cargoContacto"]) && isset($_POST["descripcion"]))
{
  $idEm = $_POST["idEmpresa"];
  $nombre= $_POST["nombre"];
  $direccion=  $_POST["direccion"];
  $telefono=  $_POST["telefono"];
  $celularContacto=  $_POST["celularContacto"];
  $nombreContacto = $_POST["nombreContacto"];
  $apellidoContacto=  $_POST["apellidoContacto"];
  $cargoContacto=  $_POST["cargoContacto"];
  $descripcion=  $_POST["descripcion"];
	

$result = mysqli_query($conn,"update empresa set nombre='".$nombre."', direccion='".$direccion."',telefono='".$telefono."',celular_contacto='".$celularContacto."',nombre_contacto='".$nombreContacto."',apellido_contacto='".$apellidoContacto."',cargo_contacto='".$cargoContacto."', apellido_contacto='".$apellidoContacto."',descripcion='".$descripcion."' where id_empresa=".$idEm);

		echo "Los datos de la Empresa ".$idEm." se Actualizaron";
} 
else 
{
  $idEm = null;
  $nombre= null;
  $direccion=  null;
  $telefono=  null;
  $celularContacto=  null;
  $nombreContacto = null;
  $apellidoContacto=  null;
  $cargoContacto=  null;
  $descripcion=  null;
  echo "no envio el datos para actualizar la empresa";
}



mysqli_close($conn);


?>