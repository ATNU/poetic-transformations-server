const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const http = require('http');
const URI = require('../util/connection.js').URINoDB;

/**
 *  GET a single resource given it's filename as a query parameter
 *  /doc/:path
 *
 *  */
router.get(
    '/:path',
   // validate(),
    function(req, res) {

        //testing
    console.log("Get route reached");
    console.log(req.params.path);
/*
    //------ Validate query
    const errors = validationResult(req);
    if (!errors.isEmpty()) //there are errors
    {
        console.log('invalid parameter found');
        res.status(400).json({errors: errors.array() });
    }


    else {*/
        const name = req.params.path;
        const URL = URI + name;
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

   // }
});





/**
 * Error checking to validate parameters
 * @returns {Array}
 */
function validate() {
    return [
        check('filename', 'filename does not exist').not().isEmpty(),
            ]
}

module.exports = router;