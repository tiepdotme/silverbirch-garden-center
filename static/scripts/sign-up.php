<?php
	
	$title = $_POST['title'];
	$initials = $_POST['initials'];
	$surname = $_POST['surname'];
	$address = $_POST['address'];
	$postcode = $_POST['postcode'];
	$phone = $_POST['phone'];	
	$email = trim($_POST['email']);
	$dob = $_POST['dob'];
	$gardenSize = $_POST['gardenSize'];
	$subscribe = $_POST['subscribe'];

	// RegEx vars used for validating email address
	$_name = "/^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+";
	$_host = "([-0-9A-Z]+\.)+";
	$_tlds = "([0-9A-Z]){2,4}$/i";
	
	// Ensure form values are not empty
	if(empty($initials) or empty($surname)){
		echo "1";
	}
	elseif(empty($address)){
		echo "2";
	}
	elseif(empty($email) || !preg_match( $_name."@".$_host .$_tlds,$email)){
		echo "3";
	}
	elseif(empty($postcode)) {
		echo "4";
	}
	elseif(empty($phone) || !is_numeric($phone)) {
		echo "5";
	}
	elseif(empty($dob)) {
		echo "6";
	}
	else{		
		// All set to go.  Let's build up our email content
		$to = "info@silverbirchgardencentre.co.uk";
		$subject = "Reward Card Sign Up";
		$headers = "From: $email \r\n";
		$content = $title . " " . $surname . " has signed up for a Reward Card. Their details are: \n\n
				   Title:    " . $title . "\n
				   Initial:    " . $initials . "\n
				   Surname:    " . $surname . "\n
				   Address:    " . $address . "\n
				   Postcode:    " . $postcode . "\n
				   Phone No:    " . $phone . "\n
				   email:    " . $email . "\n
				   DOB:    " . $dob . "\n
				   Garden Size:    " . $gardenSize . "\n\n
				   Subscribe:    " . $subscribe;

		// Fore off an email
		if(mail($to, $subject, $content, $headers)){
			echo "10";
		}
		else{
			echo "8";
		}
	}

?>