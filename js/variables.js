const container = document.querySelector('.container');

const search = document.querySelector('.search');
const resolution = document.querySelector('.resolution');
const submitBtn = document.querySelector('.reference');

const companyInfo = document.querySelector('.company-info');
const companyBasicInfo = document.querySelector('.price-details_comp-name');
const basicInfo = document.querySelector('.basic-info');

const displayPortfolioStocks = document.querySelector('.portfolio-stocks');

const quantityInput = document.querySelector('.quantity');

const displayCash = document.querySelector('.cash');
const displayBalance = document.querySelector('.balance');

const buyStocks = document.getElementById('buy-stocks');
const sellStocks = document.getElementById('sell-stocks');

const confirmModal = document.querySelector('.modal');

let totalStockValue = document.getElementById('stock-value');

let selectedCompany;

let chartType = 'bar';

let dataResolution = 'D';
let myChart;

let timesStamps = [];
let currentPrice = [];
let highPrices = [];
let lowPrices = [];
let companyName = [];
let companySymbol = [];

let localStorageStocks = [];
let cash = [];
let balance = [];
let quantity = 1;

let LSValue = 0;
