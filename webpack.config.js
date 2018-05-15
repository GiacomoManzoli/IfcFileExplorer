const path = require("path");

module.exports = {
    entry: {
        app: ["babel-polyfill", "./src/index.js"],
    },
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
