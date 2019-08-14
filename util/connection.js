/**
 * Values needed to create a connection to the eXist-db API to submit a resource request or query
 */


const IP = process.env.IP;

module.exports = {


        URINoDB: 'http://' + IP + ':8080/exist/rest',
        URI: 'http://' + IP + ':8080/exist/rest/db/transformations/',
        URIQuery: 'http://' + IP + ':8080/exist/rest/db/transformations?_query=',
};
