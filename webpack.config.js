var webpack = require('webpack');
module.exports = {
    //插件项
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("style.css", {
            allChunks: true,
            disable: false
        }),
        //使用ProvidePlugin加载使用频率高的模块
        new webpack.ProvidePlugin({
            $: "webpack-zepto",
            Zepto: "webpack-zepto",
            "window.Zepto": "webpack-zepto"
        })
    ],
    entry: {
        index: './src/js/index.js',
        list: './src/js/list.js'
    },
    output: {
        path:'/dist/',
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

