const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client', './src/examples/index.tsx'],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'react-native': 'react-native-web'
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};