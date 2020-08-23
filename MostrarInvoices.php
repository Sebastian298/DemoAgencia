<?php
    function Consulta(){
       include 'connection.php';

       $query = "SELECT * FROM INVOICE";

       $consulta =  sqlsrv_query($conn,$query);
 
       $respuesta = [];
        
        while($fila = sqlsrv_fetch_array($consulta)){
            $customer = [
                'Num_Invoice'  => $fila['Num_Invoice'],
                'Num_Customer' => $fila['Num_Customer'],
                'Invoice_Date' => date_format($fila['Invoice_Date'],"Y/m/d"),
                'Traffic'	   => $fila['Traffic'],
                'Description'  => $fila['Description'],
                'Created_By'   => $fila['Created_By']
            ];
            array_push($respuesta, $customer);
        }
     
        echo json_encode($respuesta);
    }

    Consulta();
?>