// to display nav bar selected option 

let searchValue = document.querySelector('#search');
let category = document.querySelector('#category');
let type = document.querySelector('#type');

const links = document.querySelectorAll('.adminMenus');
links.forEach(link => {
    // console.log(window.location.href)
    if (link.href === window.location.href) {
        link.classList.add('activeNavOption');
        link.getElementsByTagName('i')[0].style.color = 'rgb(222, 168, 255)';
    }
});

// search feature

searchValue.addEventListener('input', (event) => {
    let currSearchValue = event.target.value;
    displayMenusByMenuName(currSearchValue)
})

function displayMenusByMenuName(menuNameToBeSearched) {
    let editMenuBoxes = document.querySelectorAll('.editMenuBox');
    for (editMenuBox of editMenuBoxes) {
        let menuName = editMenuBox.querySelector('.menuTitle').innerText.toLowerCase();
        if (menuName.includes(menuNameToBeSearched)) {
            if (category.value === 'all') {
                if (type.value === 'all') {
                    editMenuBox.style.display = 'flex';
                } else {
                    if (type.value === 'veg') {
                        let veg = editMenuBox.querySelector('.veg');
                        if (veg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    } else if (type.value === 'nonVeg') {
                        let nonveg = editMenuBox.querySelector('.nonveg');
                        if (nonveg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    }
                }
            } else {
                if (editMenuBox.querySelector('.menuCategoryOption').innerText.includes(category.value)) {
                    if (type.value === 'veg') {
                        let veg = editMenuBox.querySelector('.veg');
                        if (veg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    } else if (type.value === 'nonVeg') {
                        let nonveg = editMenuBox.querySelector('.nonveg');
                        if (nonveg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    }
                } else {
                    editMenuBox.style.display = 'none';
                }
            }
        } 
        else {
            editMenuBox.style.display = 'none';
        }
    }
}

category.addEventListener('change', () => {
    searchValue.value='';
    let categoryValue = category.value;// category value to be searched
    let editMenuBoxes = document.querySelectorAll('.editMenuBox');
    for (editMenuBox of editMenuBoxes) {
        let menuCategory = editMenuBox.querySelector('.menuCategoryOption').innerText.toLowerCase(); // menus category
        if (categoryValue === 'all') {
            if (type.value === 'all') {
                editMenuBox.style.display = 'flex';
            } else {
                if (type.value === 'veg') {
                    let veg = editMenuBox.querySelector('.veg');
                    if (veg.style.display === 'block') {
                        editMenuBox.style.display = 'flex';
                    } else {
                        editMenuBox.style.display = 'none';
                    }
                } else if (type.value === 'nonVeg') {
                    let nonveg = editMenuBox.querySelector('.nonveg');
                    if (nonveg.style.display === 'block') {
                        editMenuBox.style.display = 'flex';
                    } else {
                        editMenuBox.style.display = 'none';
                    }
                }
            }
        } else {
            if (menuCategory.includes(categoryValue)) {
                if (type.value === 'all') {
                    editMenuBox.style.display = 'flex';
                } else {
                    if (type.value === 'veg') {
                        let veg = editMenuBox.querySelector('.veg');
                        if (veg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    } else if (type.value === 'nonVeg') {
                        let nonveg = editMenuBox.querySelector('.nonveg');
                        if (nonveg.style.display === 'block') {
                            editMenuBox.style.display = 'flex';
                        } else {
                            editMenuBox.style.display = 'none';
                        }
                    }
                }
            } else {
                editMenuBox.style.display = 'none';
            }
        }
    }
})



type.addEventListener('change', () => {
    searchValue.value='';
    let typeValue = type.value;
    let editMenuBoxes = document.querySelectorAll('.editMenuBox');
    for (editMenuBox of editMenuBoxes) {
        if (typeValue === 'all') {
            if (category.value === 'all') {
                editMenuBox.style.display = 'flex';
            } else {
                if (editMenuBox.querySelector('.menuCategoryOption').innerText.includes(category.value)) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            }
        } else {
            if (typeValue === 'veg') {
                let veg = editMenuBox.querySelector('.veg');
                if (veg.style.display === 'block' && (editMenuBox.querySelector('.menuCategoryOption').innerText.includes(category.value) || category.value === 'all')) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            } else if (typeValue === 'nonVeg') {
                let nonveg = editMenuBox.querySelector('.nonveg');
                if (nonveg.style.display === 'block' && (editMenuBox.querySelector('.menuCategoryOption').innerText.includes(category.value) || category.value === 'all')) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            }
        }
    }
})