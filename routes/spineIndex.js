const express = require('express');
const router = express.Router();
const linesWithSharedSpine = require('../util/linesWithSharedSpine').sharedSpine;

/**
 * returns empty array if there are no other lines with this spine ID
 * /spine?lineID={ID}
 */
router.get('/', function(req, res) {
    const index = req.query.lineID;
    const matchingLines = linesWithSharedSpine(index);

    res.status(200);
    res.send(matchingLines);
});




module.exports = router;