let cartPaneMainContainer = document.querySelector('.cartPaneMainContainer');
let itemCount = cartPaneMainContainer.childElementCount;
let arrCount = [];
for (let i = 0; i < itemCount; i++) {
    arrCount.push(1);
}
determinePrice();

cartPaneMainContainer.addEventListener('click', function (event) {
    let currElement = event.target;
    if (currElement.className.includes('incrementQntyBtn')) {
        let currRootNodeNo = parseInt(currElement.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('itemNo'));
        let qntyElement = currElement.parentNode.previousElementSibling;
        let currElementPrice = currElement.parentNode.parentNode.previousElementSibling.querySelector('.cartPageQntyPrice');
        let currElementPriceInNumberFormat = parseInt(currElementPrice.getAttribute('itemPrice'));//original item price
        arrCount[currRootNodeNo] = arrCount[currRootNodeNo] + 1;
        qntyElement.setAttribute('qnty', arrCount[currRootNodeNo]);
        qntyElement.innerText = `${arrCount[currRootNodeNo]}`;
        currElementPrice.innerText = incrementItemPrice(currElementPriceInNumberFormat, arrCount[currRootNodeNo]);
    } else if (currElement.className.includes('decrementQntyBtn')) {
        let currRootNodeNo = parseInt(currElement.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('itemNo'));
        let qntyElement = currElement.parentNode.nextElementSibling;
        let currElementPrice = currElement.parentNode.parentNode.previousElementSibling.querySelector('.cartPageQntyPrice');
        let currElementPriceInNumberFormat = parseInt(currElementPrice.getAttribute('itemPrice'));//original item price
        let tempCurrElementPriceInNumberFormat = parseInt(currElementPrice.innerText);//current item price
        if (arrCount[currRootNodeNo] > 0) {
            arrCount[currRootNodeNo] = arrCount[currRootNodeNo] - 1;
            qntyElement.setAttribute('qnty', arrCount[currRootNodeNo]);
            qntyElement.innerText = `${arrCount[currRootNodeNo]}`;
            currElementPrice.innerText = decrementItemPrice(tempCurrElementPriceInNumberFormat, currElementPriceInNumberFormat);
        }
    }
    updateTotalItemPrice();
})

function incrementItemPrice(currPrice, counter) {
    return currPrice * counter;
}

function decrementItemPrice(currPrice, originalPrice) {
    return currPrice - originalPrice;
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

// full and half price selection 

function determinePrice() {
    let price = 0;
    let cartPageFUllPrices = document.querySelectorAll('.cartPageFUllPrice');
    let cartPageHalfPrices = document.querySelectorAll('.cartPageHalfPrice');
    for (cartPageFUllPrice of cartPageFUllPrices) {
        if (cartPageFUllPrice.checked) {
            cartPageFUllPrice.parentNode.parentNode.parentNode.querySelector('.cartPageQntyPrice').setAttribute('itemPrice', cartPageFUllPrice.value);
            //manage price with respect to menu quantity
            let qnty = parseInt(cartPageFUllPrice.parentNode.parentNode.parentNode.querySelector('.qnty').getAttribute('qnty'));
            cartPageFUllPrice.parentNode.parentNode.parentNode.querySelector('.cartPageQntyPrice').innerText = (cartPageFUllPrice.value * qnty);
        }
    }
    for (cartPageHalfPrice of cartPageHalfPrices) {
        if (cartPageHalfPrice.checked) {
            cartPageHalfPrice.parentNode.parentNode.parentNode.querySelector('.cartPageQntyPrice').setAttribute('itemPrice', cartPageHalfPrice.value);
            //manage price with respect to menu quantity
            let qnty = parseInt(cartPageHalfPrice.parentNode.parentNode.parentNode.querySelector('.qnty').getAttribute('qnty'));
            cartPageHalfPrice.parentNode.parentNode.parentNode.querySelector('.cartPageQntyPrice').innerText = (cartPageHalfPrice.value * qnty);
        }
    }
}

let cartPageFUllPrices = document.querySelectorAll('.cartPageFUllPrice');
let cartPageHalfPrices = document.querySelectorAll('.cartPageHalfPrice');

for (cartPageFUllPrice of cartPageFUllPrices) {
    cartPageFUllPrice.addEventListener('click', (event) => {
        determinePrice()
    })
}

for (cartPageHalfPrice of cartPageHalfPrices) {
    cartPageHalfPrice.addEventListener('click', (event) => {
        determinePrice()
    })
}
