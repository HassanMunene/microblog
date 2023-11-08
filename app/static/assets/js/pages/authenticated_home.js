/*
The is the module for home2 js in this first section we are giving the scrolling
feature at the top of the home page some dynamic behaviours
*/
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll(".scrollable-tabs-container ul li a");
    const rightArrow = document.getElementById('right-arrow-chevron');
    const leftArrow = document.getElementById('left-arrow-chevron');
    const rightArrowContainer = document.getElementById('right-arrow');
    const leftArrowContainer = document.getElementById('left-arrow');
    const tabsList = document.querySelector(".scrollable-tabs-container ul");
    let newScrollLeft;
    let newScrollRight;
    
    const removeAllActiveClasses = () => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            removeAllActiveClasses();
            tab.classList.add('active');
        })
    })

    const manageScrolling = () => {
        if (newScrollLeft >= 20) {
            leftArrowContainer.classList.add('active');
        }
        const maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth -20;
    }
    rightArrow.addEventListener("click", () => {
        newScrollLeft = tabsList.scrollLeft += 170;
        manageScrolling();
    })
    leftArrow.addEventListener("click", () => {
        newScrollRight = tabsList.scrollLeft -= 170;
        manageScrolling();
        console.log(newScrollRight);
    })
})

