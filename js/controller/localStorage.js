import * as lib from './lib.js';
import MyStocks from '../model/MyStocks.js';

export function setLocalStorage() {
    //set stocks
    setLocalStorageStocks();
    // calculate cash
    setLocalStorageCash();
    displayCash.innerText = `$${lib.GET('cash').toFixed(2)}`;
    //calculate balance
    setLocalStorageBalance();
    displayBalance.innerText = `$${lib.GET('balance').toFixed(2)}`;
}

function setLocalStorageStocks() {
    let obj = {};

    if (lib.GET('stocks') === null) {
        localStorageStocks = [];
    } else {
        localStorageStocks = lib.GET('stocks');
    }

    obj.symbol = companySymbol[0];
    obj.quantity = +quantity;

    obj.price = currentPrice[0];
    obj.value = obj.quantity * obj.price;

    LSValue = obj.value;
    localStorageStocks.push(obj);
    lib.SET('stocks', localStorageStocks);
}

export function setLocalStorageCash() {
    if (lib.GET('cash') === null) {
        lib.SET('cash', (cash = 1000000));
    } else {
        cash = lib.GET('cash') - LSValue;
    }

    lib.SET('cash', cash);
}

export async function setLocalStorageBalance() {
    if (lib.GET('balance') === null) {
        lib.SET('balance', (balance = 1000000));
    } else {
        let x = lib.GET('stocks').map(async (stock) => {
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

        balance = lib.GET('cash') + total;
    }

    lib.SET('balance', balance);
}
