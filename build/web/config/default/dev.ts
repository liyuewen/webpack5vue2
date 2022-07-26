import { Configuration } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'

const defaultDevConfig: Configuration = {
	mode: 'development',
	experiments: {
		lazyCompilation: {
			imports: true,
			entries: true,
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
		}),
	],
}

export default defaultDevConfig
