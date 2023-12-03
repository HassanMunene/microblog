/*======================================================================================
* This js file will be used to work on the home page for unauthenticated users
* ==================================================================================*/

/*=========================================================
* ===This section we are changing the bg color of navbar
* ===depending on the height of the scrolly and section
* =======================================================*/
/*document.addEventListener("DOMContentLoaded", function () {
    const IntroSectionContainer = document.getElementById('intro-section-container');
    if (IntroSectionContainer) {
        let pageType = IntroSectionContainer.getAttribute('data-page');
        let navbar = document.getElementById('navbar');
        let getStartedBtn = document.getElementById('get-started-btn');
        let introSection = document.getElementById('intro-section');
        let postSectiion = document.getElementById('posts-section');
        //get the height of the introSection
        let introSectionHeight = introSection.clientHeight;
        console.log(introSectionHeight);
    
        //add a scroll event listener
        window.addEventListener('scroll', function () {
            //get the current scroll postion while scrolling
            let scrollPosition = window.scrollY;
    
            if (scrollPosition >= introSectionHeight) {
                navbar.style.backgroundColor = 'white';
                navbar.classList.add('show');
                getStartedBtn.classList.add('scroll-btn');
    
            } else {
                navbar.style.backgroundColor = '#ffc107';
                navbar.classList.remove('show');
                getStartedBtn.classList.remove('scroll-btn');
            }
        })     
    }
})*/

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
    const getStartedButton = document.getElementById('getStartedButton');
    const body = document.body;

    if (getStartedButton) {
        const closeModalButton = document.getElementById('closeButton');
        const getStartedModal = document.getElementById('getStartedModal');

        function showGetStartedModal() {
            body.classList.add('modal-open');
            setTimeout(function () {
                getStartedModal.classList.add('show');
            }, 500);
        }
        function closeGetStartedModal() {
            body.classList.remove('modal-open');
            getStartedModal.classList.remove('show');
        }
        getStartedButton.addEventListener('click', showGetStartedModal);
        closeModalButton.addEventListener('click', closeGetStartedModal);
    }
})