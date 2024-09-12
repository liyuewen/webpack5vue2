import { Prop, Vue } from 'vue-property-decorator'
import { DIComponent } from '@/core/annotation/vueComponent'
import { Inject } from 'ioc-di'
import ITest1 from './server'

@DIComponent
export default class Test1 extends Vue {

  $props!: {
    server: ITest1
  }

  @Prop() server!: ITest1

	protected render() {
		return (
			<div>
        1212
			</div>
		)
	}
}
