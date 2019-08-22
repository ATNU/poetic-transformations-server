const _ = require ('underscore');
const similarity = require('../util/cosine-similarity.js');

/**
 * Takes 'files' in the form of lists of JSON objects
 * @param fileOne
 * @param fileTwo
 * @returns {*[]} 2 JSON lists of line objects
 */
module.exports = function (fileOne, fileTwo) {

    const fileOneLength = fileOne.length;
    const fileTwoLength = fileTwo.length;

    //variable to keep track of the next spine index to assign
    let spineIndexCounter = 1;


    //----- comparison loops
    //for each sentence in the first text
    let i;
    for (i = 0; i < fileOneLength; i++) {

        console.log("File one sentence number: " + i);

        //get first sentence and remove punctuation
        let sentenceObjectOne = fileOne[i];
        let sentenceOneWithPunc = sentenceObjectOne._text;
        let sentenceFromFileOne;

        //todo check why the text element of a line might be undefined - at present these are just excluded

        //check if text is a list before removing punctuation (list indicates additions and deletions)
        if (_.isArray(sentenceOneWithPunc)) {
            sentenceFromFileOne = removePuncAndCombine(sentenceOneWithPunc).toString();
        }
        else if(sentenceOneWithPunc !== undefined) {
            sentenceFromFileOne = sentenceOneWithPunc.replace( /[^\w\s]/g, "").toString();
        }

        else { //can't work with an undefined element so assign next spine index and move on
            sentenceObjectOne.spineIndex = spineIndexCounter;
            spineIndexCounter++;
            continue;
             }


        console.log("sentence one: " + sentenceFromFileOne, '\n');

        //compare with each sentence in the second text
        let j;
        for (j=0; j < fileTwoLength; j++)
        {
            //todo exclude a sentence from file 2 if it has already been matched with one in file one
            //todo consider whether that spine index has already been assigned in that file to prevent duplicates

            console.log("File two sentence number: " + j);

            //get second sentence and remove punctuation
            let sentenceObjectTwo = fileTwo[j];
            let sentenceTwoWithPunc = sentenceObjectTwo._text;
            let sentenceFromFileTwo;

            //check if text is a list before removing punctuation (list indicates additions and deletions)
            if (_.isArray(sentenceTwoWithPunc)) {
                sentenceFromFileTwo = removePuncAndCombine(sentenceTwoWithPunc).toString();
            }
            else if (sentenceTwoWithPunc !== undefined) {
                sentenceFromFileTwo = sentenceTwoWithPunc.replace( /[^\w\s]/g, "").toString();
            }

            else {
                break;
            }

            console.log("sentence two: " + sentenceFromFileTwo, '\n');

            //----- compare sentences and assign spine indexes
            const similarityScore = similarity(sentenceFromFileOne, sentenceFromFileTwo);

            console.log ("similarity score: " + similarityScore, '\n');

            if (similarityScore >= 0.8)
            {
                console.log("similarity score indicates a match", '\n');
                //if sentence 1 has a spine index already then assign this to sentence 2 as well and move on to next sentence from file 1
                if (sentenceObjectOne.hasOwnProperty('spineIndex') && sentenceObjectOne.spineIndex !== "")
                {
                    console.log("sentence one already has a spine index so copy to sentence two");
                    //add the spine index from sentence 1 to sentence 2
                    //don't need to increment spineIndex counter
                    sentenceObjectTwo.spineIndex = sentenceObjectOne.spineIndex;
                }

                //else if sentence 2 has a spine index already then assign this to sentence 1 and move on to next sentence from file 1
                else if (sentenceObjectTwo.hasOwnProperty('spineIndex') && sentenceObjectOne.spineIndex !== "")
                {
                    console.log("sentence two already has a spine index so copy to sentence one");
                    //add the spine index from sentence 2 to sentence 1
                    //don't need to increment spine index
                    sentenceObjectOne.spineIndex = sentenceObjectTwo.spineIndex;
                }

                //else neither sentence has a spine index yet so assign the next one on counter
                else {
                    console.log("neither sentence has a spine index yet so a new one will be assigned");
                    sentenceObjectOne.spineIndex = spineIndexCounter;
                    sentenceObjectTwo.spineIndex = spineIndexCounter;
                    spineIndexCounter++;
                }

                break;
            }

            //----- if the similarity isn't high enough then move on to next sentence in file 2

        }

        // ----- if reach this point then no sentences in file  match the sentence from file 1, so just assign the next spine index to sentence one if it doesn't already have one

        if (!sentenceObjectOne.hasOwnProperty('spineIndex'))
        {
            sentenceObjectOne.spineIndex = spineIndexCounter;
            spineIndexCounter++;
        }

    }

    return [fileOne, fileTwo];

};


function removePuncAndCombine(list) {
    let whole = [];

    for (let i = 0; i < list.length; i++) {
        const part = list[i];
        const noPunc = part.replace( /[^\w\s]/g, "");
        whole.push(noPunc);
    }
    return whole;
}
