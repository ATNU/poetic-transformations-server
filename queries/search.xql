xquery version "3.1";
import module namespace kwic="http://exist-db.org/xquery/kwic";
declare namespace tei= "http://www.tei-c.org/ns/1.0";

for $resource in collection('/db/transformations')//tei:TEI[ft:query(., '"So would there be migration"')]
let $path := base-uri($resource)
let $name := replace($path, '/db/transformations/', '')
return  (
    <title> {$resource//tei:title/text()} </title>,
    <author> {$resource//tei:author/text()} </author>,
    <poemID> {$resource//tei:idno[@type='PTpoem']/text()} </poemID>,
    <versionID> {$resource//tei:idno[@type='PTid']/text()} </versionID>,
    <filename>($name)</filename>,
    kwic:summarize($resource, <config width='100'/>)
)