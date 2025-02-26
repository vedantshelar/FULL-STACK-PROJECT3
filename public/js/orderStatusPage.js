async function deleteOrder(event){
    const orderId = event.getAttribute('orderId');
    let response = await axios.delete(`/user/order/${orderId}/delete`);
    alert('order has be removed');
    if(response.data.redirectRoute.endsWith('/orderStatus')){
        window.location.reload();
    }else{
        window.location.href = response.data.redirectRoute;
    }
}   
