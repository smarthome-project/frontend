const path 		= require('path')
const webpack	= require('webpack')
const express	= require('express')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
	{
		'from': './src/assets/libs/*', 
		'to': 'assets/libs',
		'flatten': true
	},
	{
		'from': './src/assets/fonts/*', 
		'to': 'assets/fonts',
		'flatten': true
	}
], {
	'debug': 'debug'
})

module.exports = {
	devServer: {
		historyApiFallback: true,
		before(app) {
			console.log('# assets path:', path.join(__dirname, 'dist/assets'))
			app.use('/assets/libs', express.static(path.join(__dirname, 'dist/assets/libs')) )
			app.use('/assets/fonts', express.static(path.join(__dirname, 'dist/assets/fonts')) )
		}
	},
	devtool: 'source-map',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'assets/bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.(png|jpg)$/, loaders: ['file-loader'] }
		],
	},
	plugins: [
		HtmlWebpackPluginConfig,
		CopyWebpackPluginConfig
	]
}