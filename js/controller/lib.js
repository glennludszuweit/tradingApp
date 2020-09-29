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

export function setLocalStorageStocks() {
  let obj = {};

  if (GET('stocks') === null) {
    localStorageStocks = [];
  } else {
    localStorageStocks = GET('stocks');
  }

  obj.symbol = companySymbol[0];
  obj.quantity = +quantity;

  obj.price = currentPrice[0];
  obj.value = quantity * currentPrice[0];

  LSValue = obj.value;
  localStorageStocks.push(obj);
  SET('stocks', localStorageStocks);
}

export function setLocalStorageCash() {
  if (GET('cash') === null) {
    cash = SET('cash', 1000000);
  } else {
    cash = GET('cash') - LSValue;
  }

  SET('cash', cash);
}

export function setLocalStorageBalance() {
  if (GET('balance') === null) {
    balance = SET('balance', 1000000);
  } else {
    balance = GET('cash');
  }

  SET('balance', balance);
}
