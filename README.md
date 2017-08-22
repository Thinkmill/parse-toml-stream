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

let stream = createReadableTomlStream(path.join(__dirname, 'data.toml'));
let chunks = [];

stream.on('data', chunk => {
  chunks.push(chunk);
});

stream.on('end', () => {
  console.log(chunks);
});
// chunks == [
//   { foo: 'bar' },
//   { baz: { boz: 'boy' } },
//   { bat: { bam: 'boo' } },
// ]
```
