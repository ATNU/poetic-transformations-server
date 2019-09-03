const express = require('express');
const router = express.Router();
const linesWithSharedSpine = require('../util/linesWithSharedSpine').sharedSpine;

/**
 * GET endpoint with lineID query parameter that returns a list of all lines that share a spine index with the submitted line. If the submitted lines is unique an empty array is returned, if a line index that does not exist is submitted, 404 is returned.
 *
 * /spine?lineID={ID}
 */
router.get('/', function(req, res) {
    const index = req.query.lineID;
    const matchingLines = linesWithSharedSpine(index);
    let status;

    if (matchingLines === undefined) {
        status = 404;
    }

    else {
       status = 200;
    }

    res.status(status);
    res.send(matchingLines);
});




module.exports = router;