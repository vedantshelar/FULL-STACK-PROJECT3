let popularSectionMainContainer = document.querySelector('#popularSectionMainContainer');

//loading all cart info in body 

function loadHomeCartInfo(){
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

popularSectionMainContainer.addEventListener('click',(event)=>{
    if(event.target.className.includes("fa-solid")){
        let addToCartBtn = event.target;
        let menuId = addToCartBtn.getAttribute('menuId');//menu id to be added to session and vice versa 
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


let search = document.querySelector('#search');

search.addEventListener('input',(e)=>{
let searchValue = e.target.value.toLowerCase();
    searchMenuByName(searchValue);
})

function searchMenuByName(name){
    let popularSectionMenuItemBox = document.querySelectorAll('.popularSectionMenuItemBox');
    for(menu of popularSectionMenuItemBox){
        let menuName = menu.getAttribute('menuName');
        if(menuName.includes(name)){
            menu.style.display='flex';
        }else{
            menu.style.display='none';
        }
    }
}