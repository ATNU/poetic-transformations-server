const convert = require('../util/CSVToJSON.js').convert;
const lodash = require('lodash');

/**
 * Return list of lines that have the same spine index as the one submitted as a parameter. Returns an empty list if the line is unique and undefined if the line ID cannot be found.
 * @param lineID
 * @returns {Array}
 */
function sharedSpine(lineID) {
    let spineIndex;

    const jsonFull = convert('./data/fullSpineIndex.csv');

    //get spine index of key line
    for (let o of jsonFull) {
        if (o["xml:id"] === lineID) {
            spineIndex = o["spineIndex"];
        }
    }

    if (spineIndex !== undefined) {

        //get all other lines for that spine index (decreased by one to correspond with list index)
        const jsonGrouped = convert('./data/groupedSpineIndex.csv');
        const line = jsonGrouped[spineIndex-1];

        if (line !== undefined) {
            //make string into array
            const fullList = line["xml:id"].split(',');
            //remove requested line
            return lodash.filter(fullList, function(o) { return o !== lineID } );
        }
    }
}

module.exports.sharedSpine = sharedSpine;