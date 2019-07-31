const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');


/**
 *  GET a single resource given it's filename as a query parameter
 *
 *  */
router.get(
    '/:filename',
    validate(),
    function(req, res) {

        //testing
    console.log("Get route reached");
    console.log(req.params.filename);

    //------ Validate query
    const errors = validationResult(req);
    if (!errors.isEmpty()) //there are errors
    {
        console.log('invalid parameter found');
        res.status(400).json({errors: errors.array() });
        return;
    }

    const name = req.params.filename;


    //------ Connect to eXist-db API
    var Connection = require("../index.js");
    const options = require('../util/connectionOptions.js');
    var connection = new Connection(options);


    //----- GET request to eXist-db API
    connection.get(name, function(result, err) {
    if (err) {
        res.status(502);
        res.send('Cannot connect to database');
    }

    else {

        //----- Send file or error
        let data = [];
        result.on("data", function (chunk) {
            data.push(chunk);
        });
        result.on("end", function () {
            console.log(data.join(""));
            res.send(data.join(""));
        });

        result.on("error", function (err) {
            console.log("error fetching file: " + err);
                res.status(404);
                res.send('Cannot find file');
        });
    }

});

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