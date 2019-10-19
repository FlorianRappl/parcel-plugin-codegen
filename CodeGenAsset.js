const { Asset } = require("parcel-bundler");
const { readdirSync } = require("fs");
const { resolve } = require("path");

class CodeGenAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    delete require.cache[require.resolve(name)];
    const generator = require(name);
    this.type = generator.type || "js";
    this.content = generator.call(this);
  }

  getFiles(dir, filter) {
    const files = readdirSync(dir)
      .map(m => resolve(dir, m))
      .filter(m => typeof filter !== "function" || filter(m));

    files.forEach(file => this.addDependency(file, { includedInParent: true }));

    return files;
  }

  load() {}

  toResult(value) {
    if (value && (Array.isArray(value) || typeof value === "object")) {
      return value;
    } else if (typeof value === "string") {
      return [
        {
          type: this.type,
          value
        }
      ];
    }

    return [];
  }

  generate() {
    if (this.content instanceof Promise) {
      return this.content.then(value => this.toResult(value));
    }

    return this.toResult(this.content);
  }
}

module.exports = CodeGenAsset;
