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
if (isset($_POST["idEstudiante"]) && isset($_POST["idExperiencia"]) && isset($_POST["FechaIngreso"]) && isset($_POST["FechaSalida"]) && isset($_POST["Cargo"]) && isset($_POST["NombreEmpresa"]) && isset($_POST["Logros"]))
{
  $idEst= $_POST["idEstudiante"];
  $idExperiencia=  $_POST["idExperiencia"];
  $fechaIngreso=  $_POST["FechaIngreso"];
  $fechaSalida=  $_POST["FechaSalida"];
  $cargo=  $_POST["Cargo"];
  $nombreEmpresa=  $_POST["NombreEmpresa"];
  $logros=  $_POST["Logros"];
  
	/*$result = mysqli_query($conn,"update experiencia set fecha_ingreso=".$fechaIngreso.", fecha_salida=".$fechaSalida.", cargo=".$cargo.",nombreEmpresa=".$nombreEmpresa.",logros=".$logros." where id_experiencia=".$idExperiencia);*/

	$result = mysqli_query($conn,"update experiencia set fecha_ingreso='".$fechaIngreso."', fecha_salida='".$fechaSalida."', cargo='".$cargo."',nobre_empresa='".$nombreEmpresa."',logros='".$logros."' where id_experiencia=".$idExperiencia);

    echo "update experiencia set fecha_ingreso='".$fechaIngreso."', fecha_salida='".$fechaSalida."', cargo='".$cargo."',nobre_empresa='".$nombreEmpresa."',logros='".$logros."' where id_experiencia=".$idExperiencia;
	echo "Los datos del Id Experiencia ".$idExperiencia." del Estudiante ".$idEst." se Actualizaron";
} 
else 
{
  $idEst = null;
  $idExperiencia = null;
  $fechaIngreso=  null;
  $fechaSalida=  null;
  $cargo=  null;
  $nombreEmpresa=  null;
  $logros=  null;
  echo "no envio el datos a actualizar del estudiante";
}



mysqli_close($conn);


?>