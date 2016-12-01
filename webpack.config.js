var webpack = require('webpack');
module.exports = {
    entry: {
        index: './src/js/index.js'
        // list: './src/js/list.js'
    },
    output: {
        path:'./dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

