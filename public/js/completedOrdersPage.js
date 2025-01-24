// to display nav bar selected option 

const links = document.querySelectorAll('.adminMenus');
  links.forEach(link => {
    console.log("a : "+link);
    console.log("b : "+window.location.href)
    // console.log(window.location.href)
    if (link.href === window.location.href) {
      link.classList.add('activeNavOption');
      link.getElementsByTagName('i')[0].style.color='rgb(222, 168, 255)';
    }
  }); 