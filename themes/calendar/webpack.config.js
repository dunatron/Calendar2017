const path = require('path');
const webpack = require('webpack');
const jquery = require('jquery');
//const Vue = require('vue');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//https://webpack.github.io/docs/code-splitting.html

var isProd = process.env.NODE_ENV === 'production'; // true or false

var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {

    context: path.resolve(__dirname, './src'),

    entry: {
        app: './app.js',
        vendor: ['jquery', 'vue'],
        bootstrap: bootstrapConfig
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/themes/calendar/dist/',
        filename: '[name].bundle.js',
        library: 'jquery'
    },

    plugins: [

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     minChunks: 2,
        // }),
        // Doing the more manual approach with entry of vendor. Remember to cashe the vendor output file
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        // new webpack.ProvidePlugin({
        //     Vue: "Vue",
        // }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: 2,
        }),
    ],



    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'stage-2']  },
                }],
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], //Loaders are processed in reverse array order. That means css-loader will run before style-loader.
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ]
            },

            // {
            //     test: /\.svg$/,
            //     use: [
            //         'svg-loader',
            //     ]
            // },

            // Loaders for other file types go here
            { test: /\.(woff|woff2|ttf|eot|svg|gif|png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, loader: 'url-loader?limit=100000&name=fonts/[name].[ext]' },
        ],

        loaders: [
            // Bootstrap 3
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },

        ],


    },

};