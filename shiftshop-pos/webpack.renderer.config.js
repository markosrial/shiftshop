const rules = require('./webpack.rules');
const CopyPlugin = require('copy-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(js|jsx)$/,
  exclude: [/node_modules/, /lib/],
  use: "babel-loader",
});

rules.push({
  test: /\.(woff2?|png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[hash]-[name].[ext]',
        outputPath: 'static',
        publicPath: '../static',
      },
    },
  ]
});

rules.push({
  test: /\.s[ac]ss$/i,
  use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [new CopyPlugin({
    patterns: [
      {
        from: 'lib',
        to: 'lib/[name].[ext]',
      },
    ],
  })],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};
