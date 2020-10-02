import Stocks from '../model/Stocks.js';
import UI from '../controller/uiController.js';
import { chart, selectChart } from './chart.js';

class StocksView {
  async searchStock() {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      // remove current data
      UI.removeData();
      // load new data
      await this.loadSearchInfo();
      // display data
      this.displaySearchStockData();
      // display to chart
      this.displayToChart(timesStamps, highPrices, lowPrices);
      /////remove highligh from list when searching stocks
      UI.removeHighlight();
      this.clear();
    });
  }

  async loadSearchInfo() {
    const stock = new Stocks(search.value, dataResolution);
    await stock.companyStockCandles();
    await stock.companyInfo();
    await stock.companyStockQoutes();
  }

  displayToChart(label, data1, data2) {
    chart(label, data1, data2);
    selectChart(label, data1, data2);
  }

  displaySearchStockData() {
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

  clear() {
    search.value = '';
    displayTradingHistory.style.display = 'none';
    sellStocks.style.display = 'none';
    buyStocks.style.display = '';
    quantityInput.style.display = '';
  }
}

export default new StocksView();
