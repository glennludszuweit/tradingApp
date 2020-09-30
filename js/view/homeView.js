import * as lib from '../controller/lib.js';

export default async function homeView() {
  await fetchStocksNews();
  displayMyData();
  stocksNews();
  buyStocks.style.display = 'none';
  sellStocks.style.display = 'none';
  quantityInput.style.display = 'none';
  chartCanvas.style.display = 'none';
}

async function fetchStocksNews() {
  let url =
    'https://finnhub.io/api/v1/news?category=general&token=btj770748v6p9f1q3i30';
  let response = await fetch(url);
  let data = await response.json();

  return data;
}

async function displayMyData() {
  basicInfo.innerHTML = `
  <div class="search-stock-info">
    <div>
      <small>Total Stocks</small>
      <div class="price-big">${lib.newSymbolArr()}</div>
    </div>

    <div>
      <small>Stocks Value</small>
      <div class="price-big">$${(await lib.calculateStocksValue()).toFixed(
        2
      )}</div>
    </div>

    <div>
      <small>Investments</small>
      <div class="price-big">$${lib.calculateInvestments().toFixed(2)}</div>
    </div>

    <div>
      <small>Earnings</small>
      <div class="price-big earnings">$${(
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

async function stocksNews() {
  let data = await fetchStocksNews();

  let output = data.map((news) => {
    return `
        <div class="news-container">
        <div class="news-img">
          <img src="${news.image}" alt="${news.headline}"/>
        </div>
        <div class="news-body">
          <h4 class="headline">${news.headline}</h4>
          <small class="date">${moment
            .unix(news.datetime)
            .format('DD/MM/YYYY')} <span class="category">${
      news.category
    }</span> </small>
          <p class="summary">${news.summary}</p>
          <a href="${news.url}" target="_blank"><small>${
      news.source
    }</small></a>
        </div>
        </div>
        `;
  });

  displayHomeView.innerHTML = output.slice(0, 5).join('');
}
