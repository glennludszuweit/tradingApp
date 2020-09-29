import MyStocks from '../model/MyStocks.js';

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
    obj.value = obj.quantity * obj.price;

    LSValue = obj.value;
    localStorageStocks.push(obj);
    SET('stocks', localStorageStocks);
}

export function setLocalStorageCash() {
    if (GET('cash') === null) {
        SET('cash', (cash = 1000000));
    } else {
        cash = GET('cash') - LSValue;
    }

    SET('cash', cash);
}

export async function setLocalStorageBalance() {
    if (GET('balance') === null) {
        SET('balance', (balance = 1000000));
    } else {
        let x = GET('stocks').map(async (stock) => {
            let list = new MyStocks(
                stock.symbol,
                dataResolution,
                stock.quantity,
                stock.price,
                stock.value
            );
            let data = await list.companyStockQoutes();
            return data.c * stock.quantity;
        });

        console.log(x); //(3) [Promise, Promise, Promise]

        let values = await Promise.all(x); //[ech price * quantity]

        console.log(values); //[114.96, 20944, 1034.6399999999999]

        let total = values.reduce((acc, val) => {
            return acc + val;
        });

        console.log(total); //22093.6

        balance = GET('cash') + total;
    }

    SET('balance', balance);
}
