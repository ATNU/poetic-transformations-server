const express = require('express');
const router = express.Router();
const http = require('http');
const fs = require('fs');
const similarity = require('../util/cosine-similarity.js');
const parseString = require('xml2js').parseString;
const util = require('util');



router.get('/', function(req, res) {

    const one =  [
        { "line":"But what was Pakistan? A country,"},
        {"line": "a bolt-hole, a land of bone?"}
        ];

    const two = [
        {"line":"But what was Pakistan? A country,"},
        {"line": "a bolt-hole, a land of bone?"}
        ];

    //make objects into list of values (i.e. sentences)
    const sentencesOne = Object.values(one);
    const sentencesTwo = Object.values(two);
console.log(sentencesTwo);
    //variable to keep track of the next spineindex to assign
    let spineIndex = 1;


    //for each sentence in the first text
     let i;
     for (i = 0; i < sentencesOne.length; i++) {

         //compare with each sentence in the second text
         let j;
         for (j=0; j < sentencesTwo.length; i++)
         {

             //compare sentences. If the similarity is higher than 0.8 the sentences are matched and the loop should exit.
             const similarityScore = similarity(sentencesOne[i], sentencesTwo[j]);
             if (similarityScore >= 0.8)
             {
                 //it's a match
                 //todo assign spine index for both sentences and increment spineIndex by 1
                 console.log("sentence " + i + "matches with sentence " + j + "and both were assigned spine index " + spineIndex);
                 spineIndex++;
                 return;
             }

             else {
                 //there isn't a match
                 //todo assign ONLY sentence from text 1 to the spine index and increment spineIndex by 1
                 console.log("there were no matching sentences identified in text 2 so the line in text 1 was assigned spine index" + spineIndex);
                 spineIndex++;
             }

     }

    }

     console.log("completed");

});

module.exports = router;



/**const fileOne = fs.readFileSync('./sample xml/B.xml');
parseString(fileOne, function (err, result) {
    console.log(util.inspect(result, false, null));
});**/