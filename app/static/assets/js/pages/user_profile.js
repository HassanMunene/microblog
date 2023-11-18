/*=============================================================
* This js file will be used to specifically the user_profile page
 =============================================================*/

 /*==============================================================
 * The function below will handle copying the link of the profile to clipbard
 =================================================================*/
 function copyProfileLink() {
  // we need to get the url we are copying first
  const profileUrl = window.location.href;
  console.log(`path is ${profileUrl}`);
  navigator.clipboard.writeText(profileUrl).then(function () {
    console.log('url copied' + profileUrl);
    showCustomAlert();
  }).catch(function(error) {
    console.error('Failed to capture the url to the clipboard.')
  })
 }

 /*=====================================================================
 * This function will handle showing and hiding custom alert
 =====================================================================
 function showCustomAlert() {
  const customAlert = document.getElementById('customAlert');
  customAlert.style.top = '1rem';

  // this is to hide the customAlert after a certain period
  setTimeout(function () { hideCustomAlert(); }, 2000);
 }
 function hideCustomAlert () {
  const customAlert = document.getElementById('customAlert');
  customAlert.style.top = '-100px';
 }
 // enable the close button to also hide the customAlert
 //document.getElementById('customAlertClose').addEventListener('click', function () {hideCustomAlert();});
 


 /*=====================================================================
 * The following below is a function that generates the popup alert
 ======================================================================
 //add an event listener to handle this function
 document.addEventListener('DOMContentLoaded', function () {
    const copyLinkToProfile = document.getElementById('copyLinkToProfile');
    //console.log(copyLinkToProfile);
    copyLinkToProfile.addEventListener('click', copyProfileLink);
 });
 */