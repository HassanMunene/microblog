/*=============================================================================
* ======This file will be used to style post_page.html=========================
* ==========================================================================*/
document.addEventListener('DOMContentLoaded', function () {
    const postImageContainer = document.getElementById('postImageContainer');
    const postImage = document.getElementById('postImage');
    if (postImageContainer) {
        postImageContainer.addEventListener('click', function () {
            postImageContainer.classList.add('show');
            postImage.classList.add('show');
        })
    }
})