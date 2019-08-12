xquery version "3.1";
declare namespace tei = "http://www.tei-c.org/ns/1.0";

let $versions :=collection(/db/transformations)/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[tei:originTitle='Pakistan']
for $version in $versions
return (
    <version>
        <originalTitle>{$version//tei:originTitle/text()}</originalTitle>
        <versionTitle>{$version//tei:title/text()}</versionTitle>
        <author>{$version//tei:author/text()}</author>
        <filename>{base-uri($version)}</filename>
    </version>
)