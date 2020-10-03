'use strict';
// functions/webpack.config.js
const pkg = require('./package')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')

// Set externals that you don't want to build by webpack
const externals = [
]

var nodeExternals = require('webpack-node-externals');

const genPackage = () => ({
    name: 'functions',
    private: true,
    main: 'index.js',
    "engines": {
        "node": ">=8.13.0"
    },
    license: 'ICTravel',
    dependencies: pkg.dependencies
})
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts"]
    },
    output: {
        path: __dirname + '/lib',
        filename: 'index.js', // <-- Important
        libraryTarget: 'commonjs' // <-- Important
    },
    target: 'node', // <-- Important
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    configFile: "tsconfig.json"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        minimize: false
    },
    plugins: [new GenerateJsonPlugin('package.json', genPackage())],
    externals: [nodeExternals()] // <-- Important
};