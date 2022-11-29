import type { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: 'index' */ '@/layout/index/index'),
		redirect: {
			name: 'demo',
		},
		children: [
			{
				path: '/demo',
				name: 'demo',
				component: () =>
					import(/* webpackChunkName: 'demo' */ '@/pages/demo/index'),
			},
			{
				path: '/demo2',
				name: 'demo2',
				component: () =>
					import(/* webpackChunkName: 'demo' */ '@/pages/demo2/index'),
			},
		],
	},
]

export default routes
