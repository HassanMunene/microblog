/*======================================================================================
* This js file will be used to work on the home page for unauthenticated users
* ==================================================================================*/

/*==================================================================================
* ===This section we are changing background color of getStartedButton  and the navbar============== 
* ===depending on the height of the scrolly and section=============================
* ================================================================================*/
document.addEventListener("DOMContentLoaded", function () {
    const IntroSectionContainer = document.getElementById('introSectionContainer');
    if (IntroSectionContainer) {
        let navbar = document.getElementById('homeNavbar');
        let getStartedButton = document.getElementById('getStartedButton');
        let introSection = document.getElementById('introSection');
        let postSection = document.getElementById('postSection');

        //get the height of the introSection
        let introSectionHeight = introSection.clientHeight;
        console.log(introSectionHeight);
    
        //add a scroll event listener
        window.addEventListener('scroll', function () {
            //get the current scroll postion while scrolling
            let scrollPosition = window.scrollY;
    
            if (scrollPosition >= introSectionHeight) {
                navbar.classList.add('changeColor');
                getStartedButton.classList.add('changeColor');
    
            } else {
                navbar.classList.remove('changeColor');
                getStartedButton.classList.remove('changeColor');
            }
        })     
    }
})
/*==================================================================================
* ===When user clicks on the three dots on the posts section a popup shows========
* ================================================================================*/
document.addEventListener("DOMContentLoaded", function () {
    let threeDots = document.getElementsByClassName('three-dots');
    //console.log(threeDots);

    if (threeDots) {
        let dialogBoxes = document.getElementsByClassName('popup-dialog-box');
        dialogBoxes = [...dialogBoxes];
        threeDots = [...threeDots];
        threeDots.forEach(function (threeDot) {
            threeDot.addEventListener('click', function () {
                let threeDotIndex = threeDots.indexOf(threeDot);
                dialogBoxes.forEach(function (dialogBox) {
                    let dialogBoxIndex = dialogBoxes.indexOf(dialogBox);
                    if (threeDotIndex === dialogBoxIndex) {
                        dialogBox.classList.toggle('show');
                    }
                })
            })
        })
    }
})
/*==================================================================================
* ==When the getStartedButton is clicked show the sign up modal=====================
* ==============================================================================*/

document.addEventListener('DOMContentLoaded', function () {
    let getStartedButtons = document.getElementsByClassName('getStartedButton');
    const body = document.body;

    if (getStartedButtons) {
        getStartedButtons = [...getStartedButtons];
        const closeModalButton = document.getElementById('closeButton');
        const getStartedModal = document.getElementById('getStartedModal');

        function showGetStartedModal() {
            body.classList.add('modal-open');
            getStartedModal.classList.add('show');
        }
        function closeGetStartedModal() {
            body.classList.remove('modal-open');
            getStartedModal.classList.remove('show');
        }
        getStartedButtons.forEach(function(getStartedButton) {
            getStartedButton.addEventListener('click', showGetStartedModal);
        })
        closeModalButton.addEventListener('click', closeGetStartedModal);

        //When user clicks the signup with email button in in getstarted modal show sign up modal
        const emailSignUpButton  = document.getElementById('email_signup');
        const signUpModal = document.getElementById('signupModal');


        // The following functions are for the signUpModal
        function closeSignUpModal () {
            body.classList.remove('modal-open');
            signUpModal.classList.remove('show');
        }
        // here we will show the the signUp Modal and handle everything in that Modal
        function showEmailSignUpModal () {
            closeGetStartedModal();
            body.classList.add('modal-open');
            signUpModal.classList.add('show');

            const closeSignUpButton = document.getElementById('closeSignUpButton');
            if (signUpModal) {
                const welcomeElement = document.getElementById('welcomeMessage');
                const formContainer = document.getElementById('form-container');
            
                // the message that will be dynamically inserted into the element
                const welcomeText = "Welcome to KcaVibes! Let's begin the adventure!";
                // the string can be accessed like an array so we declare an iterator
                let counter = 0;
        
                let intervalId = setInterval(function (){
                    let nextLetter = welcomeText[counter];
                    welcomeElement.innerHTML += nextLetter;
                    counter++;
            
                    if (counter === welcomeText.length) {
                        setTimeout(function (){
                            formContainer.style.display = 'block';
                        }, 500)
                        clearInterval(intervalId);
                    }
               }, 100)

               //this is an async function postData that will post data to the server
               async function postData(url='', data = {}) {
                    const response = await fetch (url , {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    let responseData = await response.json();
                    return responseData;
                }
               const emailInput = document.getElementById('email');
               const continueToPasswordButton = document.getElementById('continueToPassword');
               const passwordContianer = document.getElementById('passwordContainer');
               const passwordInput = document.getElementById('password');
               const showPassword = document.getElementById('showPassword');
               const hidePassword = document.getElementById('hidePassword');
               const confirmPasswordInput = document.getElementById('confirmPassword');
               const showConfirmPassword = document.getElementById('showConfirmPassword')
               const hideConfirmPassword = document.getElementById('hideConfirmPassword');
               const submitDataButton = document.getElementById('submitDataButton');
        
               // when you enter email and click continue
               continueToPasswordButton.addEventListener('click', function () {
                    //get the input details of the email input
                    if (emailInput.value !== '') {
                        passwordContianer.style.display = 'block';
                    }
               })

               //show correct btn for password input
               function showCorrect() {
                    const correctPassword = document.getElementById('correctPassword');
                    const passwordArrow = document.getElementById('passwordArrow');
                    passwordArrow.style.display = 'none';
                    correctPassword.style.display = 'block';
                }
                function hideCorrect() {
                    const correctConfirmPassword = document.getElementById('correctConfirmPassword');
                    const confirmPasswordArrow = document.getElementById('confirmPasswordArrow');
                    confirmPasswordArrow.style.display = 'block';
                    correctConfirmPassword.style.display = 'none';        
                }
                // show correct btn for confirm password input
                function showConfirmCorrect() {
                    const correctConfirmPassword = document.getElementById('correctConfirmPassword');
                    const confirmPasswordArrow = document.getElementById('confirmPasswordArrow');
                    confirmPasswordArrow.style.display = 'none';
                    correctConfirmPassword.style.display = 'block';        
                }
                function hideConfirmCorrect () {
                    const correctConfirmPassword = document.getElementById('correctConfirmPassword');
                    const confirmPasswordArrow = document.getElementById('confirmPasswordArrow');
                    confirmPasswordArrow.style.display = 'block';
                    correctConfirmPassword.style.display = 'none';
                }

               // handle the event when user enters password to show mark icon
               passwordInput.addEventListener('change', showCorrect);

               // when user clicks show password button show the password in text format
               showPassword.addEventListener('click', function () {
                    passwordInput.type = 'text';
                    showPassword.style.display = 'none';
                    hidePassword.style.display = 'block';
               })
               // when user clicks hide password button show password in password format
               hidePassword.addEventListener('click', function () {
                    passwordInput.type = 'password';
                    hidePassword.style.display = 'none';
                    showPassword.style.display = 'block';
               })
               
               // when user clicks show confirm password button show the password in text format
               showConfirmPassword.addEventListener('click', function () {
                    confirmPasswordInput.type = 'text';
                    showConfirmPassword.style.display = 'none';
                    hideConfirmPassword.style.display = 'block';
               })
               // when user clicks hide password button show password in password format
               hideConfirmPassword.addEventListener('click', function () {
                    confirmPasswordInput.type = 'password';
                    hideConfirmPassword.style.display = 'none';
                    showConfirmPassword.style.display = 'block';
               })

               //when submit data button is clicked, send data to the backend using fetch api
               submitDataButton.addEventListener('click', function () {
                    let password = passwordInput.value;
                    let confirmPassword = confirmPasswordInput.value;
                    if (password === confirmPassword) {
                        showConfirmCorrect();
                        let email = emailInput.value;
                        postData(url='auth/register_user', data={'email': email, 'password': password})
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log('An error occured');
                        });
                        emailInput.value = '';
                        passwordInput.value = '';
                        confirmPasswordInput.value = '';
                    } else {
                        confirmPasswordInput.classList.add('wrongPassword');
                        hideConfirmCorrect();
                    }
               })
               closeSignUpButton.addEventListener('click', closeSignUpModal);
            }
        }

        emailSignUpButton.addEventListener('click', showEmailSignUpModal);
    }

})