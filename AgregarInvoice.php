<?php

include 'connection.php';
$variable;
$numCustomer = $_POST['numCustomer'];
$trafic = $_POST['trafic'];
$invoiceDate = $_POST['invoiceDate'];
$description = $_POST['description'];
$created = $_POST['created'];

$query = "INSERT INTO INVOICE(Num_Customer,Invoice_Date,Traffic,Description,Created_By)VALUES('$numCustomer','$invoiceDate','$trafic','$description','$created')";
$exec = sqlsrv_query($conn,$query);

if($exec){
  echo 'Insertado';
}
else{
    echo 'error';
}
?>