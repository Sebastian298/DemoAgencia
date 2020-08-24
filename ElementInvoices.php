<?php
   include 'connection.php';
   
     $variable;
     $query = "SELECT * FROM INVOICE";
   
   $consulta =  sqlsrv_query($conn,$query);

   $respuesta = [];
	
	while($fila =sqlsrv_fetch_array($consulta)){
		$customer = [
            'Num_Invoice' => $fila['Num_Invoice'],
            'Traffic' => $fila['Traffic']
		];
		array_push($respuesta, $customer);
    }
    
    echo json_encode($respuesta);
?>