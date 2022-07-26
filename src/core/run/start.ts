import { Init } from "./Init";
import { CreateElement } from "vue";

class StartRun extends Init {
  constructor() {
    super();
    this.InitRun()
  }

  InitRun() {
    new this.VueApp({
      router: this.Router,
      render: (h: CreateElement) => h(this.DomApp)
    }).$mount('#app');
  }
}

new StartRun();
