const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//每次打包都清除dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    const cssLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader
    return {
        entry: './src/state.js',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist') //返回绝对路径
        },
        devServer: {
            port: 8888,
            open: true,
            hot: true,
            compress: true,//启动gzip压缩
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [cssLoader, {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    }, 'postcss-loader'],
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src')
                },
                {
                    test: /\.(jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)/,
                    // use: {
                    //     loader: "url-loader",
                    //     options: {
                    //         limit: 10 * 1024,//10kb 以下图片转成base64格式
                    //         outputPath: 'img'
                    //     }
                    // }
                    type: "asset/resource"  /*webpack 5 静态资源 不需要loader*/

                },
                //react jsx
                {
                    test: /\.jsx?$/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {"legacy": true}]
                            ]
                        },
                    }],
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin(
                {
                    filename: "index.html",
                    template: 'index.html',


                }
            ),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: '[id].css'
            }),
            //开启热更新
            new webpack.HotModuleReplacementPlugin(),
            new NyanProgressPlugin(
                {
                    debounceInterval: 60,
                    nyanCatSays (progress, messages) {
                        // console.log(progress,messages)
                        if (progress === 1) {
                            return '我太难了'
                        }
                    }
                }
            )


        ]
    }
};