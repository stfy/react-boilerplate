const webpack = require('webpack')
const path = require('path')

const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {getClientEnv} = require('../config/env');
const paths = require('./paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');


const IS_DEV = process.env.NODE_ENV === 'development';
const dotenv = getClientEnv('web', {})

const clientPublicPath =
    dotenv.raw.CLIENT_PUBLIC_PATH ||
    (IS_DEV ? `http://${dotenv.raw.HOST}:${dotenv.raw.PORT}/` : '/');

const webpackDevClientEntry = require.resolve(
    'razzle-dev-utils/webpackHotDevClient'
);

const appEntries = [
    IS_DEV && webpackDevClientEntry,
    'reflect-metadata',
    '@babel/polyfill',
    paths.appClientIndexJs,
].filter(Boolean)

module.exports = () => {
    let config = {
        mode: IS_DEV ? 'development' : 'production',
        devtool: IS_DEV ? 'inline-source-map' : 'source-map',
        target: 'web',
        entry: {
            app: appEntries
        },
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                },
                {
                    test: /\.(js|jsx|mjs|ts|tsx)$/,
                    include: [paths.appSrc],
                    use: [
                        require.resolve('babel-loader')
                    ],
                },
                {
                    test: /\.(scss)$/i,
                    use: [
                        // {
                        //     loader: require.resolve('style-loader'),
                        //     options: {esModule: false}
                        // },
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: "fc-[local]--[hash:base64:5]",
                                    localIdentHashPrefix: "my-custom-hash",
                                    exportLocalsConvention: 'dashes',

                                }
                            }
                        },
                        require.resolve('resolve-url-loader'),
                        {
                            loader: require.resolve('sass-loader'),
                            options: {
                                sourceMap: true,
                            }
                        }
                    ],
                },
            ]
        },
        resolveLoader: {
            modules: [paths.appNodeModules, paths.ownNodeModules],
        },
        output: {
            path: paths.appBuild,
            publicPath: clientPublicPath,
            filename: '[name].js',
        },
        resolve: {
            modules: ["node_modules"].concat(
                path.resolve(__dirname, "..", "src"),
                // It is guaranteed to exist because we tweak it in `env.js`
                // process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
            ),
            extensions: ['.tsx', '.ts', '.js', '.mjs', '.css'],
        },

        plugins: [
            new WebpackBar({
                color: '#f56be2',
                name: 'app',
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'React/Typescript',
                template: 'public/index.html',
            }),
            new ForkTsCheckerWebpackPlugin(),
            new MiniCssExtractPlugin({
                ignoreOrder: false,
                filename: 'styles.css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process': {},
                'process.env': {},
                ...dotenv.stringified,
            }),
        ],
    };

    config.devServer = {
        disableHostCheck: true,
        clientLogLevel: 'silent', // Enable gzip compression of generated files.
        compress: true, // watchContentBase: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebookincubator/create-react-app/issues/387.
            disableDotRule: true,
        },
        host: dotenv.raw.HOST,
        hot: true,
        noInfo: true,
        overlay: false,
        port: dotenv.raw.PORT,
        quiet: true, // By default files from `contentBase` will not trigger a page reload.
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {ignored: /node_modules/},
        before(app) {
            // This lets us open files from the runtime error overlay.
            app.use(errorOverlayMiddleware());
        },
    };

    if (!IS_DEV) {
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                }),
            ],
        };
    }

    return config;
};
