import { Init } from "./Init";
import { CreateElement } from "vue";
import Log from "@/utils/console/log";

class StartRun extends Init {
  constructor() {
    super();
    this.InitRun()
  }

  InitRun() {
    Log.info('欢迎使用', "v1.0.0")
    new this.VueApp({
      router: this.Router,
      render: (h: CreateElement) => h(this.DomApp)
    }).$mount('#app');
  }
}

new StartRun();
