const assert = require('assert');
const sharedSpine = require('../util/linesWithSharedSpine.js').sharedSpine;


describe('shared spine', function() {
   it('should return correct list', function() {
       const matching = sharedSpine('B.31');
       console.log(matching);
   });
    it('should return empty list where there is only one line for the spine index', function() {
        const matching = sharedSpine('P2.18');
        console.log(matching);
    });
    it('should return undefined when the line does not exist', function() {
        const matching = sharedSpine('B2.31');
        console.log(matching);
    });
});