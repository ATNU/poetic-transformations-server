# Get a document
Provide a document name and receive XML file

## URL
/doc/:filename

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

# Get inventory
Access an inventory with key information for each file in database. Currently returns title and author.

##URL
/inv

##Success response

##Error response

##Sample response
```
<exist:result xmlns:exist="http://exist.sourceforge.net/NS/exist" exist:hits="4" exist:start="1" exist:count="4"
	exist:compilation-time="1" exist:execution-time="1">
	<title xmlns="http://www.tei-c.org/ns/1.0">Pakistan (draft: M1)</title>
	<author xmlns="http://www.tei-c.org/ns/1.0">Moniza Alvi</author>
	<title xmlns="http://www.tei-c.org/ns/1.0">Pakistan (draft: M2)</title>
	<author xmlns="http://www.tei-c.org/ns/1.0">Moniza Alvi</author>
</exist:result>

```

