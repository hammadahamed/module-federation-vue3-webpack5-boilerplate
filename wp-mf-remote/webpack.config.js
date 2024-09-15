const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");

const publicPath = (() => {
  if (process.env.NODE_ENV === "production") {
    return "https://appcdn.leadconnectorhq.com/leadgen/SocialPlanner/";
  }

  return "http://localhost:3003/";
})();

module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: false,
  optimization: {
    minimize: true,
  },
  entry: "./src/main.ts",
  output: {
    publicPath,
    chunkFilename: "gf_form_app.[chunkhash].js",
    uniqueName: "gf_form_app",
  },
  resolve: {
    extensions: [".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      process: "process/browser",
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: "gfFormApp",
      filename: "remoteEntry.js",
      library: { type: "var", name: "gfFormApp" },
      exposes: {
        "./Content": "./src/App.vue",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3003,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                scopeId: "data-v-[hash:8]",
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true },
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },
});
