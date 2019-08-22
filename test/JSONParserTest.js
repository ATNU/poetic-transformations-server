const toXML  = require('../util/JSONParser.js').toXml;
const fs = require('fs');

describe('converting JSON to XML', function () {
    it('should convert', function() {
        const json = fs.readFileSync("./sampleXml/JSONForConversion", 'UTF-8' );
        console.log(json);
        const result = toXML(json);
        console.log(result);
    })
});
