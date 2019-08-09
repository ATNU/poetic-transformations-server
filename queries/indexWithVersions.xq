xquery version "3.1";
declare namespace tei = "http://www.tei-c.org/ns/1.0";

let $collection:=collection(/db/transformations)
let $originalTitles:=$collection//tei:originTitle
let $uniqueOriginals:=distinct-values($originalTitles)

for $hit in $uniqueOriginals
let $collection:=collection(/db/transformations)
let $authors := $collection/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[tei:originTitle=$hit]/tei:author
let $distinct-author := distinct-values($authors)

let $collection:=collection(/db/transformations)
let $versions :=$collection/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[tei:originTitle='Pakistan']
let $count := count($versions)

return (
    <text>
        <title>{$hit}</title>
        <author>{$distinct-author}</author>
        <versions>{$count}</versions>
    </text>
)