<?php
   include 'connection.php';
   
     $query = "SELECT * FROM Customer";
   
   $consulta =  sqlsrv_query($conn,$query);

   $respuesta = [];
	
	while($fila =sqlsrv_fetch_array($consulta)){
		$customer = [
			'Id' 		=> $fila['Id']
		];
		array_push($respuesta, $customer);
    }
    
    echo json_encode($respuesta);
?>