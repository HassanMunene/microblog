/*==================================================================================
* This section handles the modal for post preview and posting content too
* ================================================================================*/
const close_btn = document.getElementById('close_btn');
const publishButton = document.getElementById('publishButton');
let titleContent = document.getElementById('postTitle');
let topicContent = document.getElementById('postTopic');
let postingTextArea = document.getElementById('postingTextArea');
const publishNowButton = document.getElementById('publishNowButton');

document.addEventListener('DOMContentLoaded', function () {
    function openModal(postingText) {
        let customModal = document.getElementById('customModal');
        customModal.style.display = 'flex';
        setTimeout(function () {
            customModal.classList.add('show');
        }, 100)
        console.log(postingText);
        document.body.style.overflow = 'hidden';

        publishNowButton.addEventListener('click', function () {
            titleContent = titleContent.value;
            topicContent = topicContent.value;
            console.log(titleContent, topicContent);
            submitForm(postingText, titleContent, topicContent);
        })
    }
    function closeModal () {
        let customModal = document.getElementById('customModal');
        customModal.classList.remove('show');
        setTimeout(function () {
            customModal.style.display = 'none';
        }, 3000)
        document.body.style.overflow = '';
    }

    // This function will send the post data to the server using fetch api
    function submitForm(postingText, title, topic) {
        //prepare data to be sent
        let data = {
            textData: postingText,
            title: title,
            topic: topic
        };
        // them make fetch api request
        fetch('/write', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else if (response.status === 200) {
                console.log(response)
            }
        })
        .then(response => {
            window.location.href='/'
        })
        .catch(error => {
            console.log('Yoo bro something is wrong with your fetch api');
        })
    }
    publishButton.addEventListener('click', function () {
        postingTextArea = postingTextArea.value;
        openModal(postingTextArea);
    });
    close_btn.addEventListener('click', closeModal);

    // when I click the publish now button I want to save the details of the title
    // and topic then pass the details to the submitForm() function. 
})