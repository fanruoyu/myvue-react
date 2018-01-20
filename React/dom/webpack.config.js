const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		bundle: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: '[name].js'
	},
	devServer: {
		port: 3000,
		open: true,
		noInfo: true,
		inline: true
	},
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				loader: 'babel-loader',
				exclude: [path.resolve(__dirname, 'node_modules')]
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(svg|ttf|woff|eot)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.(svg|jpg|png|gif)$/,
				loader: 'file-loader?name=imgs/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx','.css']
	},
	devtool: 'eval-source-map'
}