const compare = require('./sentencesComparison.js');
const fs = require('fs');
const parse = require('./XMLParser.js').parseXml;
const lines = require('./XMLParser.js').getLines;
const map = require('./XMLParser.js').idTextMap;
const save = require('./saveToCSV.js').saveToFile;

/** Generate list of pairs of files so that each file in the list is compared to every other one once
 *
 * @param length
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

function generateSpineIndex(title) {
    //const comparisons = comparisonList(extractFilename(getListOfVersions()));

    //create list of a map for each file to update and retrieve from for comparisons
    const mapped = generateMapObjects(getListOfVersions());

    const comparisonIndex = comparisonList(mapped.length);

    //for each line in comparison index get the 2 json objects indicated by the i and ii values
    for (let k = 0; k < comparisonIndex.length; k++) {
        if (comparisonIndex[k] !== undefined) {

            const index1 = comparisonIndex[k].i;
            const index2 = comparisonIndex[k].ii;

            let one = mapped[index1];
            let two = mapped[index2];


            console.log(mapped[index1][0]["xml:id"]);
            console.log(mapped[index2][0]["xml:id"]);
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


function getListOfVersions() {
//todo get http call to work
    /*   const querySetup = 'xquery version "3.1"; declare default element namespace "http://www.tei-c.org/ns/1.0";';
       const queryStatement = 'let $versions :=collection(/db/transformations)/TEI/teiHeader/fileDesc/publicationStmt[idno= "' + title + '"]' +
           'for $version in $versions let $path := base-uri($version) let $document := doc($path) return (<filename>{$path}</filename>)';
       const query = querySetup + queryStatement;
       //full address to call
       console.log("query:" + query);
       const encodedQuery = encodeURI(query);
       const URL = 'http://192.168.99.100:8080/exist/rest/db/transformations?_query=' + encodedQuery;
       console.log(URL);

       const resulting = getVersions.getVersions(options, (result) = > {
           return result;
       }); */
    return versions = [

        {filename: '/db/transformations/M1.xml'},
        {filename: '/db/transformations/M2.xml'},
        {filename: '/db/transformations/M3.xml'}/*,
        {filename: '/db/transformations/M4.xml'},
        {filename: '/db/transformations/M5.xml'},
        {filename: '/db/transformations/M6.xml'},
        {filename: '/db/transformations/P1.xml'},
        {filename: '/db/transformations/P2.xml'},
        {filename: '/db/transformations/P3.xml'},
        {filename: '/db/transformations/B.xml'}*/
    ]

}


function extractFilename(versions) {
    const namesOnly = [];
    for (let i = 0; i < versions.length; i++) {
        const name = versions[i]["filename"].replace('\/db\/transformations\/', '');
        namesOnly.push({filename: name});
    }
    return namesOnly;
}

function generateMapObjects(versions) {
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