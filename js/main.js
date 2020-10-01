import { loadTotalStocks, displayMyStocks } from './view/myStocksView.js';
import { searchStock } from './view/stocksView.js';
import homeView from './view/homeView.js';
import * as lib from './controller/lib.js';
import LS from './controller/lsController.js';
import eventController from './controller/eventsController.js';

//home view
homeView.displayHomeView();

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
eventController.buy();
// Sell Stocks
eventController.sell();
// portfolio overview
eventController.portfolioOverview();
// reset localStorage
eventController.reset();
