let menuCategory = menu.category;
let menuType = menu.type;
let MenuisBestSelling = menu.isBestSelling;

let category = document.querySelector('#category');

for(c of category){
    if(c.value===menuCategory){
        c.selected=true;
    }else{
        c.selected=false;
    }
}

let type = document.querySelector('#type');

for(t of type){
    if(t.value===menuType){
        t.selected=true;
    }else{
        t.selected=false;
    }
}

let isBestSelling = document.querySelector('#isBestSelling');

if(MenuisBestSelling){
    isBestSelling.options[0].selected=true;
    isBestSelling.options[1].selected=false;
}else{
    isBestSelling.options[0].selected=false;
    isBestSelling.options[1].selected=true;
}