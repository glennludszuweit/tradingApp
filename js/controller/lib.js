import * as LS from './localStorage.js';

const container = document.querySelector('.container');
const confirmModal = document.querySelector('.modal');
const proceed = document.querySelector('.proceed');
const cancel = document.querySelector('.cancel');

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
