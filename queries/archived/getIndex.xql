xquery version "3.1";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare option exist:serialize "method=xhtml media-type=text/text/html indent=yes";
<texts>
    {
        let $data-collection := "/db/transformations"
        for $resource in fn:collection($data-collection)
            let $path := fn:base-uri($resource)
            let $filename := fn:replace($path, ".+/(.+)$", "$1")
            return
                <text>
                    <path>"{$filename}"</path>
                    <title> {$resource//tei:title/text()} </title>
                    <author> {$resource//tei:author/text()} </author>
                    <idno> {$resource//tei:idno/text()} </idno>
                </text>
    }
</texts>

