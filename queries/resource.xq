xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";
let $result := transform:transform(doc("xmldb:exist://db/transformations/B.xml"), doc("xmldb:exist://db/transformations/transform2HTMLDiv.xsl"), ())
return $result
