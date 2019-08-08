
xquery version "3.1";

declare namespace tei = "http://www.tei-c.org/ns/1.0";

collection('/db/transformations')//tei:TEI[ft:query(., 'to place myself')]