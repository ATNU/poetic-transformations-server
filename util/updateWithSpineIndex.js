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

    //-----get a list of the line IDs in the original poem
    const lines = getLines(original);
    const lineMap = map(lines);
    let ids = [];

    lineMap.forEach(function(item) {
        const xmlId = item._attributes["xml:id"];
        ids.push(xmlId);
    });

    //-----update spine index for each line
    ids.forEach(function(id) {
        let spineIndex;

        //get spine index for that line ID from the spineIndexVersion
        for (let index = 0; index < spineIndexVersion.length; index++) {
            const currentLine = spineIndexVersion[index];
            if (currentLine["xml:id"] === id) {
                //todo error checking spine index exists
                spineIndex = currentLine["spineIndex"];
                break;
            }

            //todo there's a problem - that ID isn't in updated Version
        }

        //get line from original with matching ID
        for ()

        //add or update spineIndex field to original
        if (lineMap.hasOwnProperty('spineIndex') && sentenceObjectOne.spineIndex !== "")

    })


}