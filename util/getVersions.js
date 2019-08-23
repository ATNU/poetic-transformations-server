const http = require('http');

const options = {
    host: '192.168.99.100:8080',
    path: '/exist/rest/db/transformations?_query=xquery%20version%20%223.1%22;%20declare%20default%20element%20namespace%20%22http://www.tei-c.org/ns/1.0%22;let%20$versions%20:=collection(/db/transformations)/TEI/teiHeader/fileDesc/publicationStmt%5Bidno=%20%22Alvi1%22%5Dfor%20$version%20in%20$versions%20let%20$path%20:=%20base-uri($version)%20let%20$document%20:=%20doc($path)%20return%20(%3Cfilename%3E%7B$path%7D%3C/filename%3E)',
    method: 'GET',
    headers: {
        'Content-Type' : 'application/xml'
    }
};

module.exports.getVersions = (options, onResult) => {
    console.log('rest::getJSON');

    let output = '';

    const req = port.request(options, (res) => {
        console.log(`${options.host} : ${res.statusCode}`);
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            output += chunk;
        });

        res.on('end', () => {
            let obj = JSON.parse(output);

            onResult(res.statusCode, obj);
        });
    });

    req.on('error', (err) => {
        // res.send('error: ' + err.message);
    });

    req.end();
};