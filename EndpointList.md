# View a single version of a poem
Provide a document path and receive XML file in full. The path should be retrieved from
the information sent in the version index. The path must be URL encoded before sending.

## URL
/doc/:path

## Method
GET

##Success response
Code: `200 OK`
Content: XML file

##Error response
Code: `404 Not Found`
Code: `Cannot find document`

##Sample response

```
<?xml-model href="http://www.tei-c.org/release/xml/tei/custom/schema/relaxng/tei_all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
<?xml-model href="http://www.tei-c.org/release/xml/tei/custom/schema/relaxng/tei_all.rng" type="application/xml"
	schematypens="http://purl.oclc.org/dsdl/schematron"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
	<teiHeader>
		<fileDesc>
			<titleStmt>
				<title>Pakistan (draft: M1)</title>
				<author>Moniza Alvi</author>
			</titleStmt>
			<publicationStmt>
				<authority>Poetic Transformations Project</authority> ... 
				
```
 
---

# View poem index
Get an index of all poems stored and how many versions aof that poem are available to view.

##URL
/index

##Success response
Code: `200 OK`
Content: XML file

##Error response

##Sample response
```
<exist:result xmlns:exist="http://exist.sourceforge.net/NS/exist" exist:hits="2" exist:start="1" exist:count="2"
	exist:compilation-time="8" exist:execution-time="8">
	<text>
		<title>Pakistan</title>
		<author>Moniza Alvi</author>
		<versions>2</versions>
	</text>
</exist:result>

```

---
# View version index
Get an index of all versions of a particular poem (using idno element, type PTpoem). 

##URL
/index/title

##Success response
Code: `200 OK`
Content: XML file

##Error response

##Sample response
```
<exist:result xmlns:exist="http://exist.sourceforge.net/NS/exist" exist:hits="2" exist:start="1" exist:count="2"
	exist:compilation-time="2" exist:execution-time="2">
<version>
		<poemID><idno xmlns="http://www.tei-c.org/ns/1.0" type="PTpoem">Alvi1</idno></poemID>
		<versionID><idno xmlns="http://www.tei-c.org/ns/1.0" type="PTid">B</idno></versionID>
		<versionTitle>Must We Go?(published: B)</versionTitle>
		<author>Moniza Alvi</author>
		<filename>/db/transformations/B.xml</filename>
	</version>
	<version>
		<poemID><idno xmlns="http://www.tei-c.org/ns/1.0" type="PTpoem">Alvi1</idno></poemID>
		<versionID><idno xmlns="http://www.tei-c.org/ns/1.0" type="PTid">M1</idno></versionID>
		<versionTitle>Pakistan (draft: M1)</versionTitle>
		<author>Moniza Alvi</author>
		<filename>/db/transformations/M1.xml</filename>
	</version>
</exist:result>
```

---

#Search
Search across all poems and return key details and a snippet surrounding the search phrase. Search phrase should be surrounded by double quotation marks and URL encoded. e.g. 
the phrase ```'the apple and the pear'``` should be submitted as ```"the apple and the pear"``` thus after URL encoding ``` %22the%20apple%20and%20the%20pear%22``` . Searching is non case sensitive and searches for the whole phrase submitted. 

It is possible to use wildcards. In future this endpoint could be developed to cater for more sophisticated and/or queries.

##URL
/search/searchphrase

##Success response
Code: `200 OK`
Content: XML file

```
<title>{title}</title>
<author>{author}</author>
<idno>{idno}</idno>
    <p>
        <span class='previous'>{text prior to search phrase}</span>
        <span class='hi'>{search phrase}</span>
        <span class='following'>{text after the search phrase}</span>
    </p>
    <p>
        <span class='previous'>{text prior to search phrase}</span>
        <span class='hi'>{search phrase}</span>
        <span class='following'>{text after the search phrase}</span>
    </p>
<title>{title}</title> ... 
```


##Error response

##Sample response
