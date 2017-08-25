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
if (isset($_POST["idOferta"])  && isset($_POST["idEmpresa"])  && isset($_POST["nombrePrincipal"]) && isset($_POST["descripcion"]) && isset($_POST["fechaInicio"]) &&
    isset($_POST["fechaFin"])  && isset($_POST["prioridad"]) && isset($_POST["idCarrera"]) && isset($_POST["salario"]) && isset($_POST["condiciones"]))
{
  $idOferta=$_POST["idOferta"];
  $idEmpresa = $_POST["idEmpresa"];
  $nombrePrincipal=  $_POST["nombrePrincipal"];
  $descripcion=  $_POST["descripcion"];
  $fechaInicio=  $_POST["fechaInicio"];
  $fechaFin = $_POST["fechaFin"];
  $prioridad=  $_POST["prioridad"];
  $idCarrera=  $_POST["idCarrera"];
  $salario=  $_POST["salario"];
  $condiciones=  $_POST["condiciones"];


	$result = mysqli_query($conn,"update oferta set id_empresa='".$idEmpresa."', nombre_principal='".$nombrePrincipal."',descripcion='".$descripcion."', fecha_inicio='".$fechaInicio."', fecha_fin='".$fechaFin."',prioridad='".$prioridad."', id_carrera='".$idCarrera."',salario='".$salario."',condiciones='".$condiciones."' where id_oferta=".$idOferta);

		
	echo "Los datos del Id Oferta ".$idOferta." de la Empresa ".$idEmpresa." se Actualizaron";
} 
else 
{
  $idOferta = null;
  $idEmpresa = null;
  $nombrePrincipal= null;
  $descripcion= null;
  $fechaInicio=  null;
  $fechaFin = null;
  $prioridad=  null;
  $idCarrera=  null;
  $salario=  null;
  $condiciones=  null;
  echo "no envio el datos a actualizar de la oferta";
}



mysqli_close($conn);


?>