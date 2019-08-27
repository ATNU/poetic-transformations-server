const express = require('express');
const router = express.Router();
const http = require('http');
const URI = require('../util/connection.js').URINoDB;

/**
 *  GET a single resource given it's filename as a query parameter
 *  /doc/:path
 *
 *  */
router.get(
    '/:path',

    function(req, res) {

        const name = req.params.path;
        const path = '/db/transformations/' + name;

        const URL = URI + path;
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