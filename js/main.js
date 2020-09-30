import { loadTotalStocks, displayMyStocks } from './view/myStocksView.js';
import { searchStock } from './view/stocksView.js';
import homeView from './view/homeView.js';
import * as lib from './controller/lib.js';
import * as LS from './controller/localStorage.js';

// console.log(lib.calculateInvestments());

//home view
homeView();

//search stocks
searchStock();

//my stocks
displayMyStocks();
loadTotalStocks();

//let localStorage Money
LS.setLocalStorageCash();
LS.setLocalStorageBalance();
LS.loadStartingMoney();

//modal
lib.proceedConfirmModal();
lib.cancelConfirmModal();

// Buy Stocks
buyStocks.addEventListener('click', (e) => {
  e.preventDefault();
  quantity = quantityInput.value;
  if (cash >= currentPrice[0] * quantity) {
    lib.openConfirmModal();
  } else {
    throw new Error('hallo?');
  }
});

//Sell Stocks
sellStocks.addEventListener('click', (e) => {
  e.preventDefault();
  // lib.totalQuantity(companySymbol[0]);
  quantity = -quantityInput.value;

  if (-quantity <= lib.totalQuantity(companySymbol[0])) {
    lib.openConfirmModal();
  } else {
    throw new Error('hallo?');
  }
  console.log(lib.totalQuantity(companySymbol[0]));
});
