import type { PluginObject } from 'vue'
import type { RouterOptions } from 'vue-router'
import VueRouter from 'vue-router'
import routes from '../router'

interface customPlugsType {
	name: string
	plugs: any
}

export default class VueConfig {
	/**
	 * Vue 插件
	 */
	public static VuePlugs: PluginObject<never>[] | any[] = [VueRouter]

	/**
	 * 自定义方法
	 */
	public static customPlugs: customPlugsType[] = [
		// {
		//   name: '$Paper',
		//   plugs: Paper
		// },
		// {
		//   name: '$openseadragon',
		//   plugs: openseadragon
		// }
	]

	/**
	 * 路由配置
	 */
	public static RouterConfig: RouterOptions = {
		// mode: 'history',
		mode: 'hash',
		base: './',
		routes: routes,
	}
}
