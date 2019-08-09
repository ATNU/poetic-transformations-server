xquery version "3.1";
import module namespace kwic="http://exist-db.org/xquery/kwic";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
for $resource in collection('/db/transformations')//tei:TEI[ft:query(., 'tiger')]
return  (
    <title> {$resource//tei:title/text()} </title>,
    <author> {$resource//tei:author/text()} </author>,
    <idno> {$resource//tei:idno/text()} </idno>,
    kwic:summarize($resource, <config width='100'/>)
) 