# unicode-diff

Provides the differences between Unicode versions. Useful when dealing with
programs that don't handle newer code points.

## Installation

```
npm install unicode-diff --save
```

## Usage

```js
// Get an array of code point differences between Unicode 5.0.0 and 8.0.0
require('unicode-diff/5.0.0/8.0.0/code-points');
// Get a regular expression that matches any symbol introduced between Unicode
// 5.0.0 and 8.0.0
require('unicode-diff/5.0.0/8.0.0/regex');
```

Supports Unicode v5.0.0, v5.1.0, v5.2.0, v6.0.0, v6.1.0, v6.2.0, v6.3.0 and
v7.0.0 through v8.0.0.

## Generating the diff

`npm run generate` generates the diff based on [Unicode
data](https://github.com/mathiasbynens/node-unicode-data) available in the
`devDependencies`.

Note that the generate script uses `const`, `let`, `for…of` and template
strings.

## Acknowledgements

Thanks to [Mathias Bynens](https://mathiasbynens.be/) for providing the Unicode
data and his amazing [Regenerate](https://github.com/mathiasbynens/regenerate)
tool.

## License

This module is available under [ISC](http://opensource.org/licenses/ISC).
