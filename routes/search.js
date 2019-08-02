const express = require('express');
const router = express.Router();
const http = require('http');
const URI = require('../util/connection.js').URIQuery;


/**
 *  Returns full text for those files containing the search phrase
 *
 */
router.get('/:searchTerm', function(req, res) {

    //----- generate database API call
    const search = req.params.searchTerm;
    //xquery version and TEI namespace
    const querySetup = "xquery version \"3.1\"\; declare namespace tei = \"http://www.tei-c.org/ns/1.0\"\;";
    //from database config file - passed to Lucene as a string and returned in search
    const qname = "TEI";
    const queryStatement = "collection('/db/transformations')//tei:" + qname + "[ft:query(., '" + search + "')]";
    const query = querySetup + queryStatement;
    // full address to call
    const URL = URI + query;


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
                //todo if no results thensend empty rather than xml


                res.status(200);
                res.send(data);
            }
        });
    });

});


module.exports = router;