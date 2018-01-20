const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'js/[name].js'
	},
	devServer: {
		port: 3001,
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
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx','.css']
	},
	devtool: 'eval-source-map',
	plugins:[
		new HtmlWebpackPlugin({
			template:'index.html'
		})
	]
}