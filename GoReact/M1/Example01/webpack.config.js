const path = require('path');
module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'), //application main folder
  output: {
    path: path.join(__dirname, 'public'), //transpiled file folder
    filename: 'bundle.js', //transpiled file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, //transpile all .js files
        exclude: /node_modules/, //ignore node modules
        use: {
          loader: "babel-loader" //will transpile with babel-loader
        }
      }
    ]
  }
}
