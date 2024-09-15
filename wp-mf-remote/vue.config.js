const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const webpack = require("webpack");
const publicPath = (() => {
  return "http://localhost:5176/";

  if (process.env.NODE_ENV === "production") {
    return "https://appcdn.leadconnectorhq.com/leadgen/SocialPlanner/";
  }
  if (process.env.NODE_ENV === "beta") {
    return "https://beta.appcdn.leadconnectorhq.com/leadgen/SocialPlanner/";
  }
  if (process.env.NODE_ENV === "staging") {
    return "https://staging.appcdn.leadconnectorhq.com/leadgen/SocialPlanner--ver--hammad-rp-3u/";
    // return 'https://staging.appcdn.leadconnectorhq.com/leadgen/SocialPlanner/'
  }
  return "http://localhost:5176/";
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
    chunkFilename: "social_planner.[chunkhash].js",
    uniqueName: "social_planner",
  },
  resolve: {
    extensions: [".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      process: "process/browser",
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader", "image-webpack-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
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
      name: "socialPlannerApp",
      filename: "remoteEntry.js",
      library: { type: "var", name: "socialPlannerApp" },
      exposes: {
        "./initialisedPlanner": "./src/pages/InitialisedPlanner",
        "./listPage": "./src/pages/ListPage",
        "./settings": "./src/pages/SettingsPage",
        "./reviewPost": "./src/pages/CreateReviewPost",
        "./vue3": "../../node_modules/vue/index.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
    sentryWebpackPlugin({
      moduleMetadata: ({ release }) => ({
        dsn: "https://ad277cbf393582fcb4f27f023b9cdb74@o176457.ingest.us.sentry.io/4507626865229824",
        module: "SocialPlanner",
        release,
      }),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 5176,
    hot: true,
    liveReload: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
});
