import Stocks from './Stocks.js';

export default class MyStocks extends Stocks {
  constructor(symbol, resolution, quantity, price, value) {
    super(symbol, resolution);
    this.quantity = quantity;
    this.price = price;
    this.value = value;
  }

  async combinedFetchedData() {
    try {
      let data = await Promise.all([
        this.companyInfo(),
        this.companyStockQoutes(),
      ]);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
