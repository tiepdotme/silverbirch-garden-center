/***************************
 @Author: 	Martyn McWhirter
 @website:  www.mkmdesign.co.uk
 @email: 	martyn@mkmdesign.co.uk	
 @Details:  Developed for use on www.*****.co.uk in order
			to process the contact form
 @License:  Do what you want with it! Its a very basic script and
			could probably be improved  			
***************************/

(function(){

	// Global vars - These are the form fields
	var form = $("#contactform");

	var name = $("#name");
	var nameError = $("#name-error");

	var phone = $("#contact-phone");
	var phoneError = $("#contact-phone-error");

	var email = $("#contact-email");
	var emailError = $("#contact-email-error");	

	var comments = $("#comments");
	var commentsError = $("#comments-error");

	// Validate on blur - comment/delete out if not required
	name.blur(validateName);
	phone.blur(validatePhone);
	email.blur(validateEmail);
	comments.blur(validateComments);

	// Validate on key press - comment/delete out if not required
	name.keyup(validateName);
	phone.keyup(validatePhone);
	email.keyup(validateEmail);
	comments.keyup(validateComments);

	// Called when form is submitted
	form.submit(function(){
		if(validateName() & validatePhone() & validateEmail() & validateComments()){
			// Fire off an ajax call to the relevant php script
			$.ajax({
		        type: "POST",
		        url:  "../scripts/contact.php",		       
		        data: { name: name.val(), phone: phone.val(), email: email.val(), comments: comments.val()},
		        success: function(resp){	
		        	/* The PHP script return a code to indicate its state	        	
		        		code 10 is always a success */
		        	switch(resp){

		        		// No Name and/or Comments
		        		case "1":
		        			alert("Please supply your Name and some Comments");
		        			break;

		        		// No Phone No
		        		case "2":
		        			alert("Please supply your Phone No (mst be numeric)");
		        			break;

		        		// No email or invalid email
		        		case "3":
		        			alert("Please supply a valid email address");
		        			break;

		        		// Error sending email
		        		case "8":
		        			alert("There was an error sending your request. Please try again");
		        			break;

		        		// Success
		        		case "10":
		        			alert("Thank you");
		        			break;

		        	}      	
		        }	        
		      });		      
		      return false;	      	     
		}
		else{
			return false;
		}	
	});
	
	// Validation functions
	function validateName(){		
		if(name.val().length < 1){
			name.addClass("error");
			nameError.text("Please enter your Name");
			nameError.addClass("errorText");
			return false;
		}		
		else{
			name.removeClass("error");
			name.addClass("correct");
			nameError.text("");
			nameError.removeClass("errorText");
			return true;
		}
	}

	function validatePhone(){		
		if(phone.val().length < 1 || phone.val().match(/[^\d]/)){
			phone.addClass("error");
			phoneError.text("Please enter a numeric Phone number");
			phoneError.addClass("errorText");
			return false;
		}		
		else{
			phone.removeClass("error");
			phone.addClass("correct");
			phoneError.text("");
			phoneError.removeClass("errorText");
			return true;
		}
	}

	function validateEmail(){		
		var a = email.val();
		if (a.length < 1) {
			email.addClass("error");
			emailError.text("Please enter an email address");
			emailError.addClass("errorText");
			return false;
		}
		else{
			var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;			
			if(filter.test(a)){
				email.removeClass("error");
				email.addClass("correct");
				emailError.text("");
				emailError.removeClass("errorText");
				return true;
			}			
			else{
				email.addClass("error");
				emailError.text("Please supply a valid email address");
				emailError.addClass("errorText");
				return false;
			}
		}
	}

	function validateComments(){		
		if(comments.val().length < 1){
			comments.addClass("error");
			commentsError.text("Please enter some comments");
			commentsError.addClass("errorText");
			return false;
		}		
		else{
			comments.removeClass("error");
			comments.addClass("correct");
			commentsError.text("");
			commentsError.removeClass("errorText");
			return true;
		}
	}

})();