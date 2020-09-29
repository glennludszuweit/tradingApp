import * as lib from './controller/lib.js';
import { loadTotalStocks, displayMyStocks } from './view/myStocksView.js';
import { searchStock } from './view/stocksView.js';

searchStock();

// loadPortfolioStocks();
displayMyStocks();
loadTotalStocks();

//let localStorage Money
lib.setLocalStorageCash();
lib.setLocalStorageBalance();

// Buy Stocks
buyStocks.addEventListener('click', (e) => {
    e.preventDefault();
    quantity = quantityInput.value;

    //set stocks
    lib.setLocalStorageStocks();
    // calculate cash
    lib.setLocalStorageCash();
    displayCash.innerText = `$${lib.GET('cash').toFixed(2)}`;
    //calculate balance
    lib.setLocalStorageBalance();
    displayBalance.innerText = `$${lib.GET('balance').toFixed(2)}`;
    location.reload();
});

//Sell Stocks
sellStocks.addEventListener('click', (e) => {
    e.preventDefault();
    quantity = -quantityInput.value;

    //set stocks
    lib.setLocalStorageStocks();
    // calculate cash
    lib.setLocalStorageCash();
    displayCash.innerText = `$${lib.GET('cash').toFixed(2)}`;
    //calculate balance
    lib.setLocalStorageBalance();
    displayBalance.innerText = `$${lib.GET('balance').toFixed(2)}`;
    location.reload();
});
