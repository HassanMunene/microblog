/*=============================================================================
* ======This file will be used to style post_page.html=========================
* =========================================================================
document.addEventListener('DOMContentLoaded', function () {
    const postImageContainer = document.getElementById('postImageContainer');
    if (postImageContainer) {
        postImageContainer.addEventListener('click', function () {
            setTimeout(function () {
                postImageContainer.classList.toggle('show');
            }, 500)
        })
    }
})*/

/*===============================================================================
* ============Manipulate the post content in the post page ======================
* =============================================================================*/
document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have an element with the id 'actual-post'
    let postContent = document.getElementById('postBody');

    let postText = postContent.textContent;
    let firstWord = postText.split(" ")[0];
    console.log(firstWord);

    //make sure firstWord is not an empty string
    if (firstWord.trim() !== '') {
        // create a span element to wrap the firstWord in it
        let firstWordSpan = document.createElement('span');
        firstWordSpan.className = 'firstWord';
        firstWordSpan.textContent = firstWord;
        postContent.innerHTML = postText.replace (
            new RegExp(firstWord, 'i'),
            firstWordSpan.outerHTML
        );
        console.log(postContent.innerHTML);
    }
});
