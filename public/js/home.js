let popularSectionMainContainer = document.querySelector('#popularSectionMainContainer');

popularSectionMainContainer.addEventListener('click',(event)=>{
    if(event.target.className.includes("fa-solid")){
        let addToCartBtn = event.target;
        let menuId = addToCartBtn.getAttribute('menuId');//menu id to be added to session and vice versa 
        if(event.target.className.includes("fa-plus")){
            addToCartBtn.classList.remove('fa-plus');
            addToCartBtn.classList.add('fa-minus');
            addToCartBtn.setAttribute('cart','added');
        }else if(event.target.className.includes("fa-minus")){
            addToCartBtn.classList.remove('fa-minus');
            addToCartBtn.classList.add('fa-plus');
            addToCartBtn.setAttribute('cart','removed');
        }
    }
})