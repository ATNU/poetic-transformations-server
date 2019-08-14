const express = require('express');
const router = express.Router();
const http = require('http');
const similarity = require('../util/cosine-similarity.js');



router.get('/', function(req, res) {

    const one = {

        The black
    } cat";
    const two = "The black cat";

    console.log(similarity(one, two));

    res.status(200);

});

module.exports = router;