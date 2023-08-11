const path = require('path');

module.exports = {

    mode: 'development',

    devtool: 'inline-source-map',

    entry: {
        employee: ['babel-polyfill', './React/Components/Employee/Employee.js']
        //can be able to add more bundle according to component/controller
    },

    output: {

        filename: '[name]-bundle.js',

        path: path.join(__dirname, 'wwwroot/React/dist')

    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {

        rules: [{

            loader: 'babel-loader',

            test: /\.js$/,

            exclude: /node_modules/

        },
        {
            test: /\.(sass|less|css)$/,
            use: ["style-loader", "css-loader", 'sass-loader'],
        },
        {
            test: /\.(ts|tsx)$/,
            loader: "awesome-typescript-loader",
        }
        ]

    }

};