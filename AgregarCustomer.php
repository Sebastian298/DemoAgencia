<?php

include 'connection.php';

$Name = $_POST['Name'];
$Location = $_POST['Location'];
$RFC = $_POST['RFC'];
$Carrier = $_POST['Carrier'];
$Pro_No = $_POST['Pro_No'];
$Equipment = $_POST['Equipment'];

$query = "INSERT INTO Customer(Name,Location,RFC,Carrier,Pro_No,Equipment_No)VALUES('$Name','$Location','$RFC','$Carrier','$Pro_No','$Equipment')";
$exec = sqlsrv_query($conn,$query);

if($exec){
  echo 'Insertado';
}
else{
    echo 'Error';
}
?>