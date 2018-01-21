/***************************
 @Author: 	Martyn McWhirter
 @website:  www.mkmdesign.co.uk
 @email: 	martyn@mkmdesign.co.uk	
 @Details:  Developed for use on www.*****.co.uk in order
			to process the reward sign up form
 @License:  Do what you want it! Its a very basic script and
			could probably be improved		
***************************/

(function(){

	// Global vars - form fields
	var form = $("#rewardform");	

	var initials = $("#initials");
	var initialsError = $("#initials-error");

	var surname = $("#surname");
	var surnameError = $("#surname-error");

	var address = $("#address");
	var addressError = $("#address-error");

	var postcode = $("#postcode");
	var postcodeError = $("#postcode-error");

	var phone = $("#phone");
	var phoneError = $("#phone-error");

	var email = $("#email");
	var emailError = $("#email-error");	

	var dob = $("#dob");
	var dobError = $("#dob-error");

	var subscribe = document.getElementById("subscribe");
	
	// Validate on blur - comment/delete out if not required
	initials.blur(validateInitials);
	surname.blur(validateSurname);
	address.blur(validateAddress);
	postcode.blur(validatePostcode);
	phone.blur(validatePhone);
	email.blur(validateEmail);
	dob.blur(validateDOB);

	// Validate on key press - comment/delete out if not required
	initials.keyup(validateInitials);
	surname.keyup(validateSurname);
	address.keyup(validateAddress);
	postcode.keyup(validatePostcode);
	phone.keyup(validatePhone);
	email.keyup(validateEmail);
	dob.keyup(validateDOB);

	// Called when form is submitted
	form.submit(function(){
		/* Get the selected title and garden size
		   This is done here so that these options can be changed 
		   after the page has loaded but before form is submitted
		*/
		var title = $('#title option:selected').text();
		var gardenSize = $('#garden-size option:selected').text();

		if(validateInitials() & validateSurname() & validateAddress() & validatePostcode() & validatePhone() & validateEmail() & validateDOB()){
			// Fire off an ajax call to the relevant php script
			$.ajax({
		        type: "POST",
		        url:  "../scripts/sign-up.php",		       
		        data: { title: title, initials: initials.val(), surname: surname.val(), address: address.val(), postcode: postcode.val(), phone: phone.val(), email: email.val(), dob: dob.val(), gardenSize: gardenSize, subscribe: subscribe.checked},
		        success: function(resp){		        	
		        	switch(resp){

		        		// No Initials and/or Surname
		        		case "1":
		        			alert("Please supply your Initials and Surname");
		        			break;

		        		// No Address
		        		case "2":
		        			alert("Please supply your Address");
		        			break;

		        		// No email or invalid email
		        		case "3":
		        			alert("Please supply a valid email address");
		        			break;

		        		// No Postcode
		        		case "4":
		        			alert("Please supply your Postcode");
		        			break;

		        		// No Phone No
		        		case "5":
		        			alert("Please supply your Phone No (mst be numeric)");
		        			break;

		        		// No DOB
		        		case "6":
		        			alert("Please supply your DOB in the correct format");
		        			break;

		        		// Did not agree to Condistions of use
		        		case "7":
		        			alert("You must confirm you have read the Conditions of Use");
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

	function validateInitials(){		
		if(initials.val().length < 1){			
			initials.addClass("error");
			initialsError.text("Please enter your initials");
			initialsError.addClass("errorText");
			return false;
		}		
		else{
			initials.removeClass("error");			
			initialsError.text("");						
			initialsError.removeClass("errorText");
			return true;
		}
	}

	function validateSurname(){		
		if(surname.val().length < 2){
			surname.addClass("error");
			surnameError.text("Please enter your Surname");
			surnameError.addClass("errorText");
			return false;
		}	
		else{
			surname.removeClass("error");
			surnameError.text("");
			surnameError.removeClass("errorText");
			return true;
		}
	}

	function validateAddress(){		
		if(address.val().length < 5){
			address.addClass("error");
			addressError.text("Please enter your address");
			addressError.addClass("errorText");
			return false;
		}		
		else{			
			address.removeClass("error");
			addressError.text("");
			addressError.removeClass("errorText");
			return true;
		}
	}

	function validatePostcode(){		
		if(postcode.val().length < 1){
			postcode.addClass("error");
			postcodeError.text("Please enter your Postcode");
			postcodeError.addClass("errorText");
			return false;
		}		
		else{
			postcode.removeClass("error");
			postcodeError.text("");
			postcodeError.removeClass("errorText");
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
			phoneError.text("");
			phoneError.removeClass("errorText");
			return true;
		}
	}

	function validateEmail(){		
		var a = $("#email").val();
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

	function validateDOB(){		
		if(dob.val().length < 10){
			dob.addClass("error");
			dobError.text("Please enter your D.O.B");
			dobError.addClass("errorText");
			return false;
		}		
		else{
			dob.removeClass("error");
			dobError.text("");
			dobError.removeClass("errorText");
			return true;
		}
	}

})();