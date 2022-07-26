import { PluginObject } from 'vue'
import VueConfig from '../../config/VueConfig'

/**
 * 读取 config 配置，自动注册Vue插件
 * @constructor
 */
export function RegisterVueMethods() {
  return (target: any) => {
    VueConfig.VuePlugs.forEach((v: PluginObject<never>) => (new target()).VueApp.use(v))
  }
}

/**
 * 注册Vue全局方法
 */
export function RegisterMethods() {
  return (target: any) => {
    VueConfig.customPlugs.forEach((v) => (new target()).VueApp.prototype[`${v.name}`] = v.plugs)
  }
}