const assert = require('assert');
const comparison = require('../util/cosine-similarity.js');


describe('cosine-similarity for sentence comparison', function() {
    it('should return 1 (or greater for rounding)', function () {
        const sentenceOne = "But what was Pakistan? A country,";
        const sentenceTwo = "But what was Pakistan? A country,";

        const similarity = comparison(sentenceOne, sentenceTwo);

        assert.ok(similarity >= 1);
    });
    it('should return greater then 0.5', function() {
        const sentenceOne = "But what was Pakistan? A country,";
        const sentenceTwo = "But what was";

        const similarity = comparison(sentenceOne, sentenceTwo);

        console.log("test 2 similarity = " + similarity);
        assert.ok(similarity >= 0.5);
    });
    it('should return less then 0.5 with same punctuation', function () {
        const sentenceOne = "But what was Pakistan? A country,";
        const sentenceTwo = "Pakistan? is a place far away";

        const similarity = comparison(sentenceOne, sentenceTwo);

        console.log("test 3 similarity = " + similarity);
        assert.ok(similarity <= 0.5);
});
});