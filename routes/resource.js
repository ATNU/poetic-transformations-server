const express = require('express');
const router = express.Router();
const http = require('http');
const URI = require('../util/connection.js').URIQuery;

/**
 *  GET a single version of a poem given it's filename as a query parameter. Returns XML.
 *  /doc/:path
 *  */
router.get(
    '/:path',

    function(req, res) {

        const name = req.params.path;

        const query = 'xquery version "3.1"; declare default element namespace "http://www.tei-c.org/ns/1.0"; let $result := transform:transform(doc("xmldb:exist://db/transformations/' + name + '"), doc("xmldb:exist://db/transformations/transform2HTMLDiv.xsl"), ()) return $result';

        const URL = process.env.DB_CONNECTION_STRING + '/db/transformations?_query=' + query;
        console.log(URL);

        //----- GET call and send response
            http.get(URL, (resp) => {
                let data = '';

                //a chunk of data has been received, add to data
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                //end of response so check status and send
                resp.on('end', () => {

                    //can't find document
                    if (resp.statusCode === 404) {
                        res.status(404);
                        res.send('Cannot find document');
                    }

                    //can find document
                    else {
                        res.status(200);
                        res.send(data);
                    }
                });
            });

});



module.exports = router;
