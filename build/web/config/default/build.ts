import { Configuration } from 'webpack'
import baseConfig from '../base/config'
import { ESBuildMinifyPlugin } from 'esbuild-loader'

const defaultBuildConfig: Configuration = {
	mode: 'production',
	output: baseConfig.output,
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /node_modules[\\/](ioc-di|@ace)[\\/].*?\m?js$/,
				enforce: 'post',
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							compilerOptions: {
								target: 'ES5',
								allowJS: true,
							},
						},
					},
				],
			},
			{
				test: /\.(tsx|ts)$/,
				use: (data: {
					resource: string
					realResource: string
					resourceQuery: string
					issuer: string
					compiler: string
				}) => [
					{
						loader: 'swc-loader',
						options: {
							jsc: {
								minify: {
									compress: {
										drop_console: true,
									},
								},
							},
						},
					},
				],
			},
			{
				test: /\.(m?js)$/,
				exclude: path =>
					/node_modules/.test(path) &&
					!/node_modules[\\/](wrequest|crypto-js|wavesurfer.js)/.test(path),
				enforce: 'post',
				use: (data: {
					resource: string
					realResource: string
					resourceQuery: string
					issuer: string
					compiler: string
				}) => [
					{
						loader: 'swc-loader',
						options: {
							sync: true,
							jsc: {
								parser: {
									syntax: 'ecmascript',
									dynamicImport: true,
								},
								target: 'es5',
								loose: true,
							},
							module: {
								type: /\.mjs$/.test(data.resource) ? 'es6' : 'commonjs',
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new ESBuildMinifyPlugin({
			target: 'ie10',
		}),
	],
}

export default defaultBuildConfig
