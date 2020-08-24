<?php
   include 'connection.php';

   $variable = $_POST['parametro'];
   
   if(empty($variable)){
      $query = "SELECT * FROM Customer";
     
   } else{
      
      $query = "SELECT * FROM Customer 
      WHERE Location LIKE '%$variable%' OR Name LIKE '%$variable%'OR RFC LIKE '%$variable%'OR Carrier LIKE '%$variable%'OR Pro_No LIKE '%$variable%'OR Equipment_No LIKE '%$variable%'";
   }
   
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