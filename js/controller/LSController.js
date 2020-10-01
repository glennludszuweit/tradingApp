import stockController from './stocksController.js';
import * as lib from './lib.js';

const displayCash = document.querySelector('.cash');
const displayBalance = document.querySelector('.balance');
let localStorageStocks = [];
let balance = [];
let LSValue = 0;

export function SET(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function GET(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage() {
  //set stocks
  setLocalStorageStocks();
  // calculate cash
  setLocalStorageCash();
  displayCash.innerText = `$${GET('cash').toFixed(2)}`;
  //calculate balance
  setLocalStorageBalance();
  displayBalance.innerText = `$${GET('balance').toFixed(2)}`;
}

function setLocalStorageStocks() {
  let obj = {};

  if (GET('stocks') === null) {
    localStorageStocks = [];
  } else {
    localStorageStocks = GET('stocks');
  }

  obj.symbol = companySymbol[0];
  obj.quantity = +quantity;
  obj.price = currentPrice[0];
  obj.value = obj.quantity * obj.price;
  obj.date = moment().format('DD MMM YYYY, h:mm a');

  LSValue = obj.value;
  localStorageStocks.push(obj);
  SET('stocks', localStorageStocks);
}

export function setLocalStorageCash() {
  if (GET('cash') === null) {
    SET('cash', (cash = 1000000));
  } else {
    cash = GET('cash') - LSValue;
  }

  SET('cash', cash);
}

export async function setLocalStorageBalance() {
  if (GET('balance') === null) {
    SET('balance', (balance = 1000000));
  } else {
    let total = await stockController.calculateStocksValue();
    balance = lib.GET('cash') + total;
  }

  lib.SET('balance', balance);
}

export function loadStartingMoney() {
  if (lib.GET('cash') === null && lib.GET('balance') === null) {
    lib.SET('cash', '1000000');
    lib.SET('balance', '1000000');
  }
  displayCash.innerText = `$${lib.GET('cash').toFixed(2)}`;
  displayBalance.innerText = `$${lib.GET('balance').toFixed(2)}`;
}
