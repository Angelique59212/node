require("webpack");
const path = require("path");

module.exports = (env, argv) => {
  const config = argv.mode === "development" ? devConfig() : prodConfig();
  return {
    entry: {
      front: "./assets/js/app.js",
    },

    output: {
      path: path.resolve(__dirname, "public"),
      filename: "build/js/[name].js",
      publicPath: "/",
      clean: {
        keep: /index\.html|index\.php/,
      },
    },
    ...config,
  };
};

/**
 * Mode dev
 */
function devConfig() {
  return {
    mode: "development",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Règles fichier images
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
          generator: { filename: "build/images/[name][ext]" },
        },
      ],
    },
    optimization: { minimize: false },
  };
}

/**
 * Mode production
 */
function prodConfig() {
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const TerserPlugin = require("terser-webpack-plugin");

  return {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
          generator: { filename: "build/images/[name][ext]" },
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    plugins: [new MiniCssExtractPlugin({ filename: "build/css/[name].css" })],
  };
}
