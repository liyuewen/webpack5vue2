import { Init } from "./Init";
import { CreateElement } from "vue";
import Log from "@/utils/console/log";
import VueDIProvider from "../annotation/vueComponent";
import { Already, Inject, Root, Service } from "ioc-di";
import { TestStroe } from "@/store/test";

@Root()
@Service()
class StartRun extends Init {
  @Inject() private provider!: VueDIProvider

  @Inject() testStroe!: TestStroe

  constructor() {
    super();
    this.InitRun()
  }

  @Already
  InitRun() {
    Log.info('欢迎使用', "v1.0.0")
    new this.VueApp({
      router: this.Router,
      provide: {
        [VueDIProvider.key]: this.provider
      },
      render: (h: CreateElement) => h(this.DomApp)
    }).$mount('#app');
  }
}

new StartRun();
