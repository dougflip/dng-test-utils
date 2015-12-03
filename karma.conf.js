// Karma configuration
// Generated on Sat Jul 25 2015 08:27:32 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
    config.set({
          browsers: ['Chrome'],
          singleRun: true,
          files: [
              'node_modules/angular/angular.min.js',
              'node_modules/angular-mocks/angular-mocks.js',
              'tests.webpack.js'
          ],
          frameworks: ['jasmine'],
          preprocessors: {
              'tests.webpack.js': ['webpack', 'sourcemap']
          },
          webpack: {
              devtool: 'inline-source-map',
              module: {
                  loaders: [
                    {
                      test: /\.js/,
                      exclude: /node_modules/,
                      loader: 'babel',
                      query: {
                        presets: ['es2015']
                      }
                    }
                  ]
              },
              watch: true
          },
          webpackServer: {
              noInfo: true
          }
      });
}
