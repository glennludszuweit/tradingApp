import * as lib from '../controller/lib.js';

export default async function homeView() {
  displayMyData();
  tradingHistory();
  chart();

  // stocksNews();
  buyStocks.style.display = 'none';
  sellStocks.style.display = 'none';
  quantityInput.style.display = 'none';
  displayTradingHistory.style.display = '';
}

async function displayMyData() {
  basicInfo.innerHTML = `
  <div class="search-stock-info">

    <div>
      <small>Stocks Value</small>
      <div class="price-big stockValue">$ ${(
        await lib.calculateStocksValue()
      ).toFixed(2)}</div>
    </div>

    <div>
      <small>Investments</small>
      <div class="price-big investmentsValue">$ ${lib
        .calculateInvestments()
        .toFixed(2)}</div>
    </div>

    <div>
      <small>Earnings</small>
      <div class="price-big earnings">$ ${(
        (await lib.calculateStocksValue()) - lib.calculateInvestments()
      ).toFixed(2)}</div>
    </div>
  </div>
  `;

  const earnings = document.querySelector('.earnings');
  let x = (await lib.calculateStocksValue()) - lib.calculateInvestments();
  if (x == 0) {
    earnings.style.color = '#fff';
  } else if (x < 0) {
    earnings.style.color = '#fa4e3b';
  } else {
    earnings.style.color = '#46cf9a';
  }
}

function tradingHistory() {
  const historyData = document.querySelector('.history-data');
  let stocks = lib.GET('stocks').sort((a, b) => b.date - a.date);
  let output = stocks.map((stock) => {
    if (stock.quantity < 0) {
      return `
        <tr>
          <td>${stock.symbol}</td>
          <td>$ ${stock.price.toFixed(2)}</td>
          <td>${stock.quantity}</td>
          <td>$ ${stock.value.toFixed(2)}</td>
          <td>${stock.date}</td>
          <td style="color: #fa4e3b">Sold</td>
        </tr>
    `;
    } else {
      return `
        <tr>
          <td>${stock.symbol}</td>
          <td>$ ${stock.price.toFixed(2)}</td>
          <td>${stock.quantity}</td>
          <td>$ ${stock.value.toFixed(2)}</td>
          <td>${stock.date}</td>
          <td style="color: #46cf9a">Bought</td>
        </tr>
    `;
    }
  });

  historyData.innerHTML = output.join('');
}

async function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  if (myChart != undefined) myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [''],
      datasets: [
        {
          label: ['Stock Value'],
          data: [(await lib.calculateStocksValue()).toFixed(2)],
          borderWidth: 2,
          lineTension: 0,
          borderColor: '#46CF9A',
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
        {
          label: ['Investment Value'],
          data: [lib.calculateInvestments().toFixed(2)],
          borderWidth: 2,
          lineTension: 0,
          borderColor: '#fa4e3b',
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    },
  });
}
