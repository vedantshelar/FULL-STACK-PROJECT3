// to display nav bar selected option 

const links = document.querySelectorAll('.adminMenus');
links.forEach(link => {
  // console.log(window.location.href)
  if (link.href === window.location.href) {
    link.classList.add('activeNavOption');
    link.getElementsByTagName('i')[0].style.color = 'rgb(222, 168, 255)';
  }
});

setInterval(() => {
  // Refresh the current page
  window.location.reload();
}, 60000);//run in every one minute 

async function startOrder(event){
  try {
    const orderId = event.getAttribute('orderId');
    await axios.put(`/admin/${orderId}/start`, {orderId:orderId});
    window.location.reload();
  } catch (error) {
    alert('error orccured');
    console.log(error);
  }
}

async function cancelOrder(event) {
  try {
    if(confirm('are you sure')){
      const orderId = event.getAttribute('orderId');
      await axios.delete(`/admin/${orderId}/destroy`);
      window.location.reload();
    }
  } catch (error) {
    alert('error orccured');
    console.log(error);
  }
}

async function completeOrder(event) {
  try {
      const orderId = event.getAttribute('orderId');
      await axios.post(`/admin/${orderId}/complete`);
      window.location.reload();
  } catch (error) {
    alert('error orccured');
    console.log(error);
  }
}