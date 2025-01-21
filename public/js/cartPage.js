let cartPaneMainContainer = document.querySelector('.cartPaneMainContainer');
let itemCount = cartPaneMainContainer.childElementCount;
let arrCount = [];
for (let i = 0; i < itemCount; i++) {
    arrCount.push(1);
} 

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

