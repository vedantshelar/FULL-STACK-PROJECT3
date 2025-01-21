let search = document.querySelector('#search');

search.addEventListener('input',function(event){
    let searchValue = event.target.value.toLowerCase();

    let categoryMenuListBoxMenuTitles = document.querySelectorAll('.categoryMenuListBoxMenuTitle');
    for(categoryMenuListBoxMenuTitle of categoryMenuListBoxMenuTitles){
        let currentCategoryMenuListBox = categoryMenuListBoxMenuTitle.parentNode.parentNode.parentNode;
        let menuItemTitle = categoryMenuListBoxMenuTitle.textContent;
        menuItemTitle = menuItemTitle.toLowerCase();
        if(menuItemTitle.includes(searchValue)){
            currentCategoryMenuListBox.style.display='flex';
        }else{
            currentCategoryMenuListBox.style.display='none';
        }
    }
}) 