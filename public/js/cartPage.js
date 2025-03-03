//initialise function which load menus which are added to cart and compute menu price based on quantity

function loadCartMenusAndUpdateTotalItemPrice() {
    loadCartMenus().then((res) => {
        hideHalfPriceForSomeCategory();
        changeTheTotalPirceBasedOnHalfAndFullDish();
        updateTotalItemPrice();
    })
}

//load menus which are added to cart

async function loadCartMenus() {
    try {
        if (localStorage.getItem("cartInfo") && localStorage.getItem("cartInfo").length > 0) {
            const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
            const newPostRequest = {
                cartInfo: cartInfo
            }
            const menus = await axios.post(`${websiteRootUrl}/user/getMenusData`, newPostRequest);
            if (menus.data != 'noMenusAddedToCart') {
                let categoryMenuListMainContainer = document.querySelector('#categoryMenuListMainContainer');
                let i = 0;
                for (menu of menus.data) {
                    let menuElement = document.createElement('div');
                    menuElement.setAttribute('itemNo', i);
                    menuElement.setAttribute('menuId', menu._id);
                    menuElement.setAttribute('category',menu.category);
                    menuElement.classList.add('categoryMenuListBox');
                    menuElement.classList.add('cartPageMenuListBox');
                    if (menu.type === 'veg') {
                        menuElement.innerHTML = `<a class="categoryMenuListInnerBox1" href="/user/menu/${menu._id}">
                        <img src="${menu.menuImg}" alt="img">
                    </a>
                    <div class="categoryMenuListInnerBox2">
                        <a class="categoryMenuListBoxMenuInfo" href="/user/menu/${menu._id}">
                            <p class="categoryMenuListBoxMenuTitle">${menu.menuName} <img src="/assets/veg.png" alt="veg" width="40px" style="margin-left: 5px; margin-top: 5px; display: block;"> <img src="/assets/nonVeg.png" alt="veg" width="40px" style="margin-left: 5px; margin-top: 5px; display: none;"></p>
                            <p class="categoryMenuListBoxMenuDescription">
                                ${menu.description.slice(0,70)}...
                            </p>
                        </a>
                        <div class="cartPagePriceContainer">
                            <div>
                                <input type="radio" name="price${i}" value="${menu.fullFrontPrice}" class="cartPageFUllPrice" checked>
                                <span>${menu.fullFrontPrice}/Full</span>
                            </div> 
                            <div class="halfPriceContainer">
                                <input type="radio" name="price${i}" value="${menu.halfFrontPrice}" class="cartPageHalfPrice">
                                <span>${menu.halfFrontPrice}/Half</span>
                            </div>
                        </div>
                        <div class="cartPageCookingRequestBox"> 
                            <input type="text" name="cookingRequest" placeholder="cooking request if any">
                        </div>
                        <div class="categoryMenuListBoxMenuPriceSection">
                            <div>
                                <i class="fa-solid fa-indian-rupee-sign"></i><span class="cartPageQntyPrice"
                                    itemPrice="${menu.fullFrontPrice}">${menu.fullFrontPrice}</span>
                            </div>
                            <div class="cartPageQntyController">
                                <span><i class="fa-solid fa-square-minus decrementQntyBtn" onclick="handleQnty(this,1)"></i></span>
                                <span class="qnty" qnty="1">1</span>
                                <span><i class="fa-solid fa-square-plus incrementQntyBtn" onclick="handleQnty(this,2)"></i></span>
                            </div>
                        </div>
                    </div>`;
                    } else {
                        menuElement.innerHTML = `<a class="categoryMenuListInnerBox1" href="/user/menu/${menu._id}">
                        <img src="${menu.menuImg}" alt="">
                    </a>
                    <div class="categoryMenuListInnerBox2">
                        <a class="categoryMenuListBoxMenuInfo" href="/user/menu/${menu._id}">
                            <p class="categoryMenuListBoxMenuTitle">${menu.menuName} <img src="/assets/veg.png" alt="veg" width="40px" style="margin-left: 5px; margin-top: 5px; display: none;"> <img src="/assets/nonVeg.png" alt="veg" width="40px" style="margin-left: 5px; margin-top: 5px; display: block;"></p>
                            <p class="categoryMenuListBoxMenuDescription">
                                ${menu.description.slice(0,70)}...
                            </p>
                        </a>
                        <div class="cartPagePriceContainer">
                            <div>
                                <input type="radio" name="price${i}" value="${menu.fullFrontPrice}" class="cartPageFUllPrice" checked>
                                <span>${menu.fullFrontPrice}/Full</span>
                            </div> 
                            <div>
                                <input type="radio" name="price${i}" value="${menu.halfFrontPrice}" class="cartPageHalfPrice">
                                <span>${menu.halfFrontPrice}/Half</span>
                            </div>
                        </div>
                        <div class="cartPageCookingRequestBox"> 
                            <input type="text" name="cookingRequest" placeholder="cooking request if any">
                        </div>
                        <div class="categoryMenuListBoxMenuPriceSection">
                            <div>
                                <i class="fa-solid fa-indian-rupee-sign"></i><span class="cartPageQntyPrice"
                                    itemPrice="${menu.fullFrontPrice}">${menu.fullFrontPrice}</span>
                            </div>
                            <div class="cartPageQntyController">
                                <span><i class="fa-solid fa-square-minus decrementQntyBtn" onclick="handleQnty(this,1)"></i></span>
                                <span class="qnty" qnty="1">1</span>
                                <span><i class="fa-solid fa-square-plus incrementQntyBtn" onclick="handleQnty(this,2)"></i></span>
                            </div>
                        </div>
                    </div>`;
                    }
                    categoryMenuListMainContainer.append(menuElement);
                    i = i + 1;
                }
            } else {
                categoryMenuListMainContainer.innerHTML = "<h1>No Menu In Cart</h1>";
                document.querySelector('#placeOrderContainer').style.display='none';
            }
        } else {
            categoryMenuListMainContainer.innerHTML = "<h1>No Menu In Cart</h1>";
            document.querySelector('#placeOrderContainer').style.display='none';
        }
    } catch (error) {
        console.log(error);
    }
}

function updateTotalItemPrice() {
    let categoryMenuListBoxes = document.querySelectorAll('.categoryMenuListBox');
    let totalItemPrice = document.querySelector('#TotalItemPrice');
    let tempTotalItemPrice = 0;
    for (categoryMenuListBox of categoryMenuListBoxes) {
        let currMenuItemPrice = parseInt(categoryMenuListBox.querySelector('.cartPageQntyPrice').innerText);
        tempTotalItemPrice += currMenuItemPrice;
    }
    totalItemPrice.innerHTML = `Total : <i class="fa-solid fa-indian-rupee-sign"></i><span>${tempTotalItemPrice}</span>`;
}

//this is function works when quantity price is increment or decrement 

function changeTheTotalPirceBasedOnQnty() {
    let cartPageMenuListBoxes = document.querySelectorAll('.cartPageMenuListBox');
    for (categoryMenuListBox of cartPageMenuListBoxes) {
        let cartPageFUllPriceNode = categoryMenuListBox.querySelector('.cartPageFUllPrice');
        let cartPageHalfPriceNode = categoryMenuListBox.querySelector('.cartPageHalfPrice');
        let mainPrice = categoryMenuListBox.querySelector('.cartPageQntyPrice');
        if (cartPageFUllPriceNode.checked) {
            let currQnty = parseInt(categoryMenuListBox.querySelector('.qnty').getAttribute('qnty'));
            let fullPriceInNumber = parseInt(cartPageFUllPriceNode.value);
            mainPrice.setAttribute('itemPrice', currQnty * fullPriceInNumber);
            mainPrice.innerText = currQnty * fullPriceInNumber;
            updateTotalItemPrice();
        }
        if (cartPageHalfPriceNode.checked) {
            let currQnty = parseInt(categoryMenuListBox.querySelector('.qnty').getAttribute('qnty'));
            let halfPriceInNumber = parseInt(cartPageHalfPriceNode.value);
            mainPrice.setAttribute('itemPrice', currQnty * halfPriceInNumber);
            mainPrice.innerText = currQnty * halfPriceInNumber;
            updateTotalItemPrice();
        }
    }
}

//this function works when full or half option is selected

function changeTheTotalPirceBasedOnHalfAndFullDish() {
    let cartPageFUllPrices = document.querySelectorAll('.cartPageFUllPrice');
    let cartPageHalfPrices = document.querySelectorAll('.cartPageHalfPrice');
    for (cartPageFUllPrice of cartPageFUllPrices) {
        cartPageFUllPrice.addEventListener('change', (event) => {
            let currItemPriceElement = event.target;
            let categoryMenuListInnerBox2 = currItemPriceElement.parentNode.parentNode.parentNode;
            let qnty = categoryMenuListInnerBox2.querySelector('.qnty').getAttribute('qnty');
            let currItemFullPrice = event.target.value;
            let mainPrice = categoryMenuListInnerBox2.querySelector('.cartPageQntyPrice');
            let tempMainPrice = 0;
            qnty = parseInt(qnty);
            currItemFullPrice = parseInt(currItemFullPrice);
            tempMainPrice = qnty * currItemFullPrice;
            mainPrice.setAttribute('itemPrice', tempMainPrice);
            mainPrice.innerText = tempMainPrice;
            updateTotalItemPrice();
        })
    }
    for (cartPageHalfPrice of cartPageHalfPrices) {
        cartPageHalfPrice.addEventListener('change', (event) => {
            let currItemPriceElement = event.target;
            let categoryMenuListInnerBox2 = currItemPriceElement.parentNode.parentNode.parentNode;
            let qnty = categoryMenuListInnerBox2.querySelector('.qnty').getAttribute('qnty');
            let currItemHalfPrice = event.target.value;
            let mainPrice = categoryMenuListInnerBox2.querySelector('.cartPageQntyPrice');
            let tempMainPrice = 0;
            qnty = parseInt(qnty);
            currItemHalfPrice = parseInt(currItemHalfPrice);
            tempMainPrice = qnty * currItemHalfPrice;
            mainPrice.setAttribute('itemPrice', tempMainPrice);
            mainPrice.innerText = tempMainPrice;
            updateTotalItemPrice();
        })
    }
}

// handling quantity 

function handleQnty(currQntyBtn, num) {
    let cartPageQntyController = currQntyBtn.parentNode.parentNode;
    if (num == 1) {
        let qntyNode = cartPageQntyController.querySelector('.qnty');
        let qntyInNumber = parseInt(qntyNode.getAttribute('qnty'));
        if (qntyInNumber >= 1) {
            qntyInNumber = qntyInNumber - 1;
            qntyNode.setAttribute('qnty', qntyInNumber);
            qntyNode.innerText = qntyInNumber;
            changeTheTotalPirceBasedOnQnty()
        }
    } else if (num == 2) {
        let qntyNode = cartPageQntyController.querySelector('.qnty');
        let qntyInNumber = parseInt(qntyNode.getAttribute('qnty'));
        qntyInNumber = qntyInNumber + 1;
        qntyNode.setAttribute('qnty', qntyInNumber);
        qntyNode.innerText = qntyInNumber;
        changeTheTotalPirceBasedOnQnty()
    }
}

let placeOrderBtn = document.querySelector('#placeOrderBtn');

placeOrderBtn.addEventListener('click',async (event)=>{
    if (localStorage.getItem("cartInfo") && localStorage.getItem("cartInfo").length > 0) {
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        let tableNo = parseInt(document.querySelector('#tableNo').value);
        let orderDetails = [];
        let menuItems = document.querySelectorAll('.cartPageMenuListBox');
        for(menuItem of menuItems){
            let singleOrderDetail = {};
            singleOrderDetail.menuId = menuItem.getAttribute('menuId');
            singleOrderDetail.isFullPlate=menuItem.querySelector('.cartPageFUllPrice').checked;
            singleOrderDetail.qnty=parseInt(menuItem.querySelector('.qnty').getAttribute('qnty'));
            singleOrderDetail.cookingRequest= menuItem.querySelector('.cartPageCookingRequestBox input').value;
            singleOrderDetail.userId=user._id;
            singleOrderDetail.tableNo=tableNo;//fetch the table number dynamically
            if(singleOrderDetail.qnty>0){
                orderDetails.push(singleOrderDetail);
            }
        }
        const response = await axios.post(`${websiteRootUrl}/user/${user._id}/${tableNo}/placeOrder`, {orderDetails});
        localStorage.setItem("cartInfo",JSON.stringify([]));
        window.location.href=response.data.redirectUrl;
    }
})

function hideHalfPriceForSomeCategory(){
    let menuItems = document.querySelectorAll('.cartPageMenuListBox');
    for(menuItem of menuItems){
        let menuCategory = menuItem.getAttribute('category');
        if(menuCategory=='drink' || menuCategory=='burger' || menuCategory=='sandwich' || menuCategory=='pizza'){
            menuItem.querySelector('.halfPriceContainer').style.visibility='hidden';
        }
    }
}