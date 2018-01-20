const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: '[name].js'
	},
	devServer: {
		port: 3000,
		open: true,
		inline: true,
		noInfo: true
	},
	resolve: {
		extensions: ['.js', '.jsx','.css']
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				use: 'babel-loader',
				exclude: [path.resolve(__dirname, 'node_modules')]
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'NODE.ENV':JSON.stringify('development')
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	]
};