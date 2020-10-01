const Cache = {
  URL: { date: Date.now(), data: { c: 123 } },
};

const cachedFetch = async (url) => {
  let data;
  let older = Date.now() - 5000;
  if (!Cache[url] || Cache[url].date < older) {
    const res = await fetch(url);
    data = await res.json();
    Cache[url] = { date: Date.now(), data };
    return data;
  } else {
    return Cache[url].data;
  }
};

export default class Stocks {
  key = 'btqofvf48v6oqq03kajg';
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

      const data = await cachedFetch(url);

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

      const data = await cachedFetch(url);

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

      const data = await cachedFetch(url);

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
