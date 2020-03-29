const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    }
};