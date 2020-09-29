export default class Stocks {
  key = 'btfnh1748v6rl6gbnml0';
  dateFrom = moment().subtract('months', 3).unix();
  dateTo = moment().unix();

  constructor(symbol, resolution) {
    this.symbol = symbol;
    this.resolution = resolution;
  }

  async companyInfo() {
    try {
      const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${this.symbol.toUpperCase()}&token=${
        this.key
      }`;

      const res = await fetch(url);
      const data = await res.json();

      companyName.push(data.name);
      companySymbol.push(data.ticker);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async companyStockQoutes() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${this.symbol.toUpperCase()}&token=${
        this.key
      }`;

      const res = await fetch(url);
      const data = await res.json();

      currentPrice.push(data.c);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async companyStockCandles() {
    try {
      const url = `https://finnhub.io/api/v1/stock/candle?symbol=${this.symbol.toUpperCase()}&resolution=${this.resolution.toUpperCase()}&from=${
        this.dateFrom
      }&to=${this.dateTo}&token=${this.key}`;

      const res = await fetch(url);
      const data = await res.json();

      data.t.forEach((timestamp) => {
        timesStamps.push(new Date(timestamp * 1000).toDateString().slice(4));
      });

      data.h.forEach((highPrice) => {
        highPrices.push(highPrice);
      });

      data.l.forEach((lowPrice) => {
        lowPrices.push(lowPrice);
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
