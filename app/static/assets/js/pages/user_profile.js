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
 * The following below is a function that generates the popup alert
 ======================================================================
 //add an event listener to handle this function
 document.addEventListener('DOMContentLoaded', function () {
    const copyLinkToProfile = document.getElementById('copyLinkToProfile');
    //console.log(copyLinkToProfile);
    copyLinkToProfile.addEventListener('click', copyProfileLink);
 });
 */