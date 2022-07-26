import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Dynamic extends Vue {

  @Watch("loader")
  private async watchLoader(newLoader: any) {
    if (typeof newLoader !== "function") {
      throw "请检查传入loader是否是函数";
    }
    let res = await Promise.resolve(newLoader())
    this.target = res
    this.isLoading = false
  }

  /**
   * 控制动画打开关闭
   */
  private isLoading: boolean = true

  /**
   * 加载动画
   */
  public loading: any = null

  /**
   * 异步函数 用于返回展示的组件
   */
  public loader: Function | null = null

  /**
   * 需要展示的组件
   */
  public target!: any

  render() {

    let Target = this.target
    let Loading = this.loading

    if (this.isLoading) {
      if (typeof this.loading === "function") {
        return <Loading></Loading>
      } else {
        return <div>loading...</div>
      }
    }

    return <Target></Target>

  }

}