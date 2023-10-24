/**
 * The following code below will handle sending asynchronous request to the server
 * from the modal after the user has entered their email for processing
 */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enter_email_modal');
    form.addEventListener('submit', function (event){
        event.preventDefault();

        const email = document.getElementById('emailInput').value;

        xhr_object = new XMLHttpRequest();
        xhr_object.open('POST', '/auth/register', true);
        xhr_object.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr_object.onreadystatechange = function () {
            if(xhr_object.readyState === 4 && xhr_object.status === 200) {
                const response = JSON.parse(xhr_object.responseText);
                console.log(response);
                // Here we handle response from server
            }
        };
        const formData = 'email=' + email;
        xhr_object.send(formData);
    });
});
