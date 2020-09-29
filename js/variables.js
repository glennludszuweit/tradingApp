const basicInfo = document.querySelector('.basic-info');
const displayPortfolioStocks = document.querySelector('.portfolio-stocks');

const buyStocks = document.getElementById('buy-stocks');
const sellStocks = document.getElementById('sell-stocks');
const quantityInput = document.querySelector('.quantity');

let timesStamps = [];
let currentPrice = [];
let highPrices = [];
let lowPrices = [];
let companyName = [];
let companySymbol = [];
let dataResolution = 'D';
