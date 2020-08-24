<?php
$variable;
$serverName = "localhost"; //serverName\instanceName
$connectionInfo = array( "Database"=>"Agency", "UID"=>"sa", "PWD"=>"imaginate48");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
?>