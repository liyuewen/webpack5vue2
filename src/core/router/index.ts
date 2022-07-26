import type { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: 'index' */ '@/layout/index/index'),
		redirect: {
			name: 'manage',
		},
		children: [
			{
				path: '/manage',
				name: 'manage',
				component: () =>
					import(/* webpackChunkName: 'demo' */ '@/pages/demo/index'),
			},
		],
	},
]

export default routes
