const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};
