<?php
   include 'connection.php';

   $query = "SELECT * FROM Customer";

   $consulta =  sqlsrv_query($conn,$query);

   $respuesta = [];
	
	while($fila =sqlsrv_fetch_array($consulta)){
		$customer = [
			'Id' 		=> $fila['Id'],
			'Name' 	=> $fila['Name'],
			'Location' => $fila['Location'],
			'RFC'		=> $fila['RFC'],
            'Carrier'		=> $fila['Carrier'],
            'Pro_No'		=> $fila['Pro_No'],
            'Equipment_No'		=> $fila['Equipment_No']
		];
		array_push($respuesta, $customer);
    }
    
    echo json_encode($respuesta);
?>