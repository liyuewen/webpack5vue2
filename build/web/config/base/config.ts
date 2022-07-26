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
		template: path.resolve(__dirname, '../../template/index.html'),
		filename: 'index.html',
	},
}

export default baseConfig
