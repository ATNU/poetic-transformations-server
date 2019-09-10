const express = require('express');
const router = express.Router();
const http = require('http');
const URI = require('../util/connection.js').URIQuery;

/**
 * GET request to search all versions of all poems for a particular search string. Returns version title, author, poem ID, version ID and filename for each match as well as a 'google search style' snippet from, the poem text surrounding the match.
 */
router.get('/:searchTerm', function(req, res) {

    //----- generate database API call
    const search = req.params.searchTerm;

//xquery version and TEI namespace
    const querySetup = "xquery version '3.1';import module namespace kwic='http://exist-db.org/xquery/kwic';declare default element namespace 'http://www.tei-c.org/ns/1.0';";
    const queryStatement = "for $resource in collection('/db/transformations')//TEI[ft:query(.," + "'" + search + "')]" +
        "let $path := base-uri($resource)" +
        "let $name := replace($path, '/db/transformations/', '')" +
   " return  (" +
        "<title> {$resource//title/text()} </title>," +
        "<author> {$resource//author/text()} </author>," +
        "<poemID> {$resource//idno[@type='PTpoem']/text()} </poemID>," +
    "<versionID> {$resource//idno[@type='PTid']/text()} </versionID>," +
    "<filename>{$name}</filename>," +
    "kwic:summarize($resource, <config width='100'/>))&_howmany=100";
    const query = querySetup + queryStatement;
    // full address to call
    const URL = encodeURI(URI + query);
    console.log(URL);


    //-----GET call and send response
    http.get(URL, (resp) => {
        console.log(resp.statusCode);

        let data = '';

        //a chunk of data has been received, add to data
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //end of response so check status and send
        resp.on('end', () => {

            //error
            if (resp.statusCode === 404) {
                res.status(404);
                res.send('Error');
            }

            //results
            else {
                res.status(resp.statusCode);
                res.send(data);
            }
        });
    });

});


module.exports = router;