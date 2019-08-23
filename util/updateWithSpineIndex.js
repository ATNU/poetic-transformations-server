const getLines = require('../util/XMLParser.js').getLines;
const map = require('../util/XMLParser.js').idTextMap;


//get full version of xml - originalJSO
//get updated JSON version for that file


//for each line of the originalJSON, 1. get xml:id, 2. get matching line from updatedJSON 3. if updatedJSON has spine index then add this to originalJSON
//convert originalJSON back to xml
/**
 *
 * @param original
 * @param spineIndexVersion
 */
function updateOriginal(original, spineIndexVersion) {

    const lines = original["TEI"]["text"]["body"]["div"]["lg"];


    //-----update spine index for each line
    //each text block
    for (let k = 0; k < lines.length; k++) {
        const block = lines[k]["l"];

        //each line object
        for (let m = 0; m < block.length; m++) {
            const line = block[m];

            const originalID = line._attributes["xml:id"];

            //get spine index version of that line
            //look through each spine index object to find match
            for (let i = 0; i < spineIndexVersion.length; i++) {
                const updatedID = spineIndexVersion[i]["xml:id"];
                if (updatedID === originalID) {
                    //take the spine index from updated version and add to original
                    line._attributes["spineIndex"] = "" + spineIndexVersion[i]["spineIndex"] + "";
                    break;
                }
                //todo what happens if no match is found - something has gone wrong

            }
        }

        return original;
    }

}

    module.exports.updateOriginal = updateOriginal;

