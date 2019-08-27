xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $versions :=collection(/db/transformations)/TEI/teiHeader/fileDesc/publicationStmt[idno = 'Alvi1']

for $version in $versions
let $path := base-uri($version)
let $document := doc($path)
let $name := replace($path, '/db/transformations/', '')
return (
    <version>
        <poemID>{$version//idno[@type='PTpoem']}</poemID>
        <versionID>{$version//idno[@type='PTid']}</versionID>
        <versionTitle>{$document//title/text()}</versionTitle>
        <author>{$document//author/text()}</author> <authority>{$document//authority/text()}</authority>
        <source>{$document//sourceDesc/p/text()}</source>
        <type>{$document//keywords/term/text()}</type>
        <filename>{$name}</filename>
    </version>
)