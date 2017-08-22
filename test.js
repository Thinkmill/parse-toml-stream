// @flow
'use strict';

const createReadableTomlStream = require('./');
const fs = require('fs');
const path = require('path');

const fixture = path.join(__dirname, 'fixture.toml');

function toPromise(stream) {
  return new Promise((resolve, reject) => {
    let chunks = [];

    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    stream.on('error', reject);
    stream.on('end', () => {
      resolve(chunks);
    });
  });
}

test('reads in sections', () => {
  let fileStream = fs.createReadStream(fixture);
  let tomlStream = createReadableTomlStream(fileStream);
  return toPromise(tomlStream).then(chunks => {
    expect(chunks).toEqual([
      { foo: 'bar' },
      { baz: { boz: 'boy' } },
      { bat: { bam: 'boo' }, bit: { baw: 'bet' } },
      { biz: [{ bop: 'blu' }] },
      { biz: [{ bag: 'bom' }] }
    ]);
  });
});
