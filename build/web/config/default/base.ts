import { Configuration } from 'webpack'
import baseConfig from '../base/config'
import WebpackBar from 'webpackbar'
import HTMLPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import VueTsxTransformer from 'vue-tsx-transformer'
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"

const BaseDefaultConfig: Configuration = {
	entry: baseConfig.entry,
	infrastructureLogging: {
		appendOnly: true,
		level: 'warn',
	},
	target: ['web', 'es5'],
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
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							getCustomTransformers: () => ({
								before: [VueTsxTransformer({})],
							}),
							compilerOptions: baseConfig.isDev()
								? undefined
								: {
										target: 'ES5',
								  },
						},
					},
					{
						loader: 'vue-jsx-hot-loader',
					},
				],
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							compilerOptions: baseConfig.isDev()
								? undefined
								: {
										target: 'ES5',
								  },
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
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				issuer: /\.(s)?css/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'static/[name].[hash:7].[ext]',
				},
			},
			{
				test: /\.(jpg|png)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'static/img/[name].[hash:7].[ext]',
				},
			},
			{
				test: /\.svg/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'static/[name].[hash:7].[ext]',
				},
			},
		],
	},
	plugins: [
		new NodePolyfillPlugin(),
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
