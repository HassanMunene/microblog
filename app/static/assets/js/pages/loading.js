document.addEventListener('DOMContentLoaded', function () {
    const loadingBar = document.getElementById('loading-bar');

    if (loadingBar) {
        loadingBar.style.width = '100%';
        setTimeout(function () {
            window.location.href = '/';
        }, 5000)
    }
})
