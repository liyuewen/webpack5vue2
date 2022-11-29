import { Service, Container, Destroy, Concat, Inject, Already } from "ioc-di"
import InstanceMeta from 'ioc-di/dist/instance-meta'
import PrototypeMeta from 'ioc-di/dist/prototype-meta'
import { Component, Vue as VueComponent } from 'vue-property-decorator'
import Vue, { VueConstructor, ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'

@Service()
export default class VueDIProvider {
  static readonly key = "_VueDIProvider"
}

@Container()
@Service()
class ComponentContainer {
  static readonly key = "_ComponentContainer"
  data: Record<string, unknown> = {}
  setValue(key: string, value: unknown) {
    this.data[key] = value
  }
  getValue(key: string) {
    return this.data[key]
  }
  @Already
  init() {
    Vue.observable(this.data)
  }
  @Destroy
  destroy() {
    this.data = null!
  }
}

export {
  Inject,
  Destroy,
  Already,
  Concat,
  VueComponent as Vue
}

export function DIComponent<V extends Vue>(options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC
export function DIComponent<VC extends VueClass<Vue>>(target: VC): VC
export function DIComponent(arg: any) {
  if (typeof arg === 'function') {
    const component = Component(arg)
    Bind(component, arg.prototype)
    return component
  } else {
    return function (target: VueConstructor) {
      const component = Component(arg)(target)
      Bind(component, target.prototype)
      return component
    }
  }
}

type ViewThis = {
  [ComponentContainer.key]: ComponentContainer
  [VueDIProvider.key]: VueDIProvider
} & Vue

function Bind(component: VueConstructor, prototype: object) {
  const injections = PrototypeMeta.GetInjections(prototype)
  if (injections.length > 0) {
    component.mixin({
      inject: {
        [VueDIProvider.key]: VueDIProvider.key
      },
      beforeCreate(this: ViewThis) {
        const container = this[ComponentContainer.key] = new ComponentContainer()
        injections.forEach(injection => {
          const key = injection.key
          Object.defineProperty(this, injection.key, {
            enumerable: false,
            configurable: true,
            set: (value) => {
              container.setValue(key, value)
            },
            get: () => {
              return container.getValue(key)
            }
          })
        })
        InstanceMeta.Init(this, prototype)
      },
      created(this: ViewThis) {
        if (!this[VueDIProvider.key]) {
          throw new Error('VueDIProvider not found')
        }
        Concat(this[VueDIProvider.key], this[ComponentContainer.key])
        Concat(this[ComponentContainer.key], this)
        this[ComponentContainer.key].init()
      },
      destroyed(this: ViewThis) {
        injections.forEach(injection => {
          Object.defineProperty(this, injection.key, {})
        })
        this[ComponentContainer.key].destroy()
        this[ComponentContainer.key] = undefined!
      }
    })
  }
}