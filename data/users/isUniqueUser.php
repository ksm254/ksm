<?php

	header("Content-Type: app/json; charset=UTF-8");
	$post = file_get_contents("php://input");
	$data = json_decode($post);
	include_once("../classes/class.users.php");
	$obj = new users();
	$obj->uniqueUser($data->email);

 ?> 
