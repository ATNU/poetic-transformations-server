const assert = require('assert');
const comparison = require('../util/compareVersions.js');
const convert = require('../util/XMLConversion').parseXml;
const getLines = require('../util/XMLConversion').getLines;
const map = require('../util/XMLConversion').idTextMap;
const justText = require('../util/XMLConversion').justText;
const fs = require('fs');
const compareWholeVersions = require('../util/compareVersions.js').compareWholeVersions;

describe('sentences comparison with no previously assigned indexes', function () {
    it ('should label file 1 sentence 1 correctly', function () {
        let fileOne =  [
            { "xml:id": 1.1, "spineIndex": "", "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[0];
        console.log(labelledFileOne);
        assert.strictEqual(labelledFileOne[0].spineIndex, 1);
    });

    it ('should label file 1 sentence 2 correctly', function () {
        let fileOne =  [
            { "xml:id": 1.1, "spineIndex": "", "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[0];
        console.log(labelledFileOne);
        console.log(labelledFiles[1]);
        assert.strictEqual(labelledFileOne[1].spineIndex, 2);
    });

    it ('file 2 sentence 1 should not have an index defined (does not appear in file 1)', function () {
        let fileOne =  [
            { "xml:id": 1.1, "spineIndex": "", "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[0].spineIndex, undefined);
    });

    it ('should label file 2 sentence 2 correctly (same line, small change)', function () {
        let fileOne =  [
            { "xml:id": 1.1, "spineIndex": "", "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[1].spineIndex, 2);

    });

    it ('should label file 2 sentence 3 correctly (same line as first sentence in file 1)', function () {
        let fileOne =  [
            { "xml:id": 1.1, "spineIndex": "", "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[2].spineIndex, 1);

    });


});

describe('sentences comparison with some previously assigned indexes', function () {
    it ('should not change index in file 1', function () {
        let fileOne =  [
            { "xml:id": 1.1,"spineIndex": 5, "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"spineIndex": 6, "_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[0];
        assert.strictEqual(labelledFileOne[0].spineIndex, 5);
        assert.strictEqual(labelledFileOne[1].spineIndex, 6);
    });

    it ('file 2 sentence 1 should not have an index defined (does not appear in file 1)', function () {
        let fileOne =  [
            { "xml:id": 1.1,"spineIndex": 5, "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"spineIndex": 6, "_text": "her chappals paired in the bedroom cool"}
        ];
        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[0].spineIndex, undefined);
    });

    it ('should label file 2 sentence 2 correctly using spine index from file 2 (same line, small change)', function () {
        let fileOne =  [
            { "xml:id": 1.1,"spineIndex": 5, "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"spineIndex": 6, "_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[1].spineIndex, 6);

    });
    it ('should label file 2 sentence 3 correctly (same line as first sentence in file 1', function () {
        let fileOne =  [
            { "xml:id": 1.1,"spineIndex": 5, "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2,"spineIndex": 6, "_text": "her chappals paired in the bedroom cool"}
        ];

        let fileTwo = [
            {"xml:id": 2.1,"_text": "awaiting her smaller, browner feet" },
            {"xml:id": 2.2,"_text":"her strawberries paired in the bedroom, cool"},
            {"xml:id": 2.3,"_text": "To place myself in my grandmother's shoes,"}
        ];

        const labelledFiles = comparison(fileOne, fileTwo);
        const labelledFileOne = labelledFiles[1];
        assert.strictEqual(labelledFileOne[2].spineIndex, 5);

    });

    it ('should cope with real data', function () {
       const xml1 = fs.readFileSync('./sampleXml/M1.xml', 'UTF-8');
        const result1 = convert(xml1);
        const lines1 = getLines(result1);
        const mapped1 = map(lines1);

        const xml2 = fs.readFileSync('./sampleXml/M2.xml', 'UTF-8');
        const result2 = convert(xml2);
        const lines2 = getLines(result2);
        const mapped2 = map(lines2);
        console.log(mapped2);

        const labelledFiles = comparison(mapped1, mapped2);
        console.log(labelledFiles[0]);

    });
});

describe('compare whole versions', function() {
   it('should return 1 or higher for same poem', function()  {
       const xml1 = fs.readFileSync('./data/M1.xml', 'UTF-8');
       const text1 = justText(xml1);
       const xml2 = fs.readFileSync('./data/M1.xml', 'UTF-8');
       const text2 = justText(xml2);
       assert.ok(compareWholeVersions(text1, text2) >= 1);
    });
    it('should work for different texts', function()  {
        const xml1 = fs.readFileSync('./data/M1.xml', 'UTF-8');
        const text1 = justText(xml1);
        const xml2 = fs.readFileSync('./data/P1.xml', 'UTF-8');
        const text2 = justText(xml2);
       console.log(compareWholeVersions(text1, text2));
    });
    it('should work for sampple texts', function()  {
        const text1 = "This is a sentence not very much like the next one, although there are a small number of overlaps, this sent4ence is much longer";
        const text2 = "This is a sentencee far far shorter";
        console.log(compareWholeVersions(text1, text2));
    });
});