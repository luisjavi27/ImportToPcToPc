
const electron = require('@electron/remote');
const remote = electron.remote

const closeBtn = document.getElementById('botonConfig')

closeBtn.addEventListener('click', function (event) {
    
    window.close();
})

