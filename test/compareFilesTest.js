const comparisonList = require('../util/compareFiles').comparisonList;
const versionList = require('../util/compareFiles.js').versionList;
const extract = require('../util/compareFiles.js').extractFilename;
const generate = require('../util/compareFiles.js').generateSpineIndex;

describe('generating comparison list', function() {
    it('should make list', function() {
    const versionList = [ { filename: 'B.xml' },
        { filename: 'M1.xml' },
        { filename: 'M2.xml' },
        { filename: 'M3.xml' },
        { filename: 'M4.xml' },
        { filename: 'M5.xml' },
        { filename: 'M6.xml' },
        { filename: 'P1.xml' },
        { filename: 'P2.xml' },
        { filename: 'P3.xml' } ];
    console.log(comparisonList(versionList));
    });
    it('should get list of versions', function() {
        const result = versionList("Alvi1");
        console.log(result);
    });

    it('should extract filenames correctly', function() {
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

        console.log(extract(versionList));
        });

    it('should generate correctly', function() {
        console.log(generate("title"));
    })
});