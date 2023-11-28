/*===================================================================================
 * This function will handle showing and hiding custom alert
 ==================================================================================*/
function showCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.top = '16px';
    
    // this is to hide the customAlert after a certain period
    setTimeout(function () { hideCustomAlert(); }, 1000);
}
 
function hideCustomAlert () {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.top = '-100px';
}
// enable the close button to also hide the customAlert
document.getElementById('customAlertClose').addEventListener('click', function () {hideCustomAlert();});
 


/*================================================================================
* =This page will containe some common js functionalities that will be used across
* = the application
* =============================================================================*/
document.addEventListener('DOMContentLoaded', function () {
    let postDates = document.getElementsByClassName('datePosted');
    //convert the html collection to an array using spread operator
    postDates = [...postDates];

    postDates.forEach(function (postDate) {
        const postDateStr = postDate.innerHTML;
        const postDateObject = new Date(postDateStr);
        const currentDate = new Date();
        const timeDifference = currentDate - postDateObject;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            postDate.innerHTML = `${seconds} seconds ago`;
        } else if (minutes < 60) {
            postDate.innerHTML = `${minutes} minutes ago`;
        } else if (hours < 24) {
            postDate.innerHTML = `${hours} hours ago`;
        } else if (days < 30) {
            postDate.innerHTML = `${days} days ago`;
        } else if (months < 12) {
            postDate.innerHTML = `${months} months ago`;
        } else {
            postDate.innerHTML =  `${years} years ago`;
        }   
    })
})

/*===================================================================================
* === This section will make it possible to share data using webshare API ===========
* ===========WEB SHARE API=========================================================*/
document.addEventListener('DOMContentLoaded', function () {
    // get the url of the post
    const postUrl = window.location.href;
    const shareData = {
        title: "KcaVibes",
        text: "KcaVibes Together, We Thrive!",
        url: postUrl,
    };
    let shareBtns = document.getElementsByClassName("shareData");
    shareBtns = [...shareBtns];

    // share must be triggered by 'user' activation
    shareBtns.forEach(function (shareBtn) {
        shareBtn.addEventListener("click", function () {
            if (navigator.share) {
                navigator.share(shareData)
                .then(function () {
                    console.log('Successfully shared data');
                })
                .catch(function (error) {
                    console.log('Error sharing:', error);
                });
            } else {
                navigator.clipboard.writeText(postUrl);
                showCustomAlert();
            }
        });
    })
})