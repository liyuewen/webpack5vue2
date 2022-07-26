import { Component } from 'vue';

// type Module<T> = Component | T

// type LoadingType<T> = {

//   /**
//    * 新动画组件
//    */
//   components?: Module<T>

//   /**
//    * 时长
//    */
//   time?: number

// }

// type LoaderType<T = any> = (advancedModule: T, originalModule: T, next?: Function) => Module<T>

// interface IntermediateParam<T = any> {

//   /**
//    * 替换原始loading动画
//    * 默认false使用默认动画
//    */
//   loading?: boolean | LoadingType<T>

//   /**
//    * 原始组件
//    */
//   originalModule?: Module<T>

//   /**
//    * 新组件
//    */
//   advancedModule?: Module<T>

//   /**
//    * 接受数组，回调2个参数，新组件和老组件
//    * loader返回的组件始终使用最后一个
//    * 如果使用next参数表示结束则当前loader不可再retrue
//    */
//   loader?: LoaderType[]

//   /**
//    * 严格模式
//    * 默认为true，严格模式下，替换组件只能使用 advancedModule 字段
//    */
//   strict?: boolean
// }

export function loadDemand<T = any>(constructor: T): any {
  async function component() {
    return new Promise((resolve) => {
      const Dynamic = require('./dynamic').default
      let loadingComponents = class extends Dynamic {
        loader = async () => {
          // 需要等待的时间
          await new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
          return constructor
        }
      }
      resolve(loadingComponents)
    })
  }
  const AsyncHandler = () => ({
    component: component()
  })
  return AsyncHandler
}

export default function dynamic() {
  return (constructor: any) => loadDemand(constructor)
}