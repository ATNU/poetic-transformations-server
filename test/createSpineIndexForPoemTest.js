const comparisonList = require('../util/createSpineIndexForPoem').comparisonList;
const versionList = require('../util/createSpineIndexForPoem.js').versionList;
const extract = require('../util/createSpineIndexForPoem.js').extractFilename;
const generate = require('../util/createSpineIndexForPoem.js').generateSpineIndex;
const assert = require('assert');

describe('generating comparison list', function() {
    it('should make list with correct initial value', function () {

        const comparisons = comparisonList(8);
        assert. strictEqual(comparisons[0]["i"], 0);
        assert. strictEqual(comparisons[0]["ii"], 1);
    });

    it('should make list with correct 12th value', function () {

        const comparisons = comparisonList(8);
        assert. strictEqual(comparisons[12]["i"], 1);
        assert. strictEqual(comparisons[12]["ii"], 6);
    });
    it('should make empty list when list length is 0', function () {

        const comparisons = comparisonList(0);
       assert.strictEqual(comparisons.length, 0);
    });

    it('should make empty list when length is 1 as an item cannot be compared to itself', function () {

        const comparisons = comparisonList(0);
        assert.strictEqual(comparisons.length, 0);
    });


});

describe('extracting file path', function() {
    it('should extract filenames correctly', function () {
        const versionList = [

            {filename: '/db/transformations/B.xml'},
            {filename: '/db/transformations/M1.xml'},
            {filename: '/db/transformations/M2.xml'},
            {filename: '/db/transformations/M3.xml'},
            {filename: '/db/transformations/M4.xml'},
            {filename: '/db/transformations/M5.xml'},
            {filename: '/db/transformations/M6.xml'},
            {filename: '/db/transformations/P1.xml'},
            {filename: '/db/transformations/P2.xml'},
            {filename: '/db/transformations/P3.xml'}
        ];

        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly[0]["filename"], 'B.xml');

    });
    it('should not make any changes in path not present', function () {
        const versionList = [ {filename: "no path before name"}];
        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly[0]["filename"], 'no path before name');
        console.log(namesOnly);
    });
    it('should return empty name when no text', function () {
        const versionList = [ {filename: ""}];
        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly[0]["filename"], '');
        console.log(namesOnly);
    });

    it('should return empty list when no filename field', function () {
        const versionList = [ {name: ""}];
        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly.length, 0);
        console.log(namesOnly);
    });

    it('should return empty list when version list is not a list', function () {
        const versionList = {filename: ""};
        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly.length, 0);
        console.log(namesOnly);
    });
    it('should return empty list when string is submitted rather than JSON', function () {
        const versionList = "invalid";
        const namesOnly = extract(versionList);
        assert.strictEqual(namesOnly.length, 0);
        console.log(namesOnly);
    });
});

describe('generate spine index', function() {
    it('should generate correctly', function () {
        generate("title");
    });
});



