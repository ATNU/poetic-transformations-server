const assert = require('assert');
const fs = require('fs');
const convert = require('../util/XMLParser.js').parseXml;
const getLines = require('../util/XMLParser.js').getLines;
const map = require('../util/XMLParser.js').idTextMap;

describe('parse XML', function () {
    it('should return correct string', function () {
        const xml = '<text><title>Test Poem</title><body><line>line one</line><line>line2</line></body></text>';
        const result = convert(xml);
        assert.strictEqual(result, '{\n    "text": {\n        "title": {\n            "_text": "Test Poem"\n        },\n        "body": {\n            "line": [\n                {\n                    "_text": "line one"\n                },\n                {\n                    "_text": "line2"\n                }\n            ]\n        }\n    }\n}');
    });
    it('should handle error', function () {
       const notXml = 'this is not xml</body>';
        const result = convert(xml);
       console.log(result);
    });
});

describe('convert to JSON', function () {
    const xml = fs.readFileSync('./sampleXml/M1Lines.xml', 'UTF-8');
    const xmlSample = '<text>line1</text>';
    const result = convert(xml);

    const lines = getLines(result);
    const idTextMap = map(lines);
    console.log(idTextMap);
});