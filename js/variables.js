const basicInfo = document.querySelector('.basic-info');
const displayPortfolioStocks = document.querySelector('.portfolio-stocks');

const buyStocks = document.getElementById('buy-stocks');
const sellStocks = document.getElementById('sell-stocks');
const quantityInput = document.querySelector('.quantity');

const displayHomeView = document.querySelector('.stocks-news');
const chartCanvas = document.querySelector('canvas');

let chartType = 'bar';
let myChart;

let timesStamps = [];
let currentPrice = [];
let highPrices = [];
let lowPrices = [];
let companyName = [];
let companySymbol = [];
let dataResolution = 'D';

let quantity = 1;
let cash = [];
