const csvToJson = require('convert-csv-to-json');

function convert(csvFilePath) {
 let json = csvToJson.getJsonFromCsv(csvFilePath);
 return json;
}

module.exports.convert = convert;