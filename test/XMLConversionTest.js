const assert = require('assert');
const fs = require('fs');
const convert = require('../util/XMLConversion').parseXml;
const getLines = require('../util/XMLConversion').getLines;
const map = require('../util/XMLConversion').idTextMap;
const justText = require('../util/XMLConversion').justText;

describe('parse XML', function () {
    it('should return correct string', function () {
        const xml = '<text><title>Test Poem</title><body><line>line one</line><line>line2</line></body></text>';
        const result = convert(xml);
        assert.strictEqual(result.text.body.line[0]._text, "line one");
    });
});



describe('convert to JSON', function () {
    const xml = fs.readFileSync('./sampleXml/B.xml', 'UTF-8');
    const result = convert(xml);
    const lines = getLines(result);
    const mapped = map(lines);
    assert.strictEqual(mapped[0]["_text"], 'To place myself in my grandmother\'s shoes,');
});

describe('convert from xml to one long string', function() {
    const xml = fs.readFileSync('./data/M1.xml', 'UTF-8');
    console.log(justText(xml));
});

