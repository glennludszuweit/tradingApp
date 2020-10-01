import LS from './lsController.js';

const container = document.querySelector('.container');
const confirmModal = document.querySelector('.modal');
const alertModal = document.querySelector('.alert');
const proceed = document.querySelector('.proceed');
const cancel = document.querySelector('.cancel');
const close = document.querySelector('.close');

class UI {
  removeData() {
    timesStamps = [];
    currentPrice = [];
    highPrices = [];
    lowPrices = [];
    companyName = [];
    companySymbol = [];
  }

  openConfirmModal() {
    container.style.filter = 'blur(5px)';
    confirmModal.style.display = 'block';
  }

  proceedConfirmModal() {
    proceed.addEventListener('click', (e) => {
      e.preventDefault();
      LS.setLocalStorage();
      container.style.filter = 'none';
      confirmModal.style.display = 'none';
      location.reload();
    });
  }

  cancelConfirmModal() {
    cancel.addEventListener('click', (e) => {
      e.preventDefault();
      container.style.filter = 'none';
      confirmModal.style.display = 'none';
    });
  }

  openAlert() {
    container.style.filter = 'blur(5px)';
    alertModal.style.display = 'block';
  }

  closeAlert() {
    close.addEventListener('click', (e) => {
      e.preventDefault();
      container.style.filter = 'none';
      alertModal.style.display = 'none';
    });
  }

  removeHighlight() {
    let x = Array.from(displayPortfolioStocks.childNodes).map((stock) => {
      return stock.childNodes[1];
    });
    x.filter(Boolean).forEach((y) =>
      y.parentElement.classList.remove('highlight')
    );
  }
}

export default new UI();
