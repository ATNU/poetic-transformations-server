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
Access an inventory with key information for each file in database. CURRENTLY THE FILENAME IS NOT BEING SEPARATED CORRECTLY

##URL
/inv

##Success response

##Error response

##Sample response
```
<exist:result xmlns:exist="http://exist.sourceforge.net/NS/exist" exist:hits="1" exist:start="1" exist:count="1"
	exist:compilation-time="4" exist:execution-time="4">
	<texts>
		<text>
			<path> "/db/transformations/M5.xml"</path>
			<filename>"/db/transformations/M5.xml"</filename>
			<title>Pakistan (draft: M5)</title>
			<author>Moniza Alvi</author>
			<idno>M5</idno>
		</text>
		<text>
			<path> "/db/transformations/M6.xml"</path>
			<filename>"/db/transformations/M6.xml UTF-8"</filename>
			<title>Pakistan (draft: M6)</title>
			<author>Moniza Alvi</author>
			<idno>M6</idno>
		</text>
		...

```

---
# Search
Searches across all poems 
