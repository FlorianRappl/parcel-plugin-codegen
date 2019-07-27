# parcel-plugin-codegen

[![npm](https://img.shields.io/npm/v/parcel-plugin-codegen.svg)](https://www.npmjs.com/package/parcel-plugin-codegen)
[![node](https://img.shields.io/node/v/parcel-plugin-codegen.svg)](https://www.npmjs.com/package/parcel-plugin-codegen)
[![GitHub tag](https://img.shields.io/github/tag/FlorianRappl/parcel-plugin-codegen.svg)](https://github.com/FlorianRappl/parcel-plugin-codegen/releases)
[![GitHub issues](https://img.shields.io/github/issues/FlorianRappl/parcel-plugin-codegen.svg)](https://github.com/FlorianRappl/parcel-plugin-codegen/issues)

A plugin for Parcel to allow bundle-time code / asset generation. This can be useful to work efficiently with established conventions and reduce duplication and boilerplate code.

## Usage

Just install the plugin. In any file reference a `.codegen` file, e.g., in a TypeScript module

```js
const generatedModule = require('./my.codegen');
```

Create a `.codegen` file with the structure:

```js
module.exports = function() {
  return `module.exports = {}`;
};
```

By default, the type of the generated asset will be a JS module. However, you could also generate, e.g., an HTML file:

```js
module.exports = function() {
  return `<!doctype html><h1>Hi Mum!</h1>`;
};
module.exports.type = 'html';
```

Make sure that the type you return is understood by Parcel. It will be further processed (as such you could also generate, e.g., `ts` assets).

## Changelog

This project adheres to [semantic versioning](https://semver.org).

You can find the changelog in the [CHANGELOG.md](CHANGELOG.md) file.

## License

This plugin is released using the MIT license. For more information see the [LICENSE file](LICENSE).
