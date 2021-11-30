const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    //path
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    
    //SourceMap
    productionSourceMap : process.env.NODE_ENV === 'production'
    ? false
    : true,
    
    //lint
    lintOnSave: false,

    // configureWebpack: {
        // optimization: {
        //     minimize: false,
        // },
        // plugins: [
        //     new HtmlWebpackPlugin({
        //         title: 'kimmy',
        //         minify:false,
                // minify:{
                //     collapseWhitespace: true,
                //     keepClosingSlash: true,
                //     removeComments: true,
                //     removeRedundantAttributes: true,
                //     removeScriptTypeAttributes: true,
                //     removeStyleLinkTypeAttributes: true,
                //     useShortDoctype: true
                // }
    //         })
    //     ]
    // },

}