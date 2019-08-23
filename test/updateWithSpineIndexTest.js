const update = require('../util/updateWithSpineIndex').updateOriginal;
const fs = require('fs');
const convert = require('../util/XMLParser.js').parseXml;

describe('update original', function () {
    it('should update', function() {

        const spineIndexVersion = [ { 'xml:id': 'M1.1',
            _text: 'Pakistan, they said to her. ',
            spineIndex: 1 },
            { 'xml:id': 'M1.2',
                _text: 'But what was Pakistan? A country,',
                spineIndex: 2 },
            { 'xml:id': 'M1.3',
                _text: 'a bolt-hole, a land of bone?',
                spineIndex: 3 },
            { 'xml:id': 'M1.4',
                _text: 'It held out very different sets of arms',
                spineIndex: 4 },
            { 'xml:id': 'M1.5',
                _text: 'offered its hard or soft embrace.',
                spineIndex: 5 },
            { 'xml:id': 'M1.6',
                _text: 'The filling up with Pakistan',
                spineIndex: 6 },
            { 'xml:id': 'M1.7',
                _text: 'brimming over, spilling.',
                spineIndex: 7 },
            { 'xml:id': 'M1.8',
                _text: 'To the East and West,',
                spineIndex: 8 },
            { 'xml:id': 'M1.9',
                _text: [ 'wh', ' you looked,' ],
                spineIndex: 9 },
            { 'xml:id': 'M1.10',
                _text: 'Pakistan persisted.',
                spineIndex: 10 },
            { 'xml:id': 'M1.11',
                _text: [ 'But ', ' wasn\'t half-empty' ],
                spineIndex: 11 },
            { 'xml:id': 'M1.12',
                _text: 'and what was there',
                spineIndex: 12 },
            { 'xml:id': 'M1.13',
                _text: 'couldn\'t be poured away.',
                spineIndex: 13 },
            { 'xml:id': 'M1.14',
                _text: 'Would there really be ',
                spineIndex: 14 },
            { 'xml:id': 'M1.15', _text: 'the other way.', spineIndex: 15 },
            { 'xml:id': 'M1.16',
                _text: [ 'Was ', ' a resting tiger' ],
                spineIndex: 16 },
            { 'xml:id': 'M1.17',
                _text: 'front paws, back paws.',
                spineIndex: 17 },
            { 'xml:id': 'M1.18', _text: ' lay in wait.', spineIndex: 18 },
            { 'xml:id': 'M1.19',
                _text: 'In the breadth of a hair',
                spineIndex: 19 },
            { 'xml:id': 'M1.20',
                _text: 'in the journey of an ant',
                spineIndex: 20 },
            { 'xml:id': 'M1.21', _text: undefined, spineIndex: 21 },
            { 'xml:id': 'M1.22', _text: undefined, spineIndex: 22 } ];

        const xml1 = fs.readFileSync('./sampleXml/M1.xml', 'UTF-8');
        const result1 = convert(xml1);
        const newXml = update(result1, spineIndexVersion);
        const stringVers=JSON.stringify(newXml);
        console.log(spineIndexVersion);
        fs.appendFile('JSONResultSample.xml', stringVers, function(err) {
            if(err) throw err;
        });
        console.log(newXml["TEI"]["text"]["body"]["div"]["lg"][0]["l"]);
    })
});