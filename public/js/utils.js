//function to add menu to cart 
function addMenuToCart(menuId){
    if(!localStorage.getItem("cartInfo")){
        let cartInfo = [menuId];
        localStorage.setItem("cartInfo",JSON.stringify(cartInfo));
    }else{
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        cartInfo.push(menuId);
        localStorage.setItem("cartInfo",JSON.stringify(cartInfo));
    }
} 

//function to remove menu to cart
function removeMenuFromCart(menuIdToBeDeleted){
    if(localStorage.getItem("cartInfo")){
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const modifiedCartInfo = cartInfo.filter((menuId)=>{
            if(menuId===menuIdToBeDeleted){
                return false;
            }else{
                return true;
            }
        })
        localStorage.setItem("cartInfo",JSON.stringify(modifiedCartInfo));
    }
}