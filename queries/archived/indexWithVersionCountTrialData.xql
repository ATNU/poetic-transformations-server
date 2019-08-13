xquery version "3.1";

let $collection:=collection(/db/transformations)
let $originalTitles:=$collection//originTitle
let $uniqueOriginals:=distinct-values($originalTitles)

for $hit in $uniqueOriginals
let $author := distinct-values($collection//book[originTitle=$hit]/author)
let $versions :=$collection//book[originTitle=$hit]
let $count := count($versions)

return (
    <text>
        <originalTitle>{$hit}</originalTitle>,
        <author>{$author}</author>
        <versions>{$count}</versions>
    </text>
)