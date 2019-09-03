const express = require('express');
const router = express.Router();
const compare = require('../util/compareVersions.js').compareWholeVersions;
const xmlConversion = require('../util/XMLConversion.js').justText;
const fs = require('fs');

/**
 * GET the cosine similarity between two whole versions of the poem.
 *
 * /comp?one={text1}&two={text2}
 */
router.get('/', function(req,res) {
    const filename1 = req.query.one;
    const filename2 = req.query.two;

    try {
        const text1 = xmlConversion(fs.readFileSync('./data/' + filename1));
        const text2 = xmlConversion(fs.readFileSync('./data/' + filename2));
    }
catch (error) {
        res.status(500);
        res.send(error.message);
}

    let similarity = compare(text1, text2);

    //if higher than 1 (due to rounding) take back to 1
    if (similarity > 1) {
        similarity = 1;
    }

    if (similarity < 0) {
        //error
        res.status(500);
        res.send("error in calculating cosine-similarity")
    }

    //round to 2 decimal places

    const roundedNumber = similarity.toFixed(2);

    res.status(200);
    res.send(roundedNumber);
});




module.exports = router;