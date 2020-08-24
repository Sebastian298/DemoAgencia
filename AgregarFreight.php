<?php

include 'connection.php';
$variable;
$numCustomer = $_POST['numCustomer'];
$invoice = $_POST['numInvoice'];
$trafic = $_POST['numTrafic'];
$shiper = $_POST['shipper'];
$pick = $_POST['pick'];
$consigne = $_POST['consigne'];
$delivery = $_POST['delivery'];
$request = $_POST['request'];
$creator = $_POST['creator'];

$query = "INSERT INTO FreightLoad(Num_Customer,Id_Invoice,Num_Traffic,Shipper,Pick_Date,Consigne,Delivery_Date,Request_Date,Created_By)
VALUES('$numCustomer','$invoice','$trafic','$shiper','$pick','$consigne','$delivery','$request','$creator')";
$exec = sqlsrv_query($conn,$query);

if($exec){
  echo 'Insertado';
}
else{
    echo 'error';
}
?>