const express = require('express');
const router = express.Router();
const URI = require('../util/connection.js').URIQuery;
const http = require('http');

router.get('/', function(req, res) {

    //----- generate database API call
    const line = req.query.lineID;
const text = line.match('[A-Z]*[0-9]*(?=\\.)');

    const query = 'xquery version "3.1"; declare default element namespace "http://www.tei-c.org/ns/1.0"; let $doc := doc("/db/transformations/' + text + '.xml") return ($doc/TEI/text/body/div/lg/l[@xml:id="' + line + '"])';
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
