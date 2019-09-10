const express = require('express');
const router = express.Router();
const http = require('http');
const fs = require('fs');
const indexQuery = fs.readFileSync('./queries/indexWithVersions.xq', 'UTF-8');
const URI = require('../util/connection.js').URIQuery;
const URINoDB = require('../util/connection.js').URINoDB;


/**
 * GET poem ID, author and number of versions for all poems stored in the database. Returns XML.
 *
 * /inv
 */
router.get('/', function(req, res) {

    //testing
    console.log('inventory route reached');
    //URL encode query
    const encodedQuery = encodeURI(indexQuery);

    const URL = URI + encodedQuery;

    console.log(URL);


    http.get(URL, (resp) => {
        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //end of response
        resp.on('end', () => {

            //can't find document
            if (resp.statusCode == 404) {
                res.status(404);
                res.send('Cannot retrieve results');
            }

            //can find document
            else {
                let json;
                /*//convert data to JSON
                     parser.parseString(data, function (err, result) {
                    json=result;
                }); */
                res.status(200);
                console.log(data);
                res.send(data);
            }
        });

    }).on('error', (err) => {
        console.log('Error: ' + err.message);
        res.send('Error: ' + err.message);
    });

});

/**
 * Get version ID, poem ID, version title, author and filename for all versions of a particular poem. Returns XML.
 *
 * /inv/:title
 */
router.get('/:title', function(req, res) {
    //testing
    console.log('index/title route reached');

    //----- generate database API call
    const title = req.params.title;
    const query = 'xquery version "3.1"; declare default element namespace "http://www.tei-c.org/ns/1.0"; let $versions :=collection(/db/transformations)/TEI/teiHeader/fileDesc/publicationStmt[idno ="' + title +'"] for $version in $versions let $path := base-uri($version) let $document := doc($path) let $name := replace($path, "/db/transformations/", "") let $changes :=  count($document/TEI/text/body/div/lg/l/descendant::*[not(self::hi or self::note)]) return (<version><poemID>{$version//idno[@type="PTpoem"]}</poemID><versionID>{$version//idno[@type="PTid"]}</versionID><versionTitle>{$document//title/text()}</versionTitle><author>{$document//author/text()}</author> <authority>{$document//authority/text()}</authority><source>{$document//sourceDesc/p/text()}</source><type>{$document//keywords/term/text()}</type><filename>{$name}</filename><changes>{$changes}</changes></version>)';
    //full address to call
    const encodedQuery = encodeURI(query);
    const URL = URI + encodedQuery;
    console.log(URL);

    http.get(URL, (resp) => {
        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //end of response
        resp.on('end', () => {

            //can't find document
            if (resp.statusCode == 404) {
                res.status(404);
                res.send('Cannot retrieve results');
            }

            //can find document
            else {
                let json;
               /* //convert data to JSON
                parser.parseString(data, function (err, result) {
                    json=result;
                });*/
                res.status(200);
                res.send(data);
            }
        });

    }).on('error', (err) => {
        console.log('Error: ' + err.message);
        res.send('Error: ' + err.message);
    });
});




module.exports = router;


