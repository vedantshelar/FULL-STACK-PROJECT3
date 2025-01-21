let categoryMenuListMainContainer = document.querySelector('#categoryMenuListMainContainer');

categoryMenuListMainContainer.addEventListener('click',(event)=>{
    if(event.target.className.includes("fa-solid")){
        let addToCartBtn = event.target;
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