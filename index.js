// @flow
'use strict';

const fs = require('fs');
const stream = require('stream');
const readline = require('readline');
const toml = require('toml');

module.exports = function createReadableTomlStream(fileStream /*: stream$Readable */) {
  let tomlStream = new stream.Readable({ objectMode: true });
  let lineReader = readline.createInterface({
    input: fileStream,
  });

  let current = '';

  function process(line) {
    if (line === null || line.startsWith('[')) {
      try {
        tomlStream.push(toml.parse(current));
      } catch (err) {
        err.chunk = current;
        tomlStream.emit('error', err);
      }
      current = '';
    }

    if (line === null) {
      tomlStream.push(null);
    } else {
      current += line + '\n';
    }
  };

  lineReader.on('line', line => process(line));
  lineReader.on('close', () => process(null));

  (tomlStream /*: any */)._read = () => {};
  (tomlStream /*: any */)._destroy = () => {
    (fileStream /*: any */).destroy();
  };

  return tomlStream;
};
