/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  publicPath: "/",
  configureWebpack: {
    entry: "./src/main.ts",
    resolve: {
      extensions: [".ts", ".js", ".vue", ".less"],
      alias: {
        vue$: "vue/dist/vue.esm-bundler.js",
        "@": path.resolve(__dirname, "src"),
      },
      fallback: {
        process: require.resolve("process-es6"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        https: require.resolve("https-browserify"),
        http: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$tsx/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.js$|jsx/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            // Specify options for the babel-loader here
            presets: ["@babel/preset-env"], // Use the "env" preset to transpile ES6+ code to ES5
            cacheDirectory: true, // Enable caching to improve build performance
          },
        },
        {
          test: /\.less$/,
          use: [
            { loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
    performance: {
      hints: false,
    },
    devtool: "source-map",
    // devtool: "#eval-source-map",
  },

  productionSourceMap: false,

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#b00606",
            "link-color": "#b00606",
            "border-radius-base": "3px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
