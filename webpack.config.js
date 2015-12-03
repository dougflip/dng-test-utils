var path = require('path');

module.exports = {
    entry: './src/test-utils.js',
    output: {
        path: __dirname + "/dist",
        filename: "dng-test-utils.js",
        library: 'dngTestUtils',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
          {
            test: path.join(__dirname, 'src'),
            include: /src/,
            loader: 'babel',
            query: {
              presets: ['es2015']
            }
          }
        ]
    }
};
