const convert = require('../util/CSVToJSON.js').convert;
const lodash = require('lodash');

function sharedSpine(lineID) {
    let spineIndex;

    //get spine index for line
    const jsonFull = convert('./data/fullSpineIndex.csv');

    for (let o of jsonFull) {
        if (o["xml:id"] === lineID) {
            spineIndex = o["spineIndex"];
        }
    }

    if (spineIndex !== undefined) {
        const spineIndexPlusOne = spineIndex--;

        //get all other lines for that spine index
        const jsonGrouped = convert('./data/groupedSpineIndex.csv');
        const line = jsonGrouped[spineIndex];

        if (line !== undefined) {
            //make string into array
            const fullList = line["xml:id"].split(',');
            //remove requested line
            const afterRemoval = lodash.filter(fullList, function(o) { return o !== lineID } );

          return afterRemoval;

        }
    }
}

module.exports.sharedSpine = sharedSpine;