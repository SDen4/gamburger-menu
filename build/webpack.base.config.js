const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: "assets/"
}

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: ""
    },
    module: {
        rules: [{
            test: /\.pug$/,
            oneOf: [{
                resourceQuery: /^\?vue/,
                use: ["pug-plain-loader"]
            }, {
                use: ['html-loader', 'pug-html-loader']
            }]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js}`}}
                },
                {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                }
            ],
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js}`}}
                }
            ]
        },{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node_modules/"
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin ({
            hash: false,
            template: `${PATHS.src}/pug/pages/index.pug`,
            filename: "./index.html"
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/images`, to: `${PATHS.assets}images`},
            {from: `${PATHS.src}/static`, to: ""}

        ])
    ]
}