let statusbarRemoveBtn = document.querySelector('#statusbarRemoveBtn');
let statusbar = document.querySelector('#statusbar');

statusbarRemoveBtn.addEventListener('click',()=>{
    statusbar.remove();
})