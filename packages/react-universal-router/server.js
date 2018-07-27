const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const host = process.env.HOST || 'localhost';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3001;

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://${host}:${port}`);
});