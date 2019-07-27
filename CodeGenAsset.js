const { Asset } = require('parcel-bundler');

class CodeGenAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    delete require.cache[require.resolve(name)];
    const generator = require(name);
    this.type = generator.type || 'js';
    this.content = generator();
  }

  load() {}

  generate() {
    return [
      {
        type: this.type,
        value: this.content,
      },
    ];
  }
}

module.exports = CodeGenAsset;
