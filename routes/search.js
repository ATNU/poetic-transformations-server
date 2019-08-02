const express = require('express');
const router = express.Router();
const http = require('http');






router.get('/:searchTerm', function(req, res) {

    //----- create query
    const searchTerm = req.

    let term = "";
    const querySetup = "xquery version \"3.1\"\; declare namespace tei = \"http://www.tei-c.org/ns/1.0\"\;";
    const qname = "TEI"; //from database config file - passed to Lucene as a string and returned in search
    term = "whichever";
    const queryStatement = "collection('/db/transformations')//tei:" + qname + "[ft:query(., '" + term + "')]";

    console.log(querySetup + queryStatement);

});


module.exports = router;