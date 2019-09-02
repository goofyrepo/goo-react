
const path = require("path");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
    mode: "production",
    entry: ["./src/index.js"],
    output: {
        // 输出目录
        path: path.join(__dirname, "dist"),
        // 文件名称
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 创建style标签，并将css添加进去
                    "css-loader", // 编译css
                    "postcss-loader",
                    "sass-loader" // 编译scss
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // 创建style标签，并将css添加进去
                    "css-loader", // 编译css
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', // 图片输出的路径
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }


        ]
    },
    plugins: [new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
    })],


}
