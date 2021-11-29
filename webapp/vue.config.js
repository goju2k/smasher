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

}