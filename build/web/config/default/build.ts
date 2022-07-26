import { Configuration } from 'webpack'
import baseConfig from '../base/config'

const defaultBuildConfig: Configuration = {
	mode: 'production',
	output: baseConfig.output,
	module: {
		rules: [
			{
				test: /\.(tsx?|js)$/,
				enforce: 'post',
				use: [
					{
						loader: 'babel-loader?cacheDirectory',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: { ie: 10 },
									},
								],
							],
						},
					},
				],
			},
		],
	}
}

export default defaultBuildConfig
