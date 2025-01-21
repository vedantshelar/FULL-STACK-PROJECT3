let bar = document.querySelector('#bar');
let cart = document.querySelector('#cart');
let innerNavbarBox2 = document.querySelector('.innerNavbarBox2');


bar.addEventListener('click',()=>{
    innerNavbarBox2.classList.toggle('active');
})
