/*========================================================================================
* =CONTROL THE BEHAVIOUR OF DROPDOWN ELEMENT That is clicked on profile container==========================
====================================================================================*/

document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.getElementById('profile-button');
    const dropDownElement = document.getElementById('dropdown-element');

    profileButton.addEventListener("click", function(event) {
        event.stopPropagation();

        if (dropDownElement.style.display === 'none' || dropDownElement.style.display === '') {
            dropDownElement.style.display = 'block';
        } else {
            dropDownElement.style.display = 'none';
        }
    });

    // add click event to the entire window to close dropdown
    document.addEventListener('click', function () {
        dropDownElement.style.display = 'none';
    });
    // prevent click within the dropdown container from closing it
    dropDownElement.addEventListener('click', function (event) {
        event.stopPropagation();
    })
})

