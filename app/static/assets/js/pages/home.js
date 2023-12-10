/*======================================================================================
* This js file will be used to work on the home page for unauthenticated users
* ==================================================================================*/

/*==================================================================================
* ===This section we are changing background color of getStartedButton  and the navbar============== 
* ===depending on the height of the scrolly and section=============================
* ================================================================================*/
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('introSectionContainer')) {
        setupBackgroundChanges();
    }
    setupThreeDotsPopups();
    if (document.getElementsByClassName('getStartedButton')) {
        setupGetStartedButton();
    }
})

/*==================================================================================
* ==When the getStartedButton is clicked show the sign up modal=====================
* ==============================================================================*/
function setupGetStartedButton() {
    let getStartedButtons = document.querySelectorAll('.getStartedButton');
    getStartedButtons = [...getStartedButtons];
    const closeModalButton = document.getElementById('closeButton');
    const getStartedModal = document.getElementById('getStartedModal');
    const emailSignUpButton  = document.getElementById('email_signup');
    const signUpModal = document.getElementById('signupModal');
    const body = document.body;

    getStartedButtons.forEach(function(getStartedButton) {
        getStartedButton.addEventListener('click', function () {
            body.classList.add('modal-open');
            getStartedModal.classList.add('show');
        });
    })

    //open signup modal
    emailSignUpButton.addEventListener('click', showEmailSignUpModal);
    function showEmailSignUpModal () {
        closeGetStartedModal();
        body.classList.add('modal-open');
        signUpModal.classList.add('show');

        const closeSignUpButton = document.getElementById('closeSignUpButton');
        if (signUpModal) {
            showWelcomeMessage();
            setupPasswordHandling();
            submitDataFunction();
            closeSignUpButton.addEventListener('click', function () {
                body.classList.remove('modal-open');
                signUpModal.classList.remove('show');
            });
        }
    }
    // show the welcome message when user navigate to signup modal
    function showWelcomeMessage () {
        const welcomeElement = document.getElementById('welcomeMessage');
        const formContainer = document.getElementById('form-container');
        // the message that will be dynamically inserted into the element
        const welcomeText = "Welcome to KcaVibes! Let's begin the adventure!";
        // the string can be accessed like an array so we declare an iterator
        let counter = 0;
        // the loop that will dynamically insert the test to the welcomeElement
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
    }
    // handle the passwords input section
    function setupPasswordHandling () {
        const showPasswordButton = document.getElementById('continueToPassword');
        const emailInput = document.getElementById('email');
        const passwordContianer = document.getElementById('passwordContainer');
        const passwordInput = document.getElementById('password');
        const showPassword = document.getElementById('showPassword');
        const hidePassword = document.getElementById('hidePassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const showConfirmPassword = document.getElementById('showConfirmPassword')
        const hideConfirmPassword = document.getElementById('hideConfirmPassword');
        const correctPassword = document.getElementById('correctPassword');
        const passwordArrow = document.getElementById('passwordArrow');
        const correctConfirmPassword = document.getElementById('correctConfirmPassword');
        const confirmPasswordArrow = document.getElementById('confirmPasswordArrow');

        showPasswordButton.addEventListener('click', function () {
            if (emailInput.value != '') {
                passwordContianer.style.display = 'block';
            }
        })

        // handle the event when user enters password to show check mark icon
        passwordInput.addEventListener('input', function () {
            passwordArrow.style.display = 'none';
            correctPassword.style.display = 'block';
        });

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

        // handle input event whenever user enters password to confirm
        confirmPasswordInput.addEventListener('input', function () {
            let password = passwordInput.value;
            let confirmPassword = confirmPasswordInput.value;
            if (password === confirmPassword) {
                confirmPasswordArrow.style.display = 'none';
                correctConfirmPassword.style.display = 'block';   
            } else {
                confirmPasswordInput.classList.add('wrongPassword');
                confirmPasswordArrow.style.display = 'block';
                correctConfirmPassword.style.display = 'none';
            }
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
        // show check mark for confirm password input
        function displayCheckMark2() {     
        }
    }
    // submit email and password to backend
    function submitDataFunction() {
        const submitDataButton = document.getElementById('submitDataButton');
        const passwordInput = document.getElementById('password');

        async function postData(url='', data={}) {
            const response = await fetch (url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseData = await response.json();
            return responseData;
        }
        //when submit data button is clicked, send data to the backend using fetch api
        submitDataButton.addEventListener('click', function () {
            let email = emailInput.value
            let password = passwordInput.value;
            postData(url='auth/register_user', data={'email': email, 'password': password})
            .then(function (response) {
                console.log(response);
            })
            .catch(function () {
                console.log('an error occured');
            })
            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
        })
    }
    closeModalButton.addEventListener('click', function () {
        body.classList.remove('modal-open');
        getStartedModal.classList.remove('show');     
    });
}

// this function will change the background color of getStartedButton and the navbar
// depending on the scroll position our page is.
function setupBackgroundChanges() {
    let navbar = document.getElementById('homeNavbar');
    let getStartedButton = document.getElementById('getStartedButton');
    let introSection = document.getElementById('introSection');
    let postSection = document.getElementById('postSection');

    //get the height of the introSection
    let introSectionHeight = introSection.clientHeight;

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

// this function When user clicks on the three dots on the posts section a popup shows
function setupThreeDotsPopups() {
    let threeDots = document.querySelectorAll('.three-dots');
    threeDots = [...threeDots];
    let dialogBoxes = document.querySelectorAll('.popup-dialog-box');
    dialogBoxes = [...dialogBoxes];

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