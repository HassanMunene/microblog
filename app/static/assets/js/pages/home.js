/*======================================================================================
* This js file will be used to work on the home page for unauthenticated users
* ==================================================================================*/

/*=========================================================
* ===This section we are changing the bg color of navbar
* ===depending on the height of the scrolly and section
* =======================================================*/
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.getElementById('navbar');
    let introSection = document.getElementById('intro-section');
    let postSectiion = document.getElementById('posts-section');
    //get the height of the introSection
    let introSectionHeight = introSection.clientHeight;

    //add a scroll event listener
    window.addEventListener('scroll', function () {
        //get the current scroll postion while scrolling
        let scrollPosition = window.scrollY;

        if (scrollPosition >= introSectionHeight) {
            navbar.style.backgroundColor = 'white';
            navbar.classList.add('show');
        } else {
            navbar.style.backgroundColor = '#ffc107';
            navbar.classList.remove('show');
        }
    })
})