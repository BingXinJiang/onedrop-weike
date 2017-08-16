/**
 * Created by Administrator on 2017/3/29 0029.
 */
var webpack = require('webpack');

module.exports = {
    entry:{
        'view/main/index':'./js/view/home/main.js'
    },
    output:{
        path:__dirname + '/output/js/',
        filename:'[name].bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0']
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css','.json']
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
            },
            output:{
                comments:false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                // 'NODE_ENV': JSON.stringify('production')
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
}



















