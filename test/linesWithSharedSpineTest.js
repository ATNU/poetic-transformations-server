const assert = require('assert');
const sharedSpine = require('../util/linesWithSharedSpine.js').sharedSpine


describe('shared spine', function() {
   it('should work', function() {
       const matching = sharedSpine('M1.2');
       console.log(matching);
   });
});