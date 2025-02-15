//loading all cart info in body 
let individualMenuPageAddToCartContainerAddToCartBtn = document.querySelector('#individualMenuPageAddToCartContainerAddToCartBtn');
function loadIndividualMenuCartInfo(){
    if(localStorage.getItem("cartInfo")){
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        let menuId = individualMenuPageAddToCartContainerAddToCartBtn.getAttribute('menuId');
        if(cartInfo.includes(menuId)){
            individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','added');
            individualMenuPageAddToCartContainerAddToCartBtn.innerText='Remove from cart';
        }else{
            individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','removed');
            individualMenuPageAddToCartContainerAddToCartBtn.innerText='Add to cart';
        }
    }
}

// toggle detail and ingredients feature 

let DetailsBtn = document.querySelector('#DetailsBtn');
let IngredientsBtn = document.querySelector('#IngredientsBtn');
let DetailsContent = document.querySelector('#DetailsContent');
let IngredientsContent = document.querySelector('#IngredientsContent');

DetailsBtn.addEventListener('click',()=>{
    DetailsBtn.style.borderBottom='5px solid var(--bold-price-color)';
    DetailsBtn.style.color='#2F3438';
    IngredientsBtn.style.color='#2f3438c5';
    IngredientsBtn.style.borderBottom='none';
    DetailsContent.style.display='block';
    IngredientsContent.style.display='none';
})

IngredientsBtn.addEventListener('click',()=>{
    IngredientsBtn.style.borderBottom='5px solid var(--bold-price-color)';
    IngredientsBtn.style.color='#2F3438';
    DetailsBtn.style.color='#2f3438c5';
    DetailsBtn.style.borderBottom='none';
    IngredientsContent.style.display='block';
    DetailsContent.style.display='none';
})

// toggle add to cart button feature

individualMenuPageAddToCartContainerAddToCartBtn.addEventListener('click',()=>{
    let menuId = individualMenuPageAddToCartContainerAddToCartBtn.getAttribute('menuId');
    let currCartStatus = individualMenuPageAddToCartContainerAddToCartBtn.getAttribute('cart');
    if(currCartStatus==='removed'){
        //adding menu to session 
        addMenuToCart(menuId);
        individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','added');
        individualMenuPageAddToCartContainerAddToCartBtn.innerText='Remove from cart';
        alert('menu added to cart');
    }else if(currCartStatus==='added'){
        //removing menu to session 
        removeMenuFromCart(menuId);
        individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','removed');
        individualMenuPageAddToCartContainerAddToCartBtn.innerText='Add to cart';
        alert('menu removed from cart');
    }
})