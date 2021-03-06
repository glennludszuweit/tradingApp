const basicInfo = document.querySelector('.basic-info');
const displayPortfolioStocks = document.querySelector('.portfolio-stocks');

const search = document.querySelector('.search');
const submitBtn = document.querySelector('.reference');
const buyStocks = document.getElementById('buy-stocks');
const sellStocks = document.getElementById('sell-stocks');
const quantityInput = document.querySelector('.quantity');
const overview = document.querySelector('.overview');
const resetBtn = document.querySelector('.reset');

const displayNews = document.querySelector('.trading-news');
const displayTradingHistory = document.querySelector('.history');
const chartCanvas = document.querySelector('.myChart');

let timesStamps = [];
let currentPrice = [];
let highPrices = [];
let lowPrices = [];
let companyName = [];
let companySymbol = [];
let dataResolution = 'D';

let quantity = 1;
let cash = [];
