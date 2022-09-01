// //webpack.config.js
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const nodeExternals = require("webpack-node-externals");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   externals: [nodeExternals()],
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
//   output: {
//     filename: "index.js",
//     path: path.resolve(__dirname, "dist"),
//     libraryTarget: "commonjs",
//   },
//   plugins: [new CleanWebpackPlugin()],
//   //   devServer: {
//   //     port: 8080,
//   //   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//         options: {
//           presets: ["@babel/preset-env", "@babel/preset-react"],
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|jp(e*)g|svg|gif)$/,
//         use: ["file-loader"],
//       },
//       {
//         test: /\.svg$/,
//         use: ["@svgr/webpack"],
//       },
//     ],
//   },
//   //   plugins: [
//   //     new HtmlWebpackPlugin({
//   //       template: path.join(__dirname, "/src/index.html"),
//   //     }),
//   //   ],
// };

// Imports
const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// Webpack Configuration
const config = {
  // Entry
  entry: "./src/index.js",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".json", ".node"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()],
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },

  // Output
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    globalObject: "this",
    library: {
      name: "zenlyticPlots",
      type: "umd",
    },
  },
  mode: "development",
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      // CSS Files
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        sideEffects: true, // 👈 ADD THIS
        include: /src/,
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  // Plugins
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './client/dist/index.html',
  //     filename: 'index.html',
  //     hash: true
  //   })
  // ]
  // OPTIONAL
  // Reload On File Change
  // watch: true,
  // Development Tools (Map Errors To Source File)
  // devtool 'source-map',
};
// Exports
module.exports = config;
