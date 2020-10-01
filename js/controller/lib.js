import * as LS from './LSController.js';
import MyStocks from '../model/MyStocks.js';

const container = document.querySelector('.container');
const confirmModal = document.querySelector('.modal');
const alertModal = document.querySelector('.alert');
const proceed = document.querySelector('.proceed');
const cancel = document.querySelector('.cancel');
const close = document.querySelector('.close');

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

export function openAlert() {
  container.style.filter = 'blur(5px)';
  alertModal.style.display = 'block';
}

export function closeAlert() {
  close.addEventListener('click', (e) => {
    e.preventDefault();
    container.style.filter = 'none';
    alertModal.style.display = 'none';
  });
}

export function removeHighlight() {
  let x = Array.from(displayPortfolioStocks.childNodes).map((stock) => {
    return stock.childNodes[1];
  });
  x.filter(Boolean).forEach((y) =>
    y.parentElement.classList.remove('highlight')
  );
}
