import path from 'path'

const baseConfig = {
	prot: 8998,
	entry: path.resolve(__dirname, '../../../../src/core/run/start.ts'),
	output: {
		path: path.resolve(__dirname, '../../../../dist'),
		filename: 'js/[name].[fullhash].js',
	},
	htmlTemplate: {
		title: 'demo',
		ip: "http://192.168.18.60:8866/api/",
		template: path.resolve(__dirname, '../../template/index.html'),
		filename: 'index.html',
		entry: {
			polyfill: ['core-js/stable', 'regenerator-runtime/runtime']
		},
	},
	isDev() {
		if(process.env.NODE_ENV === "development") {
			return true
		}
	}
}

export default baseConfig
