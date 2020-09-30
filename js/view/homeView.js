import * as lib from '../controller/lib.js';

export default async function homeView() {
  // await fetchStocksNews();
  displayMyData();
  tradingHistory();
  chart();

  // stocksNews();
  buyStocks.style.display = 'none';
  sellStocks.style.display = 'none';
  quantityInput.style.display = 'none';
  // chartCanvas.style.display = 'none';
}

// async function fetchStocksNews() {
//   let url =
//     'https://finnhub.io/api/v1/news?category=general&token=btj770748v6p9f1q3i30';
//   let response = await fetch(url);
//   let data = await response.json();

//   return data;
// }

async function displayMyData() {
  basicInfo.innerHTML = `
  <div class="search-stock-info">
    <div>
      <small>Total Stocks</small>
      <div class="price-big" style="font-size: 40px">${lib.newSymbolArr()}</div>
    </div>

    <div>
      <small>Stocks Value</small>
      <div class="price-big stockValue" style="font-size: 40px">$ ${(
        await lib.calculateStocksValue()
      ).toFixed(2)}</div>
    </div>

    <div>
      <small>Investments</small>
      <div class="price-big investmentsValue" style="font-size: 40px">$ ${lib
        .calculateInvestments()
        .toFixed(2)}</div>
    </div>

    <div>
      <small>Earnings</small>
      <div class="price-big earnings" style="font-size: 40px">$ ${(
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

// async function stocksNews() {
//   const newsData = document.querySelector('.stocks-news');
//   let data = await fetchStocksNews();

//   let output = data.map((news) => {
//     return `
//         <div class="news-container">
//         <div class="news-img">
//           <img src="${news.image}" alt="${news.headline}"/>
//         </div>
//         <div class="news-body">
//           <h4 class="headline">${news.headline}</h4>
//           <small class="date">${moment
//             .unix(news.datetime)
//             .format('DD/MM/YYYY')} <span class="category">${
//       news.category
//     }</span> </small>
//           <p class="summary">${news.summary}</p>
//           <a href="${news.url}" target="_blank"><small>${
//       news.source
//     }</small></a>
//         </div>
//         </div>
//         `;
//   });

//   newsData.innerHTML = output.slice(0, 5).join('');
// }

function tradingHistory() {
  const historyData = document.querySelector('.history-data');
  let output = lib.GET('stocks').map((stock) => {
    return `
        <tr>
          <td>${stock.symbol}</td>
          <td>$ ${stock.price}</td>
          <td>${stock.quantity}</td>
          <td>$ ${stock.value}</td>
          <td>${stock.date}</td>
        </tr>
    `;
  });

  historyData.innerHTML = output.join('');
}

function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  if (myChart != undefined) myChart.destroy();
  myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: [''],
      datasets: [
        {
          label: ['Stock Value'],
          data: [8000],
          borderWidth: 2,
          lineTension: 0,
          borderColor: '#46CF9A',
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
        {
          label: ['Investment Value'],
          data: [10000],
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
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
