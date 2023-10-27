/**
 * The following code below will handle sending asynchronous request to the server
 * from the modal after the user has entered their email for processing
 */
document.addEventListener('DOMContentLoaded', function () {
    let email; //declare email in the outer scope
    const enterEmailModal = document.getElementById('enter_email_modal');
    const enterEmailModalB = new bootstrap.Modal(document.getElementById('enter_email_modal'));

    const emailSentModal = document.getElementById('email_sent_modal');
    const emailSentModalB = new bootstrap.Modal(document.getElementById('email_sent_modal'));
    const emailSentModalC = new bootstrap.Modal(document.getElementById('email_sent_modal2'));

    errorMessageEmail = document.getElementById('error-message-email'); //handle error with email input

    enterEmailModal.addEventListener('submit', function (event){
        event.preventDefault();
        const emailInput = document.getElementById('emailInput');
        email = emailInput.value;
        emailInput.value = ''; //clear the field used to enter the email
        
        // handle if email has a value or not
        if (email) {
            xhr_object = new XMLHttpRequest();
            xhr_object.open('POST', '/auth/submit_email', true);
            xhr_object.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr_object.onreadystatechange = function () {
                if(xhr_object.readyState === 4 && xhr_object.status === 200) {
                    const response = JSON.parse(xhr_object.responseText);
                    console.log(response);
                    //we hide modal for entering email and show a modal showing email has been sent
                    if (response.email_known) {
                        setTimeout(() => { enterEmailModalB.hide();}, 50)
                        emailSentModalC.show();
                    }
                    else {
                        setTimeout(()=>{enterEmailModalB.hide();}, 50)
                        emailSentModalB.show();
                    }
                }
            };
            const formData = 'email=' + email;
            xhr_object.send(formData);
        } else {
            errorMessageEmail.textContent = 'Error. Please enter Email';
            errorMessageEmail.classList.add('active');
        }
    });
})