const express = require('express');
const router = express.Router();
const http = require('http');
const fs = require('fs');

const util = require('util');



router.get('/', function(req, res) {

    //----- data
    // each file as a list of line objects
    const fileOne =  [
        { "line":"But what was Pakistan? A country,"},
        { "line": "a bolt-hole, a land of bone?"}
        ];

    const fileTwo = [
        {"line": "Another line" },
        {"line":"But what was Pakistan? A country,"},
        {"line": "a bolt-hole, a land of bone?"}
        ];



});

module.exports = router;



/**const fileOne = fs.readFileSync('./sample xml/B.xml');
parseString(fileOne, function (err, result) {
    console.log(util.inspect(result, false, null));
});**/