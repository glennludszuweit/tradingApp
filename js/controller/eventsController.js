import homeView from '../view/homeView.js';
import stockController from './stocksController.js';
import UI from './uiController.js';

class EventsController {
  buy() {
    buyStocks.addEventListener('click', (e) => {
      e.preventDefault();
      quantity = quantityInput.value;
      if (cash >= currentPrice[0] * quantity) {
        UI.openConfirmModal();
      } else {
        UI.openAlert();
      }
    });
  }

  sell() {
    sellStocks.addEventListener('click', (e) => {
      e.preventDefault();
      quantity = -quantityInput.value;

      if (-quantity <= stockController.totalQuantity(companySymbol[0])) {
        UI.openConfirmModal();
      } else {
        UI.openAlert();
      }
    });
  }

  portfolioOverview() {
    overview.addEventListener('click', (e) => {
      e.preventDefault();
      /////remove highligh from list when searching stocks
      UI.removeHighlight();
      homeView.displayHomeView();
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
