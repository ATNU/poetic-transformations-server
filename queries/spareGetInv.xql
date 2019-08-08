xquery version "3.1";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare option exist:serialize "method=xhtml media-type=text/text/html indent=yes";
<texts>
    {
        let $data-collection := "/db/transformations"
        for $resource in collection($data-collection)
        let $path := base-uri($resource)
        return
            <text>
                <path> "{$path}"</path>
                <filename>"{util:unescape-uri(replace($path, ".+/(.+)$", "$1"), "UTF-8")}"</filename>
                <title> {$resource//tei:title/text()} </title>
                <author> {$resource//tei:author/text()} </author>
                <idno> {$resource//tei:idno/text()} </idno>
            </text>
    }
</texts>