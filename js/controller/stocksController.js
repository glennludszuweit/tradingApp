import MyStock from '../model/MyStocks.js';
import LS from './lsController.js';

class StocksController {
  totalQuantity(symbol) {
    return LS.GET('stocks').reduce(
      (acc, stock) => (symbol === stock.symbol ? acc + stock.quantity : acc),
      0
    );
  }

  calculateInvestments() {
    let stocks = LS.GET('stocks');
    if (stocks) {
      let total = stocks.reduce((acc, stock) => acc + stock.value, 0);
      return total;
    } else {
      return;
    }
  }

  async calculateStocksValue() {
    let x = LS.GET('stocks').map(async (stock) => {
      let list = new MyStock(
        stock.symbol,
        dataResolution,
        stock.quantity,
        stock.price,
        stock.value
      );
      let data = await list.companyStockQoutes();
      return data.c * stock.quantity;
    });
    let values = await Promise.all(x);
    let total = values.reduce((acc, val) => {
      return acc + val;
    });
    return total;
  }
}

export default new StocksController();
