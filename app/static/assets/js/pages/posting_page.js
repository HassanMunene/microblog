document.addEventListener('DOMContentLoaded', function () {
    const publishButton = document.getElementById('publishButton');
    console.log(publishButton);

    function submitForm() {
        const postingTextArea = document.getElementById('postingTextArea').value;
        console.log('Button clicked')
        //prepare data to be sent
        let data = {
            textData: postingTextArea
        }
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
            console('Yoo bro something is wrong with your fetch api')
        })
    }

    publishButton.addEventListener('click', submitForm);
})