import * as LS from './localStorage.js';
import MyStocks from '../model/MyStocks.js';

const container = document.querySelector('.container');
const confirmModal = document.querySelector('.modal');
const proceed = document.querySelector('.proceed');
const cancel = document.querySelector('.cancel');

export function removeData() {
  timesStamps = [];
  currentPrice = [];
  highPrices = [];
  lowPrices = [];
  companyName = [];
  companySymbol = [];
}

export function SET(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function GET(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function openConfirmModal() {
  container.style.filter = 'blur(5px)';
  confirmModal.style.display = 'block';
}

export function proceedConfirmModal() {
  proceed.addEventListener('click', (e) => {
    e.preventDefault();
    LS.setLocalStorage();
    container.style.filter = 'none';
    confirmModal.style.display = 'none';
    location.reload();
  });
}

export function cancelConfirmModal() {
  cancel.addEventListener('click', (e) => {
    e.preventDefault();
    container.style.filter = 'none';
    confirmModal.style.display = 'none';
  });
}

export function totalQuantity(symbol) {
  return GET('stocks').reduce(
    (acc, stock) => (symbol === stock.symbol ? acc + stock.quantity : acc),
    0
  );
}

export function newSymbolArr() {
  let newArr = GET('stocks').map((stock) => stock.symbol);
  return [...new Set(newArr)].length;
}

export function calculateInvestments() {
  let stocks = GET('stocks');
  if (stocks) {
    return stocks.reduce((acc, stock) => acc + stock.value, 0);
  } else {
    return;
  }
}

export async function calculateStockLatestValue() {
  let x = GET('stocks').map(async (stock) => {
    let list = new MyStocks(
      stock.symbol,
      dataResolution,
      stock.quantity,
      stock.price,
      stock.value
    );
    let data = await list.companyStockQoutes();
    return data.c * stock.quantity;
  });
  return x;
}

export async function calculateStocksValue() {
  let x = await calculateStockLatestValue();
  let values = await Promise.all(x);
  let total = values.reduce((acc, val) => {
    return acc + val;
  });
  return total;
}
