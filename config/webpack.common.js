import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import helpers from './helpers';

const TYPESCRIPT_LOADER = {
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader', 'angular2-template-loader']
};

const CSS_STYLE_LOADER = {
    test: /\.css$/,
    exclude: helpers.root('src', 'app'),
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
};

const CSS_RAW_LOADER = {
    test: /\.css$/,
    include: helpers.root('src', 'app'),
    loader: 'raw'
};

const HTML_LOADER = {
    test: /\.html$/,
    loader: 'html'
};

const STATIC_FILE_LOADER = {
    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'file?name=assets/[name].[hash].[ext]'
};

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [TYPESCRIPT_LOADER, HTML_LOADER, STATIC_FILE_LOADER, CSS_RAW_LOADER, CSS_STYLE_LOADER]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};