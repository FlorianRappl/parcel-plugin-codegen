const { Asset } = require("parcel-bundler");

class CodeGenAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    delete require.cache[require.resolve(name)];
    const generator = require(name);
    this.type = generator.type || "js";
    this.content = generator();
  }

  load() {}

  toResult(value) {
    return [
      {
        type: this.type,
        value
      }
    ];
  }

  generate() {
    if (this.content instanceof Promise) {
      return this.content.then(value => this.toResult(value));
    }

    return this.toResult(this.content);
  }
}

module.exports = CodeGenAsset;
