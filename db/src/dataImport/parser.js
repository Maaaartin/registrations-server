const { parse } = require('csv-parse/sync');
const headerMap = require('../headerMap.json');
const { logError } = require('./helpers');

const parseOptions = {
  columns: Object.keys(headerMap),
  relaxColumnCount: true,
  quote: String.fromCodePoint(0x0022),
  relaxQuotes: true,
  onRecord: (...params) => {
    console.log(params);
  }
};

exports.parseLines = function (lines) {
  const records = [];
  parse(lines.join('\n'), {
    ...parseOptions,
    onRecord: (record, context) => {
      if (context.error && context.index <= context.columns.length) {
        logError(
          './errors_csv.csv',
          context.error.message,
          JSON.stringify(lines[context.lines - 1])
        );
        return;
      }
      records.push(record);
    }
  });
  return records;
};
