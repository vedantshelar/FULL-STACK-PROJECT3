var ctx;//graph 1 instance
var ctx1;//graph 2 instance
var ctx2;//graph 3 instance

function load() {
  setTotalGrossProfitAndTotalProfitLabelValue();
  setDailyGrossProfitLabelValue();
  setMonthlyGrossProfitLabelValue();
  setWeeklyGrossProfitLabelValue();
  setDailyProfitLabelValue();
  setMonthlyProfitLabelValue();
  setWeeklyProfitLabelValue();
  displayTotalGrossProfitGraph();
  displayMonthlyGrossProfitGraph();
  displayMonthlyProfitGraph();
  displayTopThreeCategoryGraph();
  displayTopThreeMenuGraph();
}

// to display nav bar selected option 

const links = document.querySelectorAll('.adminMenus');
links.forEach(link => {
  // console.log(window.location.href)
  if (link.href === window.location.href) {
    link.classList.add('activeNavOption');
    link.getElementsByTagName('i')[0].style.color = 'rgb(222, 168, 255)';
  }
});

//1 graph work

async function displayTotalGrossProfitGraph() {
  const TotalGrossProfitGraph = document.getElementById('revenueGraph');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalGrossProfitDataForGraph = { "2020": 0, "2021": 0, "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0, "2027": 0, "2028": 0, "2029": 0, "2030": 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    totoalGrossProfitDataForGraph[orderYear] += order.orderGrossProfit;
  }

  // Destroy the old chart if it exists
  if (ctx) {
    ctx.destroy();
  }

  ctx = new Chart(TotalGrossProfitGraph, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [{
        label: 'Total Gross Profit',
        data: [totoalGrossProfitDataForGraph["2020"], totoalGrossProfitDataForGraph["2021"], totoalGrossProfitDataForGraph["2022"], totoalGrossProfitDataForGraph["2023"], totoalGrossProfitDataForGraph["2024"], totoalGrossProfitDataForGraph["2025"], totoalGrossProfitDataForGraph["2026"], totoalGrossProfitDataForGraph["2027"], totoalGrossProfitDataForGraph["2028"], totoalGrossProfitDataForGraph["2029"], totoalGrossProfitDataForGraph["2030"]],
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
}

async function displayTotalProfitGraph() {
  const TotalProfitGrap = document.getElementById('revenueGraph');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalProfitDataForGraph = { "2020": 0, "2021": 0, "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0, "2027": 0, "2028": 0, "2029": 0, "2030": 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    totoalProfitDataForGraph[orderYear] += order.orderProfit;
  }

  // Destroy the old chart if it exists
  if (ctx) {
    ctx.destroy();
  }

  ctx = new Chart(TotalProfitGrap, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [{
        label: 'Total Gross Profit',
        data: [totoalProfitDataForGraph["2020"], totoalProfitDataForGraph["2021"], totoalProfitDataForGraph["2022"], totoalProfitDataForGraph["2023"], totoalProfitDataForGraph["2024"], totoalProfitDataForGraph["2025"], totoalProfitDataForGraph["2026"], totoalProfitDataForGraph["2027"], totoalProfitDataForGraph["2028"], totoalProfitDataForGraph["2029"], totoalProfitDataForGraph["2030"]],
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
}

async function setTotalGrossProfitAndTotalProfitLabelValue() {
  let totalGrossProfit = document.querySelector('#totalGrossProfit');
  let totalProfit = document.querySelector('#totalProfit');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totalGrossProfitInNumber = 0;
  let totalProfitInNumber = 0;
  for (order of orders) {
    totalGrossProfitInNumber += order.orderGrossProfit;
    totalProfitInNumber += order.orderProfit;
  }
  totalGrossProfit.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalGrossProfitInNumber}`;
  totalProfit.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalProfitInNumber}`;
}

let grossProfitBtn = document.querySelector('#grossProfitBtn');
let profitBtn = document.querySelector('#profitBtn');
let monthlyGrossProfitBtn = document.querySelector('#monthlyGrossProfitBtn');
let weeklyGrossProfitBtn = document.querySelector('#weeklyGrossProfitBtn');
let dailyGrossProfitBtn = document.querySelector('#dailyGrossProfitBtn');

grossProfitBtn.addEventListener('click', () => {
  let grossProfitAndProfitLabel = document.querySelector('#grossProfitAndProfitLabel');
  grossProfitAndProfitLabel.innerText = "Gross Profit";
  grossProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  profitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayTotalGrossProfitGraph();
})

profitBtn.addEventListener('click', () => {
  let grossProfitAndProfitLabel = document.querySelector('#grossProfitAndProfitLabel');
  grossProfitAndProfitLabel.innerText = "Profit";
  profitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  grossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayTotalProfitGraph();
})

monthlyGrossProfitBtn.addEventListener('click', () => {
  monthlyGrossProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  weeklyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  dailyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayMonthlyGrossProfitGraph();
})

weeklyGrossProfitBtn.addEventListener('click', () => {
  weeklyGrossProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  monthlyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  dailyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayWeeklyGrossProfitGraph();
})

dailyGrossProfitBtn.addEventListener('click', () => {
  dailyGrossProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  monthlyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  weeklyGrossProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayDailyGrossProfitGraph();
})

monthlyProfitBtn.addEventListener('click', () => {
  monthlyProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  weeklyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  dailyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayMonthlyProfitGraph();
})

weeklyProfitBtn.addEventListener('click', () => {
  weeklyProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  monthlyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  dailyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayWeeklyProfitGraph();
})

dailyProfitBtn.addEventListener('click', () => {
  dailyProfitBtn.classList.remove('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  monthlyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  weeklyProfitBtn.classList.add('adminPanelInnerMainContainer1GraphContainerDisableBtn');
  displayDailyProfitGraph();
})

//2nd graph functions for daily

async function displayDailyGrossProfitGraph() {
  const GrossProfitDailyGraph = document.getElementById('revenueGraph2');

  // Destroy the old chart if it exists
  if (ctx1) {
    ctx1.destroy();
  }

  ctx1 = new Chart(GrossProfitDailyGraph, {
    type: 'line',
    data: {
      labels: getLabelForDisplayDailyGrossProfitGraph(),
      datasets: [{
        label: 'Daily Gross Profit',
        data: await getDataForDisplayDailyGrossProfitGraph(),
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
}

async function setDailyGrossProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let dailyGrossProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = order.orderCompleteDate.split('-')[2];
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth() && orderDay === getCurrentDay()) {
      dailyGrossProfit += order.orderGrossProfit;
    }
  }
  document.querySelector('#dailyGrossProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${dailyGrossProfit}`;
}


//2nd graph functions for monthly 

async function displayMonthlyGrossProfitGraph() {
  const GrossProfitMonthlyGraph = document.getElementById('revenueGraph2');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalMonthlyGrossProfitDataForGraph = { January: 0, February: 0, March: 0, April: 0, May: 0, June: 0, July: 0, Agust: 0, September: 0, October: 0, November: 0, December: 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    if (orderYear === getCurrentYear()) {
      switch (orderMonth) {
        case '01': totoalMonthlyGrossProfitDataForGraph.January += order.orderGrossProfit;
          break;
        case '02': totoalMonthlyGrossProfitDataForGraph.February += order.orderGrossProfit;
          break;
        case '03': totoalMonthlyGrossProfitDataForGraph.March += order.orderGrossProfit;
          break;
        case '04': totoalMonthlyGrossProfitDataForGraph.April += order.orderGrossProfit;
          break;
        case '05': totoalMonthlyGrossProfitDataForGraph.May += order.orderGrossProfit;
          break;
        case '06': totoalMonthlyGrossProfitDataForGraph.June += order.orderGrossProfit;
          break;
        case '07': totoalMonthlyGrossProfitDataForGraph.July += order.orderGrossProfit;
          break;
        case '08': totoalMonthlyGrossProfitDataForGraph.Agust += order.orderGrossProfit;
          break;
        case '09': totoalMonthlyGrossProfitDataForGraph.September += order.orderGrossProfit;
          break;
        case '10': totoalMonthlyGrossProfitDataForGraph.October += order.orderGrossProfit;
          break;
        case '11': totoalMonthlyGrossProfitDataForGraph.November += order.orderGrossProfit;
          break;
        case '12': totoalMonthlyGrossProfitDataForGraph.December += order.orderGrossProfit;
          break;
      }
    }
  }

  // Destroy the old chart if it exists
  if (ctx1) {
    ctx1.destroy();
  }

  ctx1 = new Chart(GrossProfitMonthlyGraph, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Monthly Gross Profit',
        data: totoalMonthlyGrossProfitDataForGraph,
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
}

async function setMonthlyGrossProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let monthlyGrossProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    if (orderYear === getCurrentYear()) {
      monthlyGrossProfit += order.orderGrossProfit;
    }
  }
  document.querySelector('#monthlyGrossProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${monthlyGrossProfit}`;
}

//2nd graph functions for weekly 

async function displayWeeklyGrossProfitGraph() {
  const GrossProfitWeaklyGraph = document.getElementById('revenueGraph2');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalWeaklyGrossProfitDataForGraph = { Week1: 0, Week2: 0, Week3: 0, Week4: 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = parseInt(order.orderCompleteDate.split('-')[2]);
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      if (orderDay > 0 && orderDay < 8) {
        totoalWeaklyGrossProfitDataForGraph.Week1 += order.orderGrossProfit;
      } else if (orderDay >= 8 && orderDay < 15) {
        totoalWeaklyGrossProfitDataForGraph.Week2 += order.orderGrossProfit;
      } else if (orderDay >= 15 && orderDay < 22) {
        totoalWeaklyGrossProfitDataForGraph.Week3 += order.orderGrossProfit;
      } else if (orderDay >= 22 && orderDay < 32) {
        totoalWeaklyGrossProfitDataForGraph.Week4 += order.orderGrossProfit;
      }
    }
  }

  // Destroy the old chart if it exists
  if (ctx1) {
    ctx1.destroy();
  }

  ctx1 = new Chart(GrossProfitWeaklyGraph, {
    type: 'line',
    data: {
      labels: ['Week1', 'Week2', 'Week3', 'Week4'],
      datasets: [{
        label: 'Weekly Gross Profit',
        data: totoalWeaklyGrossProfitDataForGraph,
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
}

async function setWeeklyGrossProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let weeklyGrossProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      weeklyGrossProfit += order.orderGrossProfit;
    }
  }
  document.querySelector('#weeklyGrossProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${weeklyGrossProfit}`;
}


//3rd graph functions for daily

async function displayDailyProfitGraph() {
  const ProfitDailyGraph = document.getElementById('revenueGraph3');

  // Destroy the old chart if it exists
  if (ctx2) {
    ctx2.destroy();
  }

  ctx2 = new Chart(ProfitDailyGraph, {
    type: 'line',
    data: {
      labels: getLabelForDisplayDailyProfitGraph(),
      datasets: [{
        label: 'Daily Profit',
        data: await getDataForDisplayDailyProfitGraph(),
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
}

async function setDailyProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let dailyProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = order.orderCompleteDate.split('-')[2];
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth() && orderDay === getCurrentDay()) {
      dailyProfit += order.orderProfit;
    }
  }
  document.querySelector('#dailyProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${dailyProfit}`;
}


//3rd graph functions for monthly 

async function displayMonthlyProfitGraph() {
  const ProfitMonthlyGraph = document.getElementById('revenueGraph3');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalMonthlyProfitDataForGraph = { January: 0, February: 0, March: 0, April: 0, May: 0, June: 0, July: 0, Agust: 0, September: 0, October: 0, November: 0, December: 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    if (orderYear === getCurrentYear()) {
      switch (orderMonth) {
        case '01': totoalMonthlyProfitDataForGraph.January += order.orderProfit;
          break;
        case '02': totoalMonthlyProfitDataForGraph.February += order.orderProfit;
          break;
        case '03': totoalMonthlyProfitDataForGraph.March += order.orderProfit;
          break;
        case '04': totoalMonthlyProfitDataForGraph.April += order.orderProfit;
          break;
        case '05': totoalMonthlyProfitDataForGraph.May += order.orderProfit;
          break;
        case '06': totoalMonthlyProfitDataForGraph.June += order.orderProfit;
          break;
        case '07': totoalMonthlyProfitDataForGraph.July += order.orderProfit;
          break;
        case '08': totoalMonthlyProfitDataForGraph.Agust += order.orderProfit;
          break;
        case '09': totoalMonthlyProfitDataForGraph.September += order.orderProfit;
          break;
        case '10': totoalMonthlyProfitDataForGraph.October += order.orderProfit;
          break;
        case '11': totoalMonthlyProfitDataForGraph.November += order.orderProfit;
          break;
        case '12': totoalMonthlyProfitDataForGraph.December += order.orderProfit;
          break;
      }
    }
  }

  // Destroy the old chart if it exists
  if (ctx2) {
    ctx2.destroy();
  }

  ctx2 = new Chart(ProfitMonthlyGraph, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Monthly Profit',
        data: totoalMonthlyProfitDataForGraph,
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
}

async function setMonthlyProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let monthlyProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    if (orderYear === getCurrentYear()) {
      monthlyProfit += order.orderProfit;
    }
  }
  document.querySelector('#monthlyProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${monthlyProfit}`;
}

//3rd graph functions for weekly 

async function displayWeeklyProfitGraph() {
  const ProfitWeaklyGraph = document.getElementById('revenueGraph3');
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let totoalWeaklyProfitDataForGraph = { Week1: 0, Week2: 0, Week3: 0, Week4: 0 };
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = parseInt(order.orderCompleteDate.split('-')[2]);
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      if (orderDay > 0 && orderDay < 8) {
        totoalWeaklyProfitDataForGraph.Week1 += order.orderProfit;
      } else if (orderDay >= 8 && orderDay < 15) {
        totoalWeaklyProfitDataForGraph.Week2 += order.orderProfit;
      } else if (orderDay >= 15 && orderDay < 22) {
        totoalWeaklyProfitDataForGraph.Week3 += order.orderProfit;
      } else if (orderDay >= 22 && orderDay < 32) {
        totoalWeaklyProfitDataForGraph.Week4 += order.orderProfit;
      }
    }
  }

  // Destroy the old chart if it exists
  if (ctx2) {
    ctx2.destroy();
  }

  ctx2 = new Chart(ProfitWeaklyGraph, {
    type: 'line',
    data: {
      labels: ['Week1', 'Week2', 'Week3', 'Week4'],
      datasets: [{
        label: 'Weekly Profit',
        data: totoalWeaklyProfitDataForGraph,
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
}

async function setWeeklyProfitLabelValue() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let weeklyProfit = 0;
  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      weeklyProfit += order.orderProfit;
    }
  }
  document.querySelector('#weeklyProfit').innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${weeklyProfit}`;
}


//4th graph

async function displayTopThreeCategoryGraph() {
  const ctx4 = document.getElementById('revenueGraph4');
  let response = await axios.get("/admin/topThreeCategory");
  let object = response.data;
  new Chart(ctx4, {
    type: 'doughnut',
    data: {
      labels: [
        object.label[0],
        object.label[1],
        object.label[2]
      ],
      datasets: [{
        label: 'Sold Count ',
        data: [object.data[0], object.data[1], object.data[2]],
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
}

//5th graph

async function displayTopThreeMenuGraph() {
  const ctx5 = document.getElementById('revenueGraph5');
  let response = await axios.get("/admin/topThreeMenu");
  let object = response.data;
  new Chart(ctx5, {
    type: 'doughnut',
    data: {
      labels: [
        object.label[0],
        object.label[1],
        object.label[2]
      ],
      datasets: [{
        label: 'Sold Count ',
        data: [object.data[0], object.data[1], object.data[2]],
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
}

// utility functions 

function getLabelForDisplayDailyGrossProfitGraph() {
  let label = [];
  for (let i = 1; i <= 31; i++) {
    label.push("day(" + i + ")");
  }
  return label;
}

function getLabelForDisplayDailyProfitGraph() {
  let label = [];
  for (let i = 1; i <= 31; i++) {
    label.push("day(" + i + ")");
  }
  return label;
}

async function getDataForDisplayDailyGrossProfitGraph() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let data = [];
  //initializing data wit 0 value for all day from 1-31 day
  for (let i = 0; i < 31; i++) {
    data.push(0);
  }

  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = order.orderCompleteDate.split('-')[2];
    orderDay = parseInt(orderDay);
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      data[orderDay - 1] += order.orderGrossProfit;
    }
  }
  return data;
}

async function getDataForDisplayDailyProfitGraph() {
  let response = await axios.get("/admin/order/complete");
  let orders = response.data;
  let data = [];
  //initializing data wit 0 value for all day from 1-31 day
  for (let i = 0; i < 31; i++) {
    data.push(0);
  }

  for (order of orders) {
    let orderYear = order.orderCompleteDate.split('-')[0];
    let orderMonth = order.orderCompleteDate.split('-')[1];
    let orderDay = order.orderCompleteDate.split('-')[2];
    orderDay = parseInt(orderDay);
    if (orderYear === getCurrentYear() && orderMonth === getCurrentMonth()) {
      data[orderDay - 1] += order.orderProfit;
    }
  }
  return data;
}

function getCurrentYear() {
  let now = new Date();
  let date = now.toISOString();
  currDate = date.split('T')[0];
  let currYear = currDate.split('-')[0];
  return currYear;
}

function getCurrentMonth() {
  let now = new Date();
  let date = now.toISOString();
  currDate = date.split('T')[0];
  let currMonth = currDate.split('-')[1];
  return currMonth;
}

function getCurrentDay() {
  let now = new Date();
  let date = now.toISOString();
  currDate = date.split('T')[0];
  let currDay = currDate.split('-')[2];
  return currDay;
}
