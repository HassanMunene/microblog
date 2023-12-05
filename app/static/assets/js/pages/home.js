/*======================================================================================
* This js file will be used to work on the home page for unauthenticated users
* ==================================================================================*/



/*==================================================================================
* Here when user clicks the bookmark section the getStartedModal is shown because
* The user is not yet logged in
* ================================================================================*/
/*document.addEventListener("DOMContentLoaded", function () {
    const getStartedModal = new bootstrap.Modal(document.getElementById('get-started-modal'));
    
    // select all elements with class name home-bmk-section. This will return an
    // html collection which is like an array but not really
    let bookmarSections = document.getElementsByClassName('home-bmk-section');
    
    // convert the html collection to an array to work with ForEach loop
    bookmarSections = Array.from(bookmarSections);

    // iterate and add an event listener to each element in the array
    bookmarSections.forEach(function (bookmarSection) {
        bookmarSection.addEventListener('click', function () {
            setTimeout(function () {
                getStartedModal.show();
            }, 100)
        })
    });
})*/

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
    }
})

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
        console.log(dialogBoxes);
        //const dialogBox = document.getElementById('popup-dialog-box');
        // convert the html collection to an array to use the forEach iterative method
        dialogBoxes = [...dialogBoxes];
        threeDots = [...threeDots];
        // iterate through each element in the threeDots array
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