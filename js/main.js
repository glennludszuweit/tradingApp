import { loadTotalStocks, displayMyStocks } from './view/myStocksView.js';
import { searchStock } from './view/stocksView.js';
import homeView from './view/homeView.js';
import * as lib from './controller/lib.js';
import * as LS from './controller/LSController.js';
import * as event from './controller/eventsController.js';

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

//alert & modal
lib.proceedConfirmModal();
lib.cancelConfirmModal();
lib.closeAlert();

// Buy Stocks
event.buy();
// Sell Stocks
event.sell();
// portfolio overview
event.portfolioOverview();
// reset localStorage
event.reset();
