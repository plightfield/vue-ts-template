const { resolve } = require("path");
console.log(resolve("src/common.less"));
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/theme.less")],
    },
  },
};
