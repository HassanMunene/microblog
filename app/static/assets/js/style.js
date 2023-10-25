/**
 * The following code below will handle sending asynchronous request to the server
 * from the modal after the user has entered their email for processing
 */
document.addEventListener('DOMContentLoaded', function () {
    const modal1 = document.getElementById('enter_email_modal');
    const modal1a = new bootstrap.Modal(document.getElementById('enter_email_modal'));

    const modal2 = document.getElementById('email_sent_modal');
    const modal2a = new bootstrap.Modal(document.getElementById('email_sent_modal'));

    modal1.addEventListener('submit', function (event){
        event.preventDefault();

        const email = document.getElementById('emailInput').value;

        xhr_object = new XMLHttpRequest();
        xhr_object.open('POST', '/auth/submit_email', true);
        xhr_object.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr_object.onreadystatechange = function () {
            if(xhr_object.readyState === 4 && xhr_object.status === 200) {
                const response = JSON.parse(xhr_object.responseText);
                console.log(response);

                //we hide modal for entering email and show a modal showing email has been sent
                if (response.success) {
                    setTimeout(() => { modal1a.hide();}, 50)
                    modal2a.show();
                }
            }
        };
        const formData = 'email=' + email;
        xhr_object.send(formData);
    });
});
