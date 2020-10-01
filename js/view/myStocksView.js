import UI from '../controller/uiController.js';
import LS from '../controller/lsController.js';
import MyStocks from '../model/MyStocks.js';
import chart from './chart.js';

let selectedCompany;
let stocks = LS.GET('stocks');
let symbol;
let quantity;
let price;
let list = {};

class MyStocksView {
  displayMyStocks() {
    displayPortfolioStocks.addEventListener('click', async (e) => {
      e.preventDefault();
      // remove current data
      UI.removeData();
      // highlight selected stock
      if (e.target.className === 'company-overview' || e.target !== 0) {
        //change color in delegation
        if (e.target.className !== 'company-overview') {
          return;
        }
        if (selectedCompany) {
          selectedCompany.classList.remove('highlight');
        }
        selectedCompany = e.target;
        selectedCompany.classList.add('highlight');
      }
      let item = e.target.innerText
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .split(' ') // ["aapl", " ", " apple", " ", "inc",  "$87263948"]
        .filter(Boolean);
      [symbol, , quantity, price] = item;
      // load new data
      await this.loadStockInfo();
      // display stocks info
      this.displayMyStockData();
      // display lists of stocks
      await this.loadTotalStocks();
      // display to chart
      chart(timesStamps, highPrices, lowPrices);
      // clear unwanted display
      this.clear();
    });
  }

  async loadStockInfo() {
    const myStock = new MyStocks(symbol, dataResolution, quantity, price);
    await myStock.companyStockCandles();
    await myStock.companyStockQoutes();
    await myStock.companyInfo();
  }

  async loadTotalStocks() {
    stocks.forEach((stock) => {
      if (!list[stock.symbol]) {
        list[stock.symbol] = new MyStocks(
          stock.symbol,
          stock.resolution,
          stock.quantity,
          stock.price,
          stock.value
        );
      } else {
        list[stock.symbol].quantity += stock.quantity;
        list[stock.symbol].value += stock.value;
      }
    });
    this.renderLists();
  }

  async renderLists() {
    let output = await Promise.all(
      Object.values(list).map(async (stock) => {
        if (stock.quantity <= 0) {
          return;
        } else {
          const data = await stock.companyStockQoutes();
          return `
            <div class="company-overview">
              <div class="company-name">
                <h3 class="description">${stock.symbol}</h3>
                <p><small class="company-shares">Shares ${
                  stock.quantity
                }</small></p>
              </div>
              <input type="hidden" value="">
              <div style="z-index: -100">${stock.value}
              </div>
              <div class="price stock-status">$ ${(
                stock.quantity * data.c -
                stock.value
              ).toFixed(2)}
              </div>
            </div>
          `;
        }
      })
    );
    displayPortfolioStocks.innerHTML = output.join('');
    const status = document.querySelectorAll('.stock-status');
    status.forEach((element) => {
      if (element.innerText.includes('-')) {
        element.style.color = '#fa4e3b';
      }
    });
  }

  displayMyStockData() {
    basicInfo.innerHTML = `
    <div class="search-stock-info">
      <div>
        <small>Current Price</small>
        <div class="price-big">$${currentPrice[0]}</div>
        <div class="price-details">
          <div class="price-details_shares">
            <div>
              <small>Latest High and Low Prices</small>
            </div>
            <div>
              <small
                ><span class="high-price">$${highPrices[
                  highPrices.length - 1
                ].toFixed(2)} (High) </span> |
                <span class="low-price">$ ${lowPrices[
                  lowPrices.length - 1
                ].toFixed(2)} (Low) </span
              ></small>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <h1>${symbol}</h1>
        <small>${companyName[0]}</small>
      </div>
      <div class="price-details_comp-name">
        <small>Stock Value</small>
        <div class="price-big" id="stock-value" style="color: #46cf9a">$ ${(
          currentPrice[0] * quantity
        ).toFixed(2)}</div>
        <div class="price-details">
          <div class="price-details_shares">
            <small class="comp-name-small">Money Spent</small>
            <h4 class="comp-symbol">$ ${price}</h4>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  clear() {
    displayTradingHistory.style.display = 'none';
    buyStocks.style.display = '';
    sellStocks.style.display = '';
    quantityInput.style.display = '';
  }
}

export default new MyStocksView();
