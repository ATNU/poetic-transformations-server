const express = require('express');
const router = express.Router();




/**
 *  GET a single resource given it's filename
 *  */
router.get('/', function (req, res) {
    console.log("Get route reached");

    //connection
    var Connection = require("../index.js");
    const options = require
    var connection = new Connection(options);

    const name = req.body.name;
    //error handling

    connection.get(name, function(result, err) {
        //error handling


    let data = [];
    result.on("data", function(chunk) {
        data.push(chunk);
    });
    result.on("end", function() {
        console.log(data.join(""));
        res.send(data.join(""));
    });
    result.on("error", function(err) {
        console.log("error: " + err);
    });

    });

});


module.exports = router;