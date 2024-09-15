const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");
// const { remoteAppConfig } = require("./src/config/remoteApps");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
// const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  // https://cli.vuejs.org/config/#runtimecompiler
  runtimeCompiler: false,

  // publicPath: 'https://storage.googleapis.com/highlevelapp_test/',
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://static.leadconnectorhq.com/" // prod
      : "/", // dev
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // modify the options...
        // options.hotReload = false;
        // Disable prettier to decrease compile time
        options.prettify = false;
        return options;
      });
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.delete("type");
    svgRule.delete("generator");
    svgRule
      .oneOf("external")
      .resourceQuery(/external/)
      .use("file-loader")
      .loader("file-loader")
      .options({ name: "assets/[name].[hash:8].[ext]" })
      .end()
      .end()
      .oneOf("inline")
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .end()
      .end();

    // Remove the default prefetch plugin
    config.plugins.delete("prefetch");

    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    if (process.env.npm_config_report) {
      config.plugin("webpack-bundle-analyzer").use(
        new BundleAnalyzerPlugin({
          defaultSizes: "gzip",
          //   analyzerPort: 8881
        })
      );
    }
  },
  configureWebpack: {
    devtool:
      process.env.NODE_ENV === "development"
        ? "source-map"
        : "hidden-source-map",
    output: {
      filename: "[name].[hash].js",
      // chunkFilename: 'js/[id].js',
      chunkFilename: "js/chunk.[chunkhash].js",
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
        timers: require.resolve("timers-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "shellApp",
        // remotes: {
        //   ...remoteAppConfig,
        // },
        remotes: {
          remoteApp: "remoteApp@http://localhost:3002/remoteEntry.js",
        },
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery",
        Popper: "popper.js",
      }),
      //   sentryWebpackPlugin({
      //     authToken: process.env.SENTRY_AUTH_TOKEN,
      //     org: "gohighlevel",
      //     project: "spm-ts",
      //   }),
    ],
    devServer: {
      port: 3001,
    },
  },
});
