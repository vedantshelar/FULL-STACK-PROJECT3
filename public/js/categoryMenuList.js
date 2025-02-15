//loading all cart info in body 

function loadCategoryMenuListCartInfo(){
    if(localStorage.getItem("cartInfo")){
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        let cartStatus = document.querySelectorAll('.cartStatus');
        for(singleCartStatus of cartStatus){
            let menuId = singleCartStatus.getAttribute('menuId');
            if(cartInfo.includes(menuId)){
                singleCartStatus.classList.remove('fa-plus');
                singleCartStatus.classList.add('fa-minus');
                singleCartStatus.setAttribute('cart','added');
            }else{
                singleCartStatus.classList.remove('fa-minus');
                singleCartStatus.classList.add('fa-plus');
                singleCartStatus.setAttribute('cart','removed');
            }
        }
    }
}

let categoryMenuListMainContainer = document.querySelector('#categoryMenuListMainContainer');

categoryMenuListMainContainer.addEventListener('click',(event)=>{
    if(event.target.className.includes("fa-solid")){
        let addToCartBtn = event.target;
        let menuId = addToCartBtn.getAttribute('menuId');//menu id to be added to session and vice versa 
        console.log(menuId)
        if(event.target.className.includes("fa-plus")){
            //adding menu to session 
            addMenuToCart(menuId);
            addToCartBtn.classList.remove('fa-plus');
            addToCartBtn.classList.add('fa-minus');
            addToCartBtn.setAttribute('cart','added');
        }else if(event.target.className.includes("fa-minus")){
            //removing menu to session 
            removeMenuFromCart(menuId);
            addToCartBtn.classList.remove('fa-minus');
            addToCartBtn.classList.add('fa-plus');
            addToCartBtn.setAttribute('cart','removed');
        }
    }
})