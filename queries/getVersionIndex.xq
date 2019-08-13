xquery version "3.1";
declare namespace tei = "http://www.tei-c.org/ns/1.0";

let $versions :=collection(/db/transformations)/tei:TEI/tei:teiHeader/tei:fileDesc/tei:publicationStmt[tei:idno = 'Alvi1']

for $version in $versions
let $path := base-uri($version)
let $document := doc($path)
return (
    <version>
        <poemID>{$version//tei:idno[@type='PTpoem']}</poemID>
        <versionID>{$version//tei:idno[@type='PTid']}</versionID>
        <versionTitle>{$document//tei:title/text()}</versionTitle>
        <author>{$document//tei:author/text()}</author>
        <filename>{$path}</filename>
    </version>
)