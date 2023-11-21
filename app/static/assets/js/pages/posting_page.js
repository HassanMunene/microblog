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
        const label = document.getElementById('custom-file-input');
        const inputImageField = document.getElementById('post-image');
        const successButton = document.getElementById('success');
        const includeImgStm = document.getElementById('include-image');
        const successfullyIncludedStm = document.getElementById('Successfully-included');

        // this eventlistener will handle the moment the image is uploaded
        inputImageField.addEventListener('change', function(event) {
            const image = event.target.files[0];
            console.log(image);
            // the create a form object from FormData() and append the image as key/value pair
            // we will send the image to the server using fetch api once the user uploads it
            const formData = new FormData();
            formData.append('image', image);
            fetch('/upload_image', {
                method: 'POST',
                body: formData,
            })
            .then(function(response) {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                label.style.display = 'none';
                includeImgStm.style.display = 'none';
                setTimeout(function () {
                    successButton.style.display = 'block';
                    successfullyIncludedStm.style.display = 'block';
                }, 100)
            })
            .catch(function(error) {
                console.error('Error', error);
            });
        })

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
    // the data sent will be text, title and topic
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
    // when I click the publish btn in the post writing page I will capture the post
    // and then call the openModal() function while passing the post as an argument 
    publishButton.addEventListener('click', function () {
        postingTextArea = postingTextArea.value;
        openModal(postingTextArea);
    });
    close_btn.addEventListener('click', closeModal);
})