import { Configuration } from 'webpack'
import baseConfig from '../base/config'
import WebpackBar from 'webpackbar'
import HTMLPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

const BaseDefaultConfig: Configuration = {
	entry: baseConfig.entry,
	infrastructureLogging: {
		appendOnly: true,
		level: 'warn',
	},
	stats: {
		preset: 'errors-only',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, '../../../../src'),
			'@core': path.resolve(__dirname, '../../../../src/core'),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@vue/jsx',
									{
										vModel: false,
									},
								],
							],
							plugins: [require.resolve('../../modules/jsx-loader/vModel.js')],
						},
					},
					{
						loader: 'vue-jsx-hot-loader',
					},
				],
			},
			{
				test: /\.(tsx|ts)$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true, // 禁用 type checking
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.module\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								getLocalIdent(
									loaderContext: any,
									localIdentName: any,
									localName: any,
									options: any
								) {
									return `${localName}--${loaderContext._module.debugId}`
								},
								localIdentName: '[local]--[hash]',
							},
						},
					},
					{
						loader: 'less-loader',
					},
				],
			},
			{
				test: /(?<!\.module)\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 512,
							esModule: false,
							fallback: {
								loader: require.resolve('file-loader'),
								options: {
									name: path.resolve(
										__dirname,
										'../../../../dist/img/[name].[hash:7].[ext]'
									),
								},
							},
						},
					},
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'static/[name].[hash:7].[ext]',
					publicPath: './',
				},
			},
		],
	},
	plugins: [
		new WebpackBar(),
		new HTMLPlugin(baseConfig.htmlTemplate),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../../template/static'),
					to: 'static',
				},
			],
		}),
	],
}

export default BaseDefaultConfig
