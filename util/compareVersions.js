const _ = require ('underscore');
const similarity = require('../util/cosine-similarity.js');

//variable to keep track of the next spine index to assign
let spineIndexCounter = 1;

/**
 * Takes two versions and compares each sentence in version 1 to each sentence in version 2. Each version should be a JSON object in the form:
 * [
            { "xml:id": 1.1, "_text":"To place myself in my grandmother's shoes,"},
            { "xml:id": 1.2, "_text": "her chappals paired in the bedroom cool"}
        ]}
 * Function creates and assigns a spine index field for each JSON object. Spine indexes are not created where the _text field of the JSON object is undefined. This happens where
 * there is an XML tag at the beginning of the line.
 * @param version1
 * @param version2
 * @returns
 */
        module.exports = function (version1, version2) {

    const version1Length = version1.length;
    const version2Length = version2.length;

    //----- comparison loops
    //for each sentence in the first text
    let i;
    for (i = 0; i < version1Length; i++) {

        //get first sentence and remove punctuation
        let sentenceObjectOne = version1[i];
        let sentenceOneWithPunc = sentenceObjectOne._text;
        let sentenceFromVersion1;


        //check if text is a list before removing punctuation (list indicates additions and deletions in the XML which break the line into a list)
        if (_.isArray(sentenceOneWithPunc)) {
            sentenceFromVersion1 = removePuncAndCombine(sentenceOneWithPunc).toString();
        }

        //if the sentence object or text component are undefined don't assign spine index as we can't look at this text
        else if (sentenceOneWithPunc === undefined) {
            continue;
        }

        else  {
            sentenceFromVersion1 = sentenceOneWithPunc.replace( /[^\w\s]/g, "").toString();
        }


        //compare with each sentence in the second text
        let j;
        for (j=0; j < version2Length; j++)
        {

            //get second sentence and remove punctuation
            let sentenceObjectTwo = version2[j];
            let sentenceTwoWithPunc = sentenceObjectTwo._text;
            let sentenceFromVersion2;

            //check if text is a list before removing punctuation (list indicates additions and deletions)
            if (_.isArray(sentenceTwoWithPunc)) {
                sentenceFromVersion2 = removePuncAndCombine(sentenceTwoWithPunc).toString();
            }
            else if (sentenceTwoWithPunc !== undefined) {
                sentenceFromVersion2 = sentenceTwoWithPunc.replace( /[^\w\s]/g, "").toString();
            }

            else {
                break;
            }


            //----- compare sentences and assign spine indexes
            const similarityScore = similarity(sentenceFromVersion1, sentenceFromVersion2);

            //0.7 seems to work as a cut-off for this poem
            if (similarityScore >= 0.7)
            {
                //if sentence 1 has a spine index already then assign this to sentence 2 as well and move on to next sentence from file 1
                if (sentenceObjectOne.hasOwnProperty('spineIndex') && sentenceObjectOne.spineIndex !== "")
                {
                    sentenceObjectTwo.spineIndex = sentenceObjectOne.spineIndex;
                }

                //else if sentence 2 has a spine index already then assign this to sentence 1 and move on to next sentence from file 1
                else if (sentenceObjectTwo.hasOwnProperty('spineIndex') && sentenceObjectOne.spineIndex !== "")
                {
                    sentenceObjectOne.spineIndex = sentenceObjectTwo.spineIndex;
                }

                //else neither sentence has a spine index yet so assign the next one on counter
                else {
                    sentenceObjectOne.spineIndex = spineIndexCounter;
                    sentenceObjectTwo.spineIndex = spineIndexCounter;
                    spineIndexCounter++;
                }

                break;
            }

            //if the similarity isn't high enough then move on to next sentence in file 2

        }

        // ----- if reach this point then no sentences in file  match the sentence from file 1, so just assign the next spine index to sentence one if it doesn't already have one
        if (!sentenceObjectOne.hasOwnProperty('spineIndex'))
        {
            console.log("spine index is " + sentenceObjectOne.spineIndex + " new spine index is " + spineIndexCounter);
            sentenceObjectOne.spineIndex = spineIndexCounter;
            spineIndexCounter++;
        }

    }

   const editedVersion1 = removeBlankSpineIndexes(version1);
   const editedVersion2 = removeBlankSpineIndexes(version2);

    return [editedVersion1, editedVersion2];

};

function removeBlankSpineIndexes(list) {
    let corrected = [];
for (let i=0; i<list.length; i++) {
  //only keep if there is a value set for spine index
    if ((list[i].spineIndex === undefined) || list[i].spineIndex === "") {
        continue;
    }
    else {
        corrected.push(list[i]);
    }
}
return corrected;
}

function removePuncAndCombine(list) {
    let whole = [];

    for (let i = 0; i < list.length; i++) {
        const part = list[i];
        const noPunc = part.replace( /[^\w\s]/g, "");
        whole.push(noPunc);
    }
    return whole;
}
