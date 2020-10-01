import stockController from './stocksController.js';

const displayCash = document.querySelector('.cash');
const displayBalance = document.querySelector('.balance');
let localStorageStocks = [];
let balance = [];
let LSValue = 0;

class LS {
  SET(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  GET(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorage() {
    //set stocks
    this.setLocalStorageStocks();
    // calculate cash
    this.setLocalStorageCash();
    displayCash.innerText = `$${this.GET('cash').toFixed(2)}`;
    //calculate balance
    this.setLocalStorageBalance();
    displayBalance.innerText = `$${this.GET('balance').toFixed(2)}`;
  }

  setLocalStorageStocks() {
    let obj = {};

    if (this.GET('stocks') === null) {
      localStorageStocks = [];
    } else {
      localStorageStocks = this.GET('stocks');
    }

    obj.symbol = companySymbol[0];
    obj.quantity = +quantity;
    obj.price = currentPrice[0];
    obj.value = obj.quantity * obj.price;
    obj.date = moment().format('DD MMM YYYY, h:mm a');

    LSValue = obj.value;
    localStorageStocks.push(obj);
    this.SET('stocks', localStorageStocks);
  }

  setLocalStorageCash() {
    if (this.GET('cash') === null) {
      this.SET('cash', (cash = 1000000));
    } else {
      cash = this.GET('cash') - LSValue;
    }

    this.SET('cash', cash);
  }

  async setLocalStorageBalance() {
    if (this.GET('balance') === null) {
      this.SET('balance', (balance = 1000000));
    } else {
      let total = await stockController.calculateStocksValue();
      balance = this.GET('cash') + total;
    }

    this.SET('balance', balance);
  }

  loadStartingMoney() {
    if (this.GET('cash') === null && this.GET('balance') === null) {
      this.SET('cash', '1000000');
      this.SET('balance', '1000000');
    }
    displayCash.innerText = `$${this.GET('cash').toFixed(2)}`;
    displayBalance.innerText = `$${this.GET('balance').toFixed(2)}`;
  }
}

export default new LS();
