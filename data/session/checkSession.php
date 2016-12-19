<?php session_start();

	if (isset($_SESSION['status'])) {
	 	# code...
	 	$userdata = array('status'=>$_SESSION['status'],'email'=>$_SESSION['email']
	 		,'id'=>$_SESSION['user_plexus_id'],'name'=>$_SESSION['f_name']." ".$_SESSION['l_name']);
	 	echo(json_encode($userdata));
	 }
	 else{
	 	echo "";
	 }

 ?>
