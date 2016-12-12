<?php
	include_once("../classes/class.users.php");
	$post = file_get_contents("php://input");
	$signUpData = json_decode($post);
	$obj = new users();
	$data = $obj->signUp($signUpData);


 ?>
