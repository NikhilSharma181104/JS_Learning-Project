let nameError = document.getElementById("name-error");
let phoneError = document.getElementById("phone-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");

/**************VALID NAME**************/
function validateName() {
  let name = document.getElementById("contact-name").value;
  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]+\s{1}[A-Za-z]+$/)) {
    nameError.innerHTML = "Enter your FullName";
    return false;
  }
  nameError.innerHTML = '<i class="fas fa-check-circle"></i>';

  return true;
}

/**************VALID PHONE NUMBER**************/
document
  .getElementById("contact-phone")
  .addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");

    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
    }
  });

function validatePhone() {
  let phone = document.getElementById("contact-phone").value;
  let phoneLength = phone.length;

  if (phoneLength == 0) {
    phoneError.innerHTML = "Enter phone number";
    return false;
  }

  if (phoneLength !== 10) {
    phoneError.innerHTML = `${10-phoneLength}/10`;
    return false;
  }

  phoneError.innerHTML = '<i class="fas fa-check-circle"></i>';
  return true;
}

/**************VALID EMAIL**************/
function validateEmail() {
    let email = document.getElementById("contact-email").value;
    let emailLength = email.length;
    
    if (emailLength == 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^[A-Za-z0-9\._\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,4}$/)) {
        emailError.innerHTML = "Invalid Email";
        return false;
    }
    
    emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

/**************VALID MESSAGE**************/
document.getElementById("contact-message").addEventListener("input", function() {
    if (this.value.length > 100) {
        this.value = this.value.slice(0, 100);
    }
});

function validateMessage() {
    let message = document.getElementById("contact-message").value;
    let messageLength = message.length;
    let required = 30;
    let maxLength = 100; 
    
    if (messageLength == 0) {
        messageError.innerHTML = 'Message is required';
        return false;
    }
    
    if (messageLength < required) {
        messageError.innerHTML = `minimum ${required - messageLength} more characters required`;
        return false;
    }

    messageError.style.color = "green"
    messageError.innerHTML = `<i class="fas fa-check-circle"></i> ${messageLength}/${maxLength}`;
    return true;
}

/**************VALID SUBMIT**************/
function validateForm(){
    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()){
        submitError.style.display = 'block';
        submitError.innerHTML = "PLEASE FIX ALL THE ERRORS TO SUBMIT!";
        setTimeout(() => {
            submitError.style.display = 'none';
        }, 3000);
        return false;
    }
    else{
        submitError.style.color = 'green';
        submitError.style.display = 'block';
        submitError.innerHTML = "FORM SUBMITTED SUCCESSFULLY!";
        return true;
    }
}


