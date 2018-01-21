<?php
	
	$name = $_POST['name'];
	$phone = $_POST['phone'];	
	$email = trim($_POST['email']);
	$comments = $_POST['comments'];

	// RegEx vars used for validating email address
	$_name = "/^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+";
	$_host = "([-0-9A-Z]+\.)+";
	$_tlds = "([0-9A-Z]){2,4}$/i";
	
	// Ensure form values are not empty
	if(empty($name) || empty($comments)){
		echo "1";
	}
	elseif(empty($phone) || !is_numeric($phone)) {
		echo "2";
	}
	elseif(empty($email) || !preg_match( $_name."@".$_host .$_tlds,$email)){
		echo "3";
	}
	else{		
		// All set to go.  Let's build up our email content
		$to = "info@silverbirchgardencentre.co.uk";
		$subject = "Website Feedback";
		$headers = "From: $email \r\n";
		$content = $name . " has left some website feedback: \n\n
				   " . $comments . "\n\n" . $name . 
				   " can be contacted on " . $phone . " or " . $email;

		// Fire off an email
		if(mail($to, $subject, $content, $headers)){
			echo "10";
		}
		else{
			echo "4";
		}
	}

?>