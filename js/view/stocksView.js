import Stocks from '../model/Stocks.js';
import * as lib from '../controller/lib.js';
import chart from './chart.js';

export async function searchStock() {
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    lib.removeData();

    await loadSearchInfo();

    chart(timesStamps, highPrices, lowPrices);

    search.value = '';

    sellStocks.style.display = 'none';
    buyStocks.style.display = '';

    displayPortfolioStocks.children.forEach((stock) => {
      console.log(stock);
      // if (stock.childNodes.classList.contains('highlight')) {
      //   stock.childNodes.classList.remove('highlight');
      // }
    });
  });
}

console.log(displayPortfolioStocks.children);

async function loadSearchInfo() {
  const stock = new Stocks(search.value, dataResolution);
  await stock.companyStockCandles();
  await stock.companyInfo();
  await stock.companyStockQoutes();

  displaySearchStockData();
}

function displaySearchStockData() {
  basicInfo.innerHTML = `
  <small>Current Price</small>
  <div class="price-big">$${currentPrice[0]}</div>
  <div class="search-price-details">
    <div class="price-details_shares">
      <div>
        <small>Latest High and Low Prices</small>
      </div>
      <div>
        <small
          ><span class="high-price">$${highPrices[
            highPrices.length - 1
          ].toFixed(2)} (High) </span> |
          <span class="low-price">$${lowPrices[lowPrices.length - 1].toFixed(
            2
          )} (Low) </span
        ></small>
      </div>
    </div>
    <div class="price-details_comp-name">
      <h3 class="comp-symbol">${search.value.toUpperCase()}</h3>
      <small class="comp-name-small">${companyName[0]}</small>
    </div>
  </div>
  `;
}
