# parse-toml-stream

> Parse TOML files in streams chunked by `[sections]`

```toml
# data.toml
foo = "bar"

[baz]
boz = "boy"

[bat]
bam = "boo"
```

```js
const createReadableTomlStream = require('toml-stream');
const path = require('path');
const fs = require('fs');

let fileStream = fs.createReadStream(path.join(__dirname, 'data.toml'));
let tomlStream = createReadableTomlStream(fileStream);

let chunks = [];

tomlStream.on('data', chunk => {
  chunks.push(chunk);
});

tomlStream.on('end', () => {
  console.log(chunks);
});
// chunks == [
//   { foo: 'bar' },
//   { baz: { boz: 'boy' } },
//   { bat: { bam: 'boo' } },
// ]
```
