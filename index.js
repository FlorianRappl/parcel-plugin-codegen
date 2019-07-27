module.exports = function(bundler) {
  bundler.addAssetType("codegen", require.resolve("./CodeGenAsset"));
};
