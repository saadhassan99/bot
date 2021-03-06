const program = require('commander')
const Backtester = require('./src/backtester')
const Trader = require('./src/trader')
const config = require('./configuration')
const Ticker = require('./src/ticker')

const now = new Date()
const yesterday = new Date(now - (24 * 60 * 60 * 1e3))

function toDate(val) {
  return new Date(val * 1e3)
}

program.version('1.0.0')
  .option('-i, --interval [interval]', 'Interval in seconds for candlestick', parseInt)
  .option('-p, --product [product]', 'product identifier', 'BTC-USD') 
  .option('-s, --start [start]', 'Start time in unix seconds', toDate, yesterday)
  .option('-e, --end [end]', 'End time in unix seconds', toDate, now)
  .option('-t, --strategy [strategy]', 'Strategy Type')
  .option('-l, --live', 'Run live')
  .parse(process.argv)


const main = async function() {
  const { interval, product, start, end, strategy, live } = program

  if (live) {
    const trader = new Trader({ 
      start, end, product, interval, strategyType: strategy
    })

    await trader.start()
  } else {
    const tester = new Backtester({
      start, end, product, interval, strategyType: strategy
    })

    await tester.start()
  }
  /*
  console.log(interval)
  console.log(product)
  console.log(new Date(start * 1e3))
  console.log(new Date(end * 1e3))
  */
}

main()