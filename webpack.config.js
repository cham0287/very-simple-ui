const path = require("path");
const { merge } = require("webpack-merge");

const commonConfig = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  mode: "production", // 배포용으로 번들링합니다.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

const esmConfig = merge(commonConfig, {
  output: {
    filename: "bundle.mjs",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true, // ESM 출력을 위해 필요합니다.
  },
  target: "web", // 대상 환경을 설정합니다.
});

const cjsConfig = merge(commonConfig, {
  output: {
    filename: "bundle.cjs.js",
    library: {
      type: "commonjs2",
    },
  },
  target: "node", // Node.js 환경을 대상으로 합니다.
});

module.exports = [esmConfig, cjsConfig];
