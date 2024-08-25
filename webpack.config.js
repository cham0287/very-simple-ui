const path = require("path");

const esmConfig = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.mjs",
    library: {
      type: "module",
    },
    clean: true,
  },
  experiments: {
    outputModule: true, // ESM 출력을 위해 필요합니다.
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 필요한 경우 Babel을 통해 ES6+ 코드를 변환합니다.
        },
      },
    ],
  },
  target: "web", // 대상 환경을 설정합니다.
  mode: "production", // 배포용으로 번들링합니다.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

const cjsConfig = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.cjs.js",
    library: {
      type: "commonjs2",
    },
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
  target: "node", // Node.js 환경을 대상으로 합니다.
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

module.exports = [esmConfig, cjsConfig];
