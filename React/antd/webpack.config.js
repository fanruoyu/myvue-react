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
		port: 3000,
		open: true,
		noInfo: true,
		inline: true,
		proxy:{
			'/test/*': {
				target: 'http://localhost:8888',
				changeOrigin: true,
				secure: false
			}
		}
	},
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				loader: 'babel-loader',
				exclude: [path.resolve(__dirname, 'node_modules')]
			},
			{
				test: /(\.css|\.less)$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(svg|ttf|woff|eot|\.png|\.gif|\.jpg)$/,
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