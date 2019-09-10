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


    const query = "xquery version '3.1';import module namespace kwic='http://exist-db.org/xquery/kwic';declare namespace tei= 'http://www.tei-c.org/ns/1.0';for $resource in collection('/db/transformations')//tei:TEI[ft:query(., '" + search +"')] let $path := base-uri($resource) let $name := replace($path, '/db/transformations/', '') let $result :=kwic:summarize($resource, <config width='100'/>) return  ( <text><title> {$resource//tei:title/text()} </title><author> {$resource//tei:author/text()} </author> <poemID> {$resource//tei:idno[@type='PTpoem']/text()} </poemID>  <versionID> {$resource//tei:idno[@type='PTid']/text()} </versionID> <filename>{$name}</filename><results>{$result}</results></text>)&_howmany=100";
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