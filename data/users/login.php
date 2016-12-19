<?php
	include_once("../classes/class.users.php");
	$post = file_get_contents("php://input");
	$userData = json_decode($post);
	$obj = new users();
	$data = $obj->login($userData);
 ?>
