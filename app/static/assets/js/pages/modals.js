/**
 * The following code below will handle sending asynchronous request to the server
 * from the modal after the user has entered their email for processing
 */
let emailSentModalC;

document.addEventListener('DOMContentLoaded', function () {
    let email; //declare email in the outer scope
    const enterEmailModal = document.getElementById('enter_email_modal');
    const enterEmailModalB = new bootstrap.Modal(document.getElementById('enter_email_modal'));

    const emailSentModal = document.getElementById('email_sent_modal');
    const emailSentModalB = new bootstrap.Modal(document.getElementById('email_sent_modal')); // for signup
    emailSentModalC = new bootstrap.Modal(document.getElementById('email_sent_modal2')); // for signin

    errorMessageEmail = document.getElementById('error-message-email'); //handle error with email input
    // next we get the button for signup with google so that when we clicks it it initiates the 0Auth 2.0 process
    const google_signup = document.getElementById('google_signup');

    enterEmailModal.addEventListener('submit', function (event){
        event.preventDefault();
        const emailInput = document.getElementById('emailInput');
        email = emailInput.value;
        emailInput.value = ''; //clear the field used to enter the email

        // handle if email has a value or not
        if (email) {
            xhr_object = new XMLHttpRequest();
            xhr_object.open('POST', '/auth/receive_email_from_modal', true);
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

    google_signup.addEventListener('click', function () {window.location.href='/auth/login'});

})

/*==========================================================================================
* In this next function target a page /auth/signin. This page will be normally requested
* when the user of the application tries to access a protected(@login_required) route
* so they will be redirected to this page instead. In this page a sign modal will be shown 
==========================================================================================*/
document.addEventListener('DOMContentLoaded', function () {
    let signInModal = new bootstrap.Modal(document.getElementById('sign-in-modal'));

    // check if the current page is the home page
    if (window.location.pathname === '/auth/signin') {
        if (signInModal) {
            setTimeout(() => { signInModal.show();}, 50);
        }
        else {
            console.log('Sign in modal not available');
        }
    }
});


/*=================================================================================================
* This section will handle the sign in modal
==================================================================================================*/
document.addEventListener('DOMContentLoaded', function () {
    const signInEnterEmailModal = document.getElementById('signIn_enter_email_modal');
    const signInEnterEmailModalB = new bootstrap.Modal(document.getElementById('signIn_enter_email_modal'));
    const errorMessageEmail = document.getElementById('signin_error-message-email'); //handle error with email input
    const getStarted = new bootstrap.Modal(document.getElementById('get-started-modal'));

    signInEnterEmailModal.addEventListener('submit', async function (event){
        event.preventDefault();
        const emailInput = document.getElementById('signInEmailInput');
        email = emailInput.value;
        console.log(email);
        emailInput.value = ''; //clear the field used to enter the email

        if (email) {
            const response = await fetch('/auth/receive_email_from_modal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'email='+email
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                if (responseData.email_known) {
                    setTimeout(() => { signInEnterEmailModalB.hide();}, 50);
                    emailSentModalC.show();
                } else {
                    setTimeout(() => {signInEnterEmailModalB.hide();}, 50);
                    getStarted.show();
                }
            }
        } else {
            errorMessageEmail.textContent = 'Error. Please enter the Email.';
            errorMessageEmail.classList.add('active');
        }
    })
});
