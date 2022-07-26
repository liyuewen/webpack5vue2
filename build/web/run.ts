import webpack, { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import { deleteSync } from 'del'

import defaultDevConfig from './config/default/dev'
import baseConfig from './config/base/config'
import BaseDefaultConfig from './config/default/base'
import defaultBuildConfig from './config/default/build'
import WebUtils from './utils'

interface WebRunOptions {}

export default class WebRun implements RunType {
	type: RunOptionsType = 'dev'

	ip = WebUtils.getIPAdress()

	constructor(option: RunOptions<WebRunOptions>) {
		this.run(option)
	}

	run(option: RunOptions<WebRunOptions>): void {
		const { type } = option
		this.type = type
		const config = this.getWebpackConfig()

		if (type === 'dev') {
			this.startWebpack(config)
		} else {
			this.buildWebpack(config)
		}
	}

	getWebpackConfig() {
		if (this.type === 'build') {
			return merge(defaultBuildConfig, BaseDefaultConfig)
		}
		return merge(defaultDevConfig, BaseDefaultConfig)
	}

	startWebpack(config: Configuration): void {
		try {
			const compiler = webpack(config)

			this.handleHooks(compiler)

			const server = new WebpackDevServer(
				{
					hot: true,
					port: baseConfig.prot,
					liveReload: false,
					allowedHosts: 'all',
					compress: true,
					client: {
						logging: 'warn',
						overlay: {
							errors: true,
							warnings: false,
						},
						progress: true,
					},
				},
				compiler
			)
			server.startCallback(err => {
				if (!!err) {
					console.log('server start error', err)
				}
			})
		} catch (error) {
			console.log('startWebpack:', error)
		}
	}

	buildWebpack(config: Configuration) {
		deleteSync([baseConfig.output.path])
		const compiler = webpack(config, (err, stats) => {
			if (!!err || !stats) {
				throw err
			}
			if (stats.hasErrors()) {
				console.log(stats.toString())
			} else {
				console.log('web打包成功')
			}
		})
	}

	handleHooks(compiler: webpack.Compiler) {
		compiler.hooks.done.tap('done', stats => {
			process.stdout.write(
				process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
			)
			console.log(
				`\n web项目运行在: http://${this.ip}:${baseConfig.prot}\n web项目运行在: http://localhost:${baseConfig.prot}`
			)
			console.log('\n time:', stats.toJson().time + ' ms')
		})

		compiler.hooks.done.tap('error', stats => {
			stats.compilation.errors.forEach(v => {
				if (typeof v == 'string') {
					console.log(v)
				} else {
					console.log(v.message)
				}
			})
		})
	}
}
