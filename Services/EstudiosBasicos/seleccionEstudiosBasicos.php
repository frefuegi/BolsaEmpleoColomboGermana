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
//require_once("dbinfo.php");
//$conectar=mysql_connect("bolsaempleocolombo.000webhostapp.com","id1038231_admin","tutoria","id1038231_bolsa");
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

$result = mysqli_query($conn,"select * from estudios_basicos");

for($i=0;$row=mysqli_fetch_array($result);$i++){
	$return[$i]['idEstudio']=$row['id_estudio'];
	$return[$i]['idEstudiante']=$row['id_estudiante'];
	$return[$i]['FechaGrado']=$row['fecha_grado'];
	$return[$i]['titulo']=$row['titulo'];
	$return[$i]['institucion']=$row['institucion'];
	
}

echo json_encode($return);

mysqli_close($conn);


?>