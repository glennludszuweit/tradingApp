import displayHomeView from '../view/homeView.js';
import stockController from './stocksController.js';
import * as lib from './lib.js';

class EventsController {
  buy() {
    buyStocks.addEventListener('click', (e) => {
      e.preventDefault();
      quantity = quantityInput.value;
      if (cash >= currentPrice[0] * quantity) {
        lib.openConfirmModal();
      } else {
        lib.openAlert();
      }
    });
  }

  sell() {
    sellStocks.addEventListener('click', (e) => {
      e.preventDefault();
      quantity = -quantityInput.value;

      if (-quantity <= stockController.totalQuantity(companySymbol[0])) {
        lib.openConfirmModal();
      } else {
        lib.openAlert();
      }
    });
  }

  portfolioOverview() {
    overview.addEventListener('click', (e) => {
      e.preventDefault();
      /////remove highligh from list when searching stocks
      // lib.removeHighlight();
      displayHomeView.homeView();
    });
  }

  reset() {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let resetData = confirm('This will reset all your game data...');
      if (resetData) {
        localStorage.clear();
        location.reload();
        console.log('hello?');
      }
      return;
    });
  }
}

export default new EventsController();
