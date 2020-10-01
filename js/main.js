import myStocksView from './view/myStocksView.js';
import stocksView from './view/stocksView.js';
import homeView from './view/homeView.js';
import UI from './controller/uiController.js';
import LS from './controller/lsController.js';
import eventController from './controller/eventsController.js';

//home view
homeView.displayHomeView();

//search stocks
stocksView.searchStock();

//my stocks
myStocksView.displayMyStocks();
myStocksView.loadTotalStocks();

//let localStorage Money
LS.setLocalStorageCash();
LS.setLocalStorageBalance();
LS.loadStartingMoney();

//alert & modal
UI.proceedConfirmModal();
UI.cancelConfirmModal();
UI.closeAlert();

// Buy Stocks
eventController.buy();
// Sell Stocks
eventController.sell();
// portfolio overview
eventController.portfolioOverview();
// reset localStorage
eventController.reset();
