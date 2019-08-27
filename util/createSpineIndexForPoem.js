const compare = require('./compareVersions.js');
const fs = require('fs');
const parse = require('./XMLConversion').parseXml;
const lines = require('./XMLConversion').getLines;
const map = require('./XMLConversion').idTextMap;
const save = require('./saveToCSV.js').saveToFile;

/**
 * Compare all versions of a single poem using cosine-similarity to generate a CSV file describing each spine index and line ID. Creates a full automated spine index assignment.
 * @param title
 */
function generateSpineIndex(title) {
    //const comparisons = comparisonList(extractFilename(getListOfVersions()));

    //create list of a map for each file to update and retrieve from for comparisons
    const mapped = generateJSONObjects(getListOfVersions());

    const comparisonIndex = comparisonList(mapped.length);

    //for each line in comparison index get the 2 json objects indicated by the i and ii values
    for (let k = 0; k < comparisonIndex.length; k++) {
        if (comparisonIndex[k] !== undefined) {

            const index1 = comparisonIndex[k].i;
            const index2 = comparisonIndex[k].ii;

            let one = mapped[index1];
            let two = mapped[index2];

            const results = compare(one, two);

            //update main list of spine indexes for future comparisons to use
            one = results[0];
            two = results[1];

            //append to CSV file
            save(results[0]);
            save(results[1]);
        }
    }
}

/** Generate list of pairs of indexes so that each file in the list is compared to every other one once, e.g. 1 should be compared to 2, 1 should be compared to 3 etc.
 *
 * @param length of list
 */
function comparisonList(length) {

    let comparisons = [];

    let count = 0;

    for (let m = 0; m < length; m++) {
        for (let n = m + 1; n < length; n++) {
            comparisons[count] = {
                i: m,
                ii: n
            };
            count++;
        }
        count++;
    }
    return comparisons;
}



function getListOfVersions() {
    return  [

        {filename: '/db/transformations/M1.xml'},
        {filename: '/db/transformations/M2.xml'},
        {filename: '/db/transformations/M3.xml'},
        {filename: '/db/transformations/M4.xml'},
        {filename: '/db/transformations/M5.xml'},
        {filename: '/db/transformations/M6.xml'},
        {filename: '/db/transformations/P1.xml'},
        {filename: '/db/transformations/P2.xml'},
        {filename: '/db/transformations/P3.xml'},
        {filename: '/db/transformations/B.xml'}
    ]
}


function extractFilename(versions) {

    const namesOnly = [];
    for (let i = 0; i < versions.length; i++) {

        //if filename is undefined skip to next index
        if (versions[i]["filename"] === undefined)
        {
            continue;
        }

        const name = versions[i]["filename"].replace('\/db\/transformations\/', '');
        namesOnly.push({filename: name});
    }
    return namesOnly;
}

/**
 * For each XML file, create a list of JSON objects with each object representing a line from the poem version containing the text and the line ID
 * @param versions
 * @returns {Array}
 */
function generateJSONObjects(versions) {
    let mappedList = [];

    for (let i = 0; i < versions.length; i++) {
        const name = versions[i]["filename"].replace("/db/transformations/", "");

        //get xml and convert
        const xml = fs.readFileSync("./data/" + name);
        const mapped = map(lines(parse(xml)));
        mappedList.push(mapped);
    }
    return mappedList;
}

module.exports.extractFilename = extractFilename;
module.exports.comparisonList = comparisonList;
module.exports.versionList = getListOfVersions;
module.exports.generateSpineIndex = generateSpineIndex;