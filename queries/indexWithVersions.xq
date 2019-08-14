xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $collection:=collection(/db/transformations)
let $originalTitles:=$collection/TEI/teiHeader/fileDesc/publicationStmt/idno[@type="PTpoem"]
let $poemIDs:=distinct-values($originalTitles)


for $ID in $poemIDs
let $versions :=$collection/TEI/teiHeader/fileDesc/publicationStmt[idno=$ID]
let $count := count($versions)

let $authors := for $version in $versions
let $path := base-uri($version)
let $document := doc($path)
return $document//author

return (

    <text>
        <poemID>{$ID}</poemID>
        <author> {distinct-values($authors)}  </author>
        <versions>{$count}</versions>
    </text>
)