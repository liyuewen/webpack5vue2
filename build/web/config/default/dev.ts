import { Configuration } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'
import { ESBuildMinifyPlugin } from 'esbuild-loader'

const defaultDevConfig: Configuration = {
	mode: 'development',
	optimization: {
		splitChunks: false,
		minimize: false,
	},
	experiments: {
		lazyCompilation: {
			imports: true,
			entries: false,
			backend: {
				client: path.resolve(
					__dirname,
					'../../modules/lazy-compilation-web.js'
				),
			},
		},
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: path.resolve(__dirname, '../../../../src/tsconfig.json'),
			},
		})
	],
}

export default defaultDevConfig
