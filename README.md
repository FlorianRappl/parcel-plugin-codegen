# parcel-plugin-codegen

[![Build Status](https://florianrappl.visualstudio.com/parcel-plugin-codegen/_apis/build/status/FlorianRappl.parcel-plugin-codegen?branchName=master)](https://florianrappl.visualstudio.com/parcel-plugin-codegen/_build/latest?definitionId=12&branchName=master)
[![npm](https://img.shields.io/npm/v/parcel-plugin-codegen.svg)](https://www.npmjs.com/package/parcel-plugin-codegen)
[![GitHub tag](https://img.shields.io/github/tag/FlorianRappl/parcel-plugin-codegen.svg)](https://github.com/FlorianRappl/parcel-plugin-codegen/releases)
[![GitHub issues](https://img.shields.io/github/issues/FlorianRappl/parcel-plugin-codegen.svg)](https://github.com/FlorianRappl/parcel-plugin-codegen/issues)

A plugin for Parcel to allow bundle-time asset generation. This can be useful to work efficiently with established conventions and reduce duplication and boilerplate code.

## Usage

Just install the plugin. In any file reference a `.codegen` file, e.g., in a TypeScript asset

```js
const generatedModule = require('./my.codegen');
```

Create a `.codegen` file with the structure:

```js
module.exports = function() {
  return `module.exports = {}`;
};
```

### Async Generation

You can also use promises in your code generation. As an example, if your `.codegen` file looks similar to this:

```js
module.exports = function() {
  return callSomeApi().then(result => `module.exports = ${JSON.stringify(result)}`);
};
```

The new asset will be created asynchronously. Furthermore, you can obviously use `require` or `import` directly in your generated code. Since the asset will be run through Parcel like any other asset, you can use this mechanism to include files from a directory without referencing them explicitly:

```js
module.exports = function() {
  return `
    const { lazy } = require('react');
    module.exports = lazy(() => import(${JSON.stringify(filePath)}));
  `;
};
```

### Asset Type Declaration

By default, the type of the generated asset will be a JS module. However, you could also generate, e.g., an HTML file:

```js
module.exports = function() {
  return `<!doctype html><h1>Hi Mum!</h1>`;
};
module.exports.type = 'html';
```

Make sure that the type you return is understood by Parcel. It will be further processed (as such you could also generate, e.g., `ts` assets).

Alternatively, you can return an object using the following structure:

```js
module.exports = function() {
  return {
    value: `<!doctype html><h1>Hi Mum!</h1>`,
    type: 'html',
  };
};
```

The latter is especially handy when the `type` is not fixed or will be determined via an async operation.

### Multiple Assets

Like the explicit asset type declaration we can return multiple assets.

```js
module.exports = function() {
  return [
    {
      value: `<!doctype html><h1>Hi Mum!</h1>`,
      type: 'html',
    },
    {
      value: `module.exports = () => 'Hello World!';`,
      type: 'js',
    },
  ];
};
```

Keep in mind that the bundler refers to them all as content declared from "inside" our `.codegen` file even though only JavaScript would be part of the main bundle.

## Changelog

This project adheres to [semantic versioning](https://semver.org).

You can find the changelog in the [CHANGELOG.md](CHANGELOG.md) file.

## License

This plugin is released using the MIT license. For more information see the [LICENSE file](LICENSE).
