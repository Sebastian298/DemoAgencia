<?php
   include 'connection.php';
   
   $var;
   $variable = $_POST['parametro'];
   
   if(empty($variable)){
      $query = "SELECT * FROM FreightLoad";
   } else{ 
      $query = "SELECT * FROM FreightLoad 
      WHERE Consigne LIKE '%$variable%' OR Shipper LIKE '%$variable%' 
      OR Pick_Date Like '%$variable%' OR Delivery_Date LIKE '%$variable%' OR Request_Date LIKE '%$variable%'";
   }
   
   $consulta =  sqlsrv_query($conn,$query);

   $respuesta = [];


    while($fila = sqlsrv_fetch_array($consulta)){
        $customer = [
            'Num_Order'  => $fila['Num_Order'],
            'Num_Customer' => $fila['Num_Customer'],
            'Id_Invoice'	   => $fila['Id_Invoice'],
            'Num_Traffic'	   => $fila['Num_Traffic'],
            'Shipper'	   => $fila['Shipper'],
            'Pick_Date' => date_format($fila['Pick_Date'],"Y-m-d"),
            'Consigne'	   => $fila['Consigne'],
            'Delivery_Date' => date_format($fila['Delivery_Date'],"Y-m-d"),
            'Request_Date' => date_format($fila['Request_Date'],"Y-m-d"),
            'Created_By'   => $fila['Created_By'],
            'Created_at' => date_format($fila['Created_at'],"Y-m-d")
        ];
        array_push($respuesta, $customer);
    }
 
    echo json_encode($respuesta);
?>