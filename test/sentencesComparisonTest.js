const assert = require('assert');
const comparison = require('../util/sentencesComparison.js');


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
    it ('should label file 2 sentence 3 correctly (same line as first sentence in file 1)', function () {
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
});