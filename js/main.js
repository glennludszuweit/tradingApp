import { loadTotalStocks, displayMyStocks } from './view/myStocksView.js';
import { searchStock } from './view/stocksView.js';

import * as lib from './controller/lib.js';
import * as LS from './controller/localStorage.js';

//search stocks
searchStock();

//my stocks
displayMyStocks();
loadTotalStocks();

//let localStorage Money
LS.setLocalStorageCash();
LS.setLocalStorageBalance();

//modal
lib.proceedConfirmModal();
lib.cancelConfirmModal();

// Buy Stocks
buyStocks.addEventListener('click', (e) => {
    e.preventDefault();
    lib.openConfirmModal();
    quantity = quantityInput.value;
    LS.setLocalStorage();
});

//Sell Stocks
sellStocks.addEventListener('click', (e) => {
    e.preventDefault();
    lib.openConfirmModal();
    quantity = -quantityInput.value;
    LS.setLocalStorage();
});
