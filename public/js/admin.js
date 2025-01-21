const ctx = document.getElementById('revenueGraph');
 new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','Agust','September','November','December'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 300, 55, 66,100,0,400,40],
          fill: true,
          borderColor: 'black',
          tension: 0.1
        }]
      },
    options: { 
         responsive: true, // Makes the chart responsive
      maintainAspectRatio: false,
        scales: {
            y: { 
                stacked: true
            }
        }
    }
}); 

const ctx2 = document.getElementById('revenueGraph2');

new Chart(ctx2, {
  type: 'line',
  data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June','July','Agust','September','November','December'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 300,55],
        fill: true,
        borderColor: 'black',
        tension: 0.1
      }]
    },
  options: { 
       responsive: true, // Makes the chart responsive
    maintainAspectRatio: false,
      scales: {
          y: {
              stacked: true
          }
      }
  }
}); 

const ctx3 = document.getElementById('revenueGraph3');

new Chart(ctx3, {
  type: 'line',
  data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June','July','Agust','September','November','December'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 300,55,44,22,5,0],
        fill: true,
        borderColor: 'black',
        tension: 0.1
      }]
    },
  options: { 
       responsive: true, // Makes the chart responsive
    maintainAspectRatio: false,
      scales: {
          y: {
              stacked: true
          }
      }
  }
}); 

const ctx4 = document.getElementById('revenueGraph4');

new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: [
      'Category1',
      'Category2',
      'Category3'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  },
  options: { 
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Keep legend visible (optional)
      }
    },
    layout: {
      padding: 0 // No extra padding
    },
    scales: {
      // Remove unnecessary axes for doughnut chart
    }
  }
});

const ctx5 = document.getElementById('revenueGraph5');

new Chart(ctx5, {
  type: 'doughnut',
  data: {
    labels: [
      'Menu1',
      'Menu2',
      'Menu3'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 550, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  },
  options: { 
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Keep legend visible (optional)
      }
    },
    layout: {
      padding: 0 // No extra padding
    },
    scales: {
      // Remove unnecessary axes for doughnut chart
    }
  }
});


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