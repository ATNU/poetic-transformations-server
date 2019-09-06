<?xml version="1.0" encoding="UTF-8"?>

<!-- 

XSLT 2.0 Stylesheet by James Cummings
quick lossy transform of TEI to HTML:div 
for poetic transformations projects
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns="https://www.w3.org/1999/xhtml"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" xmlns:jc="http://james.blushingbunny.net/ns.html"
    exclude-result-prefixes="xs tei jc" version="2.0">

    <!-- some output options -->
    <xsl:output indent="yes" omit-xml-declaration="yes"/>


    <!-- Make these vanish and process anything inside them -->
    <xsl:template match="TEI | text">
        <xsl:apply-templates/>
    </xsl:template>

    <!-- Don't output teiHeader unless we specifically ask for something -->
    <xsl:template match="teiHeader"/>

    <!-- make the body into an HTML wrapping div -->
    <xsl:template match="body">
        <!--    <html>
            <body>
    -->

        <div class="bodyDiv" id="{concat(/TEI/teiHeader/fileDesc/publicationStmt/idno[@type='PTpoem'], '-', 
                                    /TEI/teiHeader/fileDesc/publicationStmt/idno[@type='PTid'] )}">
            <h2 class="bodyTitle"><xsl:value-of select="/TEI/teiHeader/fileDesc/titleStmt/title"/> -- <xsl:value-of
                    select="/TEI/teiHeader/fileDesc/titleStmt/author"/>
            </h2>
            <xsl:apply-templates/>
        </div>

        <!--</body>
        </html>-->
    </xsl:template>

    <!-- page breaks -->
    <xsl:template match="pb">
        <span class="pb">
            <span class="pb-open">[</span>
            <span class="pb-value">
                <xsl:value-of select="@n"/>
            </span>
            <span class="pb-close">]</span>
        </span>
    </xsl:template>

    <!-- copy div elements through, adding a class if they don't have a @type attribute -->
    <xsl:template match="div">
        <div class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!-- heading of poem -->
    <xsl:template match="head[../@type = 'poem']">
        <!-- applying template to all attributes to catch @xml:id -->
        <h3 class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </h3>
    </xsl:template>

    <!-- line-groups / stanzas -->
    <xsl:template match="lg">
        <div class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </div>
    </xsl:template>

    <!-- verse lines forcing newline -->
    <xsl:template match="l">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
        <!-- If there is an ID, take the second part of string, turn it into a number and put it out if divisable by 5 -->
        <xsl:if test="@xml:id">
        <xsl:variable name="num"><xsl:value-of select="number(substring-after(@xml:id, '.'))"/></xsl:variable>
        <xsl:if test="$num mod 5 = 0">     
        <span class="linenumber"><xsl:value-of select="$num"/></span>
        </xsl:if>
        </xsl:if>
        <br/>
    </xsl:template>

    <!-- line breaks (in notes and things) -->
    <xsl:template match="lb">
        <br/>
    </xsl:template>

    <!-- In case we use any paragraphs in the body...make them html paragraphs -->
    <xsl:template match="p">
        <p class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </p>
    </xsl:template>

    <!-- additions, deletions, substitutions  -->
    <xsl:template match="add | del | subst">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>

    <!-- Metamarks ... what should happen with these? -->
    <xsl:template match="metamark">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/> [Metamark] </span>
    </xsl:template>


    <!-- Milestones used for section divisions -->
    <xsl:template match="milestone">
        <xsl:choose>
            <xsl:when test="contains(@rend, 'asterisk')">
                <span class="{jc:createClassAttribute(.)}"> * </span>
            </xsl:when>
            <xsl:when test="contains(@rend, 'line')">
                <hr class="{jc:createClassAttribute(.)}"/>
            </xsl:when>
        </xsl:choose>

    </xsl:template>



    <!-- highlighting-->
    <xsl:template match="hi">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>

    <!-- notes-->
    <xsl:template match="note">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>

    <!-- unclear-->
    <xsl:template match="unclear">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>


    <!-- supplied-->
    <xsl:template match="supplied">
        <span class="{jc:createClassAttribute(.)}">[<xsl:apply-templates select="@xml:id | node()"/>]</span>
    </xsl:template>

    <xsl:template match="retrace">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>

    <xsl:template match="w">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
        </span>
    </xsl:template>

    <xsl:template match="sic">
        <span class="{jc:createClassAttribute(.)}">
            <xsl:apply-templates select="@xml:id | node()"/>
            <span class="sicMarker">*</span>
        </span>
    </xsl:template>


    <!-- currently just getting rid of these in rendered version -->
    <xsl:template match="listTranspose | anchor | ptr"/>







    <!-- catch-all copy @xml:id to html id -->
    <xsl:template match="*/@xml:id">
        <xsl:attribute name="id">
            <xsl:value-of select="."/>
        </xsl:attribute>
    </xsl:template>

    <!-- function to create HTML class attribute since 
        so many different combinations of attributes being stuck into it. -->
    <xsl:function name="jc:createClassAttribute">
        <xsl:param name="node" as="node()*"/>
        <xsl:choose>
            <!-- no attributes, just add name of element -->
            <xsl:when test="not($node/@*)">
                <xsl:attribute name="class">
                    <xsl:value-of select="$node/name()"/>
                </xsl:attribute>
            </xsl:when>
            <!-- any of these attribues, put them in after name if there are there with leading space -->
            <xsl:when
                test="
                    $node/@rend |
                    $node/@type |
                    $node/@place |
                    $node/@style |
                    $node/@unit |
                    $node/@change |
                    $node/@hand
                    ">
                <xsl:attribute name="class">
                    <xsl:value-of select="$node/name()"/>
                    <xsl:if test="$node/@rend">
                        <xsl:value-of select="concat(' ', $node/@rend)"/>
                    </xsl:if>
                    <xsl:if test="$node/@type">
                        <xsl:value-of select="concat(' ', $node/@type)"/>
                    </xsl:if>
                    <xsl:if test="$node/@place">
                        <xsl:value-of select="concat(' ', $node/@place)"/>
                    </xsl:if>
                    <xsl:if test="$node/@style">
                        <xsl:value-of select="concat(' ', $node/@style)"/>
                    </xsl:if>
                    <xsl:if test="$node/@unit">
                        <xsl:value-of select="concat(' ', $node/@unit)"/>
                    </xsl:if>
                    <xsl:if test="$node/@change">
                        <xsl:value-of select="concat(' ', substring-after($node/@change, '#'))"/>
                    </xsl:if>
                    <xsl:if test="$node/@hand">
                        <xsl:value-of select="concat(' ', substring-after($node/@hand, '#'))"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:when>
            <!-- some other attributes, add name, and content of those attributes if not xml:id -->
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <xsl:value-of select="$node/name()"/>
                    <xsl:for-each select="$node/@*[not(name() = 'xml:id')]">
                        <xsl:value-of select="concat(' ', .)"/>
                    </xsl:for-each>
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <!-- Warn about any other elements -->
    <xsl:template match="*" priority="-1">
        <xsl:message>Didn't cope with <xsl:value-of select="name()"/></xsl:message>
    </xsl:template>

</xsl:stylesheet>
