const assert = require('assert');
const sharedSpine = require('../util/linesWithSharedSpine.js').sharedSpine;


describe('shared spine', function() {
   it('should return correct list', function() {
       const matching = sharedSpine('B.31');
       assert.strictEqual(matching[0], 'P2.35');
       assert.strictEqual(matching[1], 'P3.35');
       assert.strictEqual(matching.length, 2);
   });
    it('should return empty list where there is only one line for the spine index', function() {
        const matching = sharedSpine('P2.18');
        assert.strictEqual(matching.length, 0);
    });
    it('should return undefined when the line does not exist', function() {
        const matching = sharedSpine('B2.31');
        assert.ok(matching === undefined);
    });
});