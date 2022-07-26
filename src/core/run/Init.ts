import 'reflect-metadata'
import Vue, { VueConstructor } from 'vue'
import App from '@/layout/App'
import VueRouter from 'vue-router'
import {
	RegisterMethods,
	RegisterVueMethods,
} from '@/core/annotation/vueRegister/register'
import VueConfig from '@core/config/VueConfig'

@RegisterMethods()
@RegisterVueMethods()
export class Init {
	// 保存Vue对象
	protected VueApp: VueConstructor = Vue
	// 保存VueRouter对象
	protected Router!: VueRouter
	// 根组件App
	protected DomApp: typeof App = App

	constructor() {
		this.VueApp.config.productionTip = false
		this.initPlugs()
	}

	private initPlugs(): void {
		this.InitVueRouter()
	}

	/**
	 * 初始化 VueRouter
	 * @constructor
	 * @private
	 */
	private InitVueRouter(): void {
		this.Router = new VueRouter(VueConfig.RouterConfig)
		this.Router.beforeEach((to, from, next) => {
			next()
		})
		const originalPush = VueRouter.prototype.push
		VueRouter.prototype.push = function push(location: any) {
			// @ts-ignore
			return originalPush.call(this, location).catch(err => err)
		}
	}
}
