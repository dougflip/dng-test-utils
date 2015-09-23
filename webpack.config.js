var path = require('path');

module.exports = {
    entry: './src/test-utils.js',
    output: {
        path: __dirname + "/dist",
        filename: "dng-test-utils.js"
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'), loader: 'babel-loader' }
        ]
    }
};
