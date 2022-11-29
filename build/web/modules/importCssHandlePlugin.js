class ImportCssHandlePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('EndWebpackPlugin', function (compilation) {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((filename) => {
          console.log(filename);
          if(filename.indexOf("css") !== -1) {
            console.log(filename);
          }
          // if (filename.indexOf("css") !== -1 && filename.indexOf("css/") == -1) {
          //   compilation.assets[`css/${filename}`] = compilation.assets[filename];
          //   delete compilation.assets[filename];
          // }
        });
      });
    })
  }
}
module.exports = ImportCssHandlePlugin;