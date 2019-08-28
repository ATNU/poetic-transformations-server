const convert = require('../util/CSVToJSON.js').convert;

describe('convert', function() {
    it('works', function() {
        const csvFilePath='./data/fullSpineIndex.csv';
        console.log(convert(csvFilePath));
    });
});