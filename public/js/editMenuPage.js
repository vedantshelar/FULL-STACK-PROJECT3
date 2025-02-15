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
    displayMenusByMenuName(currSearchValue);
})

//categoy

category.addEventListener('change', () => {
    searchValue.value = '';
    displayMenusByMenuName('');
})

//type

type.addEventListener('change', () => {
    searchValue.value = '';
    displayMenusByMenuName('');
})

function displayMenusByMenuName(menuName) {
    let category = document.querySelector('#category').value;
    let type = document.querySelector('#type').value;
    let editMenuBoxes = document.querySelectorAll('.editMenuBox');
    for (editMenuBox of editMenuBoxes) {
        let editMenuBoxMenuName = editMenuBox.querySelector('.menuTitle').innerText;
        let editMenuBoxMenuCategory = editMenuBox.querySelector('.menuCategoryOption').innerText;
        let eidtMenuBoxMenuType = editMenuBox.getAttribute('type');
        if (category === 'all' && type === 'all') {
            if (menuName !== '') {
                if (editMenuBoxMenuName.includes(menuName)) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            } else {
                for (editMenuBox of editMenuBoxes) {
                    editMenuBox.style.display = 'flex';
                }
                break;
            }
        } else if (category !== 'all' && type === 'all') {
            if (menuName !== '') {
                if (editMenuBoxMenuName.includes(menuName) && editMenuBoxMenuCategory.includes(category)) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            } else {
                for (editMenuBox of editMenuBoxes) {
                    let editMenuBoxMenuCategory = editMenuBox.querySelector('.menuCategoryOption').innerText;
                    if (editMenuBoxMenuCategory.includes(category)) {
                        editMenuBox.style.display = 'flex';
                    } else {
                        editMenuBox.style.display = 'none';
                    }
                }
                break;
            }
        } else if (category === 'all' && type !== 'all') {
            if (menuName !== '') {
                if (editMenuBoxMenuName.includes(menuName) && eidtMenuBoxMenuType === type) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            } else {
                for (editMenuBox of editMenuBoxes) {
                    let eidtMenuBoxMenuType = editMenuBox.getAttribute('type');
                    if (eidtMenuBoxMenuType === type) {
                        editMenuBox.style.display = 'flex';
                    } else {
                        editMenuBox.style.display = 'none';
                    }
                }
                break;
            }
        } else if (category !== 'all' && type !== 'all') {
            if (menuName !== '') {
                if (editMenuBoxMenuName.includes(menuName) && editMenuBoxMenuCategory.includes(category) && eidtMenuBoxMenuType === type) {
                    editMenuBox.style.display = 'flex';
                } else {
                    editMenuBox.style.display = 'none';
                }
            } else {
                for (editMenuBox of editMenuBoxes) {
                    let editMenuBoxMenuCategory = editMenuBox.querySelector('.menuCategoryOption').innerText;
                    let eidtMenuBoxMenuType = editMenuBox.getAttribute('type');
                    if (editMenuBoxMenuCategory.includes(category) && eidtMenuBoxMenuType === type) {
                        editMenuBox.style.display = 'flex';
                    } else {
                        editMenuBox.style.display = 'none';
                    }
                }
                break;
            }
        }
    }
}

