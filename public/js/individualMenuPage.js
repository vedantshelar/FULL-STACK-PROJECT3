// toggle detail and ingredients feature 

let DetailsBtn = document.querySelector('#DetailsBtn');
let IngredientsBtn = document.querySelector('#IngredientsBtn');
let DetailsContent = document.querySelector('#DetailsContent');
let IngredientsContent = document.querySelector('#IngredientsContent');
let individualMenuPageAddToCartContainerAddToCartBtn = document.querySelector('#individualMenuPageAddToCartContainerAddToCartBtn');

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
    let currCartStatus = individualMenuPageAddToCartContainerAddToCartBtn.getAttribute('cart');
    if(currCartStatus==='removed'){
        individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','added');
        individualMenuPageAddToCartContainerAddToCartBtn.innerText='Remove from cart';
        alert('menu added to cart');
    }else if(currCartStatus==='added'){
        individualMenuPageAddToCartContainerAddToCartBtn.setAttribute('cart','removed');
        individualMenuPageAddToCartContainerAddToCartBtn.innerText='Add to cart';
        alert('menu removed from cart');
    }
})