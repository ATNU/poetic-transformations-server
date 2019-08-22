const comparisonList = require('../util/compareFiles').comparisonList;
const versionList = require('../util/compareFiles.js').versionList;

describe('generating comparison list', function() {
    it('should make list', function() {
    const listLength = 8;
    console.log(comparisonList(listLength));
    });
    it('should get list of versions', function() {
        const result = versionList("Alvi1");
       // console.log(result);
    });
});