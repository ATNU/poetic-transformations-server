/**
 * Function that implements the cosine-similarity function to calculate a measure of similarity between two sentences strings. This is done by way fo comparing the number of shared words there are between the two strings and
 * therefore does not take into account meaning. Strings should be stripped of punctuation. Returns number between 0 and 1. Numbers close to 1 indicate a high similarity.
 *
 * Credit for this code to Suman Kunwar: https://gist.github.com/sumn2u/118c284dc2abaa947eb8423fa9d47511#file-consine-similarity-js
 * @param strA
 * @param strB
 * @returns int
 */
module.exports = function (strA, strB) {
    //get list of all words in each string
    var termFreqA = termFreqMap(strA);
    var termFreqB = termFreqMap(strB);

    //combine these and remove duplicates
    var dict = {};
    addKeysToDict(termFreqA, dict);
    addKeysToDict(termFreqB, dict);

    //count number of times each word appears in each string
    var termFreqVecA = termFreqMapToVector(termFreqA, dict);
    var termFreqVecB = termFreqMapToVector(termFreqB, dict);

    //calculate cosine similarity
    return cosineSimilarity(termFreqVecA, termFreqVecB);
};


    function termFreqMap(str) {
        var words = str.split(' ');
        var termFreq = {};
        words.forEach(function(w) {
            termFreq[w] = (termFreq[w] || 0) + 1;
        });
        return termFreq;
    }

    function addKeysToDict(map, dict) {
        for (var key in map) {
            dict[key] = true;
        }
    }

    function termFreqMapToVector(map, dict) {
        var termFreqVector = [];
        for (var term in dict) {
            termFreqVector.push(map[term] || 0);
        }
        return termFreqVector;
    }

    function vecDotProduct(vecA, vecB) {
        var product = 0;
        for (var i = 0; i < vecA.length; i++) {
            product += vecA[i] * vecB[i];
        }
        return product;
    }

    function vecMagnitude(vec) {
        var sum = 0;
        for (var i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        return Math.sqrt(sum);
    }

    function cosineSimilarity(vecA, vecB) {
        return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
    }




