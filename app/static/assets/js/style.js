/**
 * The following code below will handle sending asynchronous request to the server
 * from the modal after the user has entered their email for processing
 */
document.addEventListener('DOMContentLoaded', function () {
    const modal1 = document.getElementById('enter_email_modal');
    const modal1a = new bootstrap.Modal(document.getElementById('enter_email_modal'));

    const modal2 = document.getElementById('email_sent_modal');
    const modal2a = new bootstrap.Modal(document.getElementById('email_sent_modal'));

    errorMessageEmail = document.getElementById('error-message-email');

    verifyButton = document.getElementById('verifyButton');
    codeInput = document.getElementById('codeInput');
    errorMessage = document.getElementById('error-message');
    ok_button = document.getElementById('ok_button');
    go_back_btn = document.getElementById('invalid-code-go-back');

    modal1.addEventListener('submit', function (event){
        event.preventDefault();

        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;
        emailInput.value = ''; //clear the input field

        if (email) {
            xhr_object = new XMLHttpRequest();
            xhr_object.open('POST', '/auth/submit_email', true);
            xhr_object.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr_object.onreadystatechange = function () {
                if(xhr_object.readyState === 4 && xhr_object.status === 200) {
                    const response = JSON.parse(xhr_object.responseText);
                    console.log(response);
                    //we hide modal for entering email and show a modal showing email has been sent
                    if (response.success) {
                        setTimeout(() => { modal1a.hide();}, 50)
                        modal2a.show();
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

    
    /* This next section will handle sending the verification code to the /verify_code route from modal 4*/
    
    verifyButton.addEventListener('click', function () {
        const verificationCode = codeInput.value;
        codeInput.value = '';

        if (verificationCode) {
            const xhr_object = new XMLHttpRequest();
            xhr_object.open('POST', '/auth/verify_code', true);
            xhr_object.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr_object.onreadystatechange = function () {
                if (xhr_object.readyState === 4 && xhr_object.status === 200) {
                    const response = JSON.parse(xhr_object.responseText);
                    console.log(response);
                    if (response.success) {
                        // code is meaning email is valid therefore lets navigate to the register route
                        window.location.href = '/auth/register';
                    } else {
                        // code is invalid customise the input field to display error
                        codeInput.classList.add('invalid');
                        errorMessage.textContent = 'Invalid code. Please try again';
                        errorMessage.classList.add('active');
                        ok_button.classList.add('invalid_code');
                        go_back_btn.style.display = 'block';
                    }
                }
            }
            const data = JSON.stringify({code: verificationCode});
            xhr_object.send(data);
        } else {
            // when no verification code is provided
            codeInput.classList.add('invalid');
            errorMessage.textContent = 'Error. Please enter the code';
            errorMessage.classList.add('active');
        }
     });
    
});
