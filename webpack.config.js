/**
 * Created by xgharibyan on 3/29/17.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src/app/'),
    entry: {
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, './build/app'),
        filename: 'bundle.js',
    },
    module:{
        rules: [
            {
                test: /\.js?$/,
                // include: [
                //     path.resolve(__dirname, "app")
                // ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include

                //issuer: { test, include, exclude },
                // conditions for the issuer (the origin of the import)

                enforce: "pre",
                enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)

                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide

                options: {
                    presets: ["es2015"],
                    "plugins": [
                       'angularjs-annotate'
                    ]
                },
                // options for the loader
            },
            {
                test: /\.css$/,
                loader:'style!css!'
            }
        ]
    }
};