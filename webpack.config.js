const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'public', 'scripts'),
        filename: 'main.bundle.js'
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
           test: /\.vue$/,
           loader: 'vue-loader'
         },
         {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                // Prefer `dart-sass`
                implementation: require('dart-sass'),
              },
            },
          ],
        },
      ]
     },

     plugins: [
         new VueLoaderPlugin
     ],

     resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
      }
}
