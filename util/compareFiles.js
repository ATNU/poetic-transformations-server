const URI = require('../util/connection.js').URIQuery;
const http = require('http');

/** Generate list of pairs of file numbers so that each file in the list is compared to every other one once
 *
 * @param length
 */
function comparisonList(length) {
    let comparisons = [];

    let count = 0;

    for (let i = 0; i < length; i++) {
        for (let j = i+1; j < length; j++ ) {
            comparisons[count] = {
                i:i,
                j: j
            };
            count++;
        }
        count++;
    }
    return comparisons;
}

function generateSpineIndex() {
    //get list of files in database under same poem ID and count
    //generate comparison list
    //for each item in comp list (if it isn't empty), get file at first and second index points and compare
    //write results to CSV
    //repeat for next line in comp list



}

function getListOfVersions(title) {

    //todo remove whitespace
    const querySetup = 'xquery version "3.1"; declare default element namespace "http://www.tei-c.org/ns/1.0";';
    const queryStatement = 'let $versions :=collection(/db/transformations)/TEI/teiHeader/fileDesc/publicationStmt[idno= "' + title + '"]' +
    'for $version in $versions let $path := base-uri($version) let $document := doc($path) return (<filename>{$path}</filename>)';
    const query = querySetup + queryStatement;
    //full address to call
    const URL = encodeURI(URI + query);
    console.log(URL);

    http.get(URL, (resp) => {
        let data = '';
    console.log("sending");
        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
            console.log("receiving");
        });

        //end of response
        resp.on('end', () => {
                console.log(JSON.parse(data));
                return data;
        });

    }).on('error', (err) => {
        console.log('Error: ' + err.message);
        res.send('Error: ' + err.message);
    });

}

module.exports.comparisonList = comparisonList;
module.exports.versionList = getListOfVersions;