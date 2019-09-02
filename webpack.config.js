const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");


module.exports = {
    mode: "development",
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'GoofyAdmin',
            template: 'index.html'
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "./dist"),
        //host: "0.0.0.0", // 可以使用手机访问
        host: "localhost",
        // host: "127.0.0.1",
        port: 8001,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        proxy: {
            // 代理到后端的服务地址，会拦截所有以api开头的请求地址
            "/api": "http://localhost:8000"
        }
    }

}
