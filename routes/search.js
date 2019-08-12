const express = require('express');
const router = express.Router();
const http = require('http');
const URI = require('../util/connection.js').URIQuery;


/**
 *
 *
 */
router.get('/:searchTerm', function(req, res) {

    //----- generate database API call
    const search = req.params.searchTerm;

//xquery version and TEI namespace
    const querySetup = "xquery version '3.1';import module namespace kwic='http://exist-db.org/xquery/kwic';declare namespace tei = 'http://www.tei-c.org/ns/1.0';";
    const queryStatement = "for $resource in collection('/db/transformations')//tei:TEI[ft:query(.," + "'" + search + "')] return  ( <title> {$resource//tei:title/text()} </title>, <author> {$resource//tei:author/text()} </author>, <idno> {$resource//tei:idno/text()} </idno>,kwic:summarize($resource, <config width='100'/>))&_howmany=100";
    const query = querySetup + queryStatement;
    // full address to call
    const URL = encodeURI(URI + query);
    console.log(URL);


    //-----GET call and send response
    http.get(URL, (resp) => {
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
                //todo if no results then send empty rather than xml


                res.status(200);
                res.send(data);
            }
        });
    });

});


module.exports = router;