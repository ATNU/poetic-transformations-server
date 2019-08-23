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
function comparisonList(versionList) {

    let comparisons = [];

    let count = 0;

    for (let i = 0; i < versionList.length; i++) {
        for (let j = i+1; j < versionList.length; j++ ) {
            comparisons[count] = {
                i:versionList[i].filename,
                j: versionList[j].filename
            };
            count++;
        }
        count++;
    }
    return comparisons;
}

function generateSpineIndex(title) {
    const comparisons = comparisonList(extractFilename(getListOfVersions()));

    //for each item in comp list (if it isn't empty), get file at first and second index points and compare
    for (let k = 0; k < comparisons.length; k++) {
        if (comparisons[k] === undefined) {
            continue;
        }
            else {

                const xml1 = fs.readFileSync("./data/" + comparisons[k].i);
                const xml2 = fs.readFileSync("./data/" + comparisons[k].j);
                const one = map(lines(parse(xml1)));
                const two = map(lines(parse(xml2)));

                const results = compare(one, two);
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
return versions  = [

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
        const name = versions[i]["filename"].replace('\/db\/transformations\/', '');
        namesOnly.push({filename: name });
    }
    return namesOnly;
}


module.exports.extractFilename = extractFilename;
module.exports.comparisonList = comparisonList;
module.exports.versionList = getListOfVersions;
module.exports.generateSpineIndex = generateSpineIndex;