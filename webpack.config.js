const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const buildPath = './build/';

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js',
        publicPath: `/${pkg.repository}/`,
    },
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: 'file-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                type: 'javascript/auto',
                test: /\.(json)/,
                exclude: path.resolve(__dirname, './node_modules/'),
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            lights$: path.resolve(__dirname, 'src/components/lights'),
            objects$: path.resolve(__dirname, 'src/components/objects'),
            scenes$: path.resolve(__dirname, 'src/components/scenes'),
            textures$: path.resolve(__dirname, 'src/components/textures'),
            functions$: path.resolve(__dirname, 'src/components/functions'),
            utils$: path.resolve(__dirname, 'src/utils'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ title: pkg.title, favicon: 'src/favicon.ico', template: 'src/index.ejs', }),
        new CopyPlugin([
            {
                from: './src/style/main.css',
                to: 'main.css',
            },
            {
                from: './src/style/font.json',
                to: 'font.json',
            },
            {
                from: './src/style/font.ttf',
                to: 'font.ttf',
            },
            {
                from: './src/style/black.jpg',
                to: 'black.jpg',
            },
            {
                from: './src/style/loading.gif',
                to: 'loading.gif',
            },
            {
                from: './src/audio/backgroundMusic.mp3',
                to: 'backgroundMusic.mp3',
            },
            {
                from: './src/audio/meow.mp3',
                to: 'meow.mp3',
            },
        ]),
    ],
};
