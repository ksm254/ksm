<?php session_start();
	include_once("class.dbinfo.php");
	// include_once("../classes/class.crypto.php");

	/**
	* 	Name : Users
	*	Author : Rohan Purekar
	*	Date : 23/6/2016
	*	Version : 1.1
	*	Application : ---KSM Phase 1---
	*/
	/**

	*/

	class users {
		public function __construct(){
			global $dsn;
			global $user;
			global $password;

			try{
				$this->pdo = new PDO($dsn,$user,$password);
				$this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $e){
				echo 'Connection Failed'.$e->getMessage();
			}
		}
		public function signUp($data){

			$email = $data->email;
			$email = explode("@",$email);
			$email_pre = $email[0];
		    $email_suff = $email[1];
			$fname = ucfirst(strtolower($data->firstname));
			$lname = ucfirst(strtolower($data->lastname));

			$stmt = $this->pdo->prepare("INSERT INTO PM010001 (f_name,l_name,username_pre,username_suff,password) VALUES (:f_name,:l_name,:email_pre,:email_suff,:password) ");
			$stmt->bindParam(":f_name",$fname,PDO::PARAM_STR);
			$stmt->bindParam(":l_name",$lname,PDO::PARAM_STR);
			$stmt->bindParam(":email_pre",$email_pre,PDO::PARAM_STR);
			$stmt->bindParam(":email_suff",$email_suff,PDO::PARAM_STR);
			$stmt->bindParam(":password",$data->password,PDO::PARAM_STR);
			$stmt->execute();
			// $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		public function login($data){
			$email = $data->email;
			$email = explode("@",$email);
			$email_pre = $email[0];
		    $email_suff = $email[1];

			// $this->pdo->exec("use ksm_plexus");
			$stmt = $this->pdo->prepare("SELECT prim_id,f_name,l_name,account_type FROM PM010001 WHERE username_pre=:email_pre AND username_suff = :email_suff AND password = :password ");
			$stmt->bindParam(":email_pre",$email_pre,PDO::PARAM_STR);
			$stmt->bindParam(":email_suff",$email_suff,PDO::PARAM_STR);
			$stmt->bindParam(":password",$data->password,PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$user = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($count == 1){
				$_SESSION['status'] = "true";
				$_SESSION['user_plexus_id'] = $user[0]['prim_id'];
				$_SESSION['email']=$email_pre."@".$email_suff;
				$_SESSION['f_name']=$user[0]['f_name'];
				$_SESSION['l_name']=$user[0]['l_name'];
				$_SESSION['account_type']=$user[0]['account_type'];
				echo json_encode($user);
			}

		}
		public function proctorForm($data){
			echo json_encode($data);
		}
		public function uniqueUser($email){

		$email_filtered = explode("@",$email);
		$email_pre = $email_filtered[0];

		if(isset($email_filtered[1])){
			$email_suff = $email_filtered[1];
			$this->pdo->exec("use ksm_plexus");
			$stmt = $this->pdo->prepare("SELECT prim_id FROM PM010001 WHERE username_pre = :email_pre AND username_suff = :email_suff");
			$stmt->bindParam(":email_pre",$email_pre,PDO::PARAM_STR);
			$stmt->bindParam(":email_suff",$email_suff,PDO::PARAM_STR);
			$stmt->execute();
			$row_count = $stmt->rowCount();
			if($row_count == 0){
				echo "0";
			}
			else {
				echo "1";
				}
			}
		else {
			echo "Invalid Email";
			}
		}
	}

 ?>
