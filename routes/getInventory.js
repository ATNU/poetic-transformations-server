const express = require('express');
const router = express.Router();
const http = require('http');
const fs = require('fs');
const query = fs.readFileSync('./queries/getInventory.xql', 'UTF-8');
const URI = require('../util/connection.js').URIQuery;

/**
 * GET information (author, title) for all files stored in the database.
 *
 * /inventory
 */
router.get('/', function(req, res) {

    //testing
    console.log('inventory route reached');

    const URL = URI + query;

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


