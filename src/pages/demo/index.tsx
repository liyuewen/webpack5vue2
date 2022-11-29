import { Vue } from 'vue-property-decorator'
import styles from './index.module.less'
import IDemo from './server'
import { Text } from '@/components'
import { DIComponent } from '@/core/annotation/vueComponent'
import { Inject } from 'ioc-di'

@DIComponent
export default class Demo extends Vue {
	@Inject(IDemo) server = new IDemo()

	protected render() {
		return (
			<div>
				<div class={styles.item}>
					<div>组件，没有全局注册状态不会同步</div>
					<div class={styles.content}>
						<div>
							text: <Text server={this.server.iText} />
						</div>
						<div
							class={styles.but}
							onclick={() => {
								this.server.iText.setText('9999')
							}}
						>
							点击
						</div>
					</div>
				</div>

				<div class={styles.item}>
					<div>全局状态</div>
					<div class={styles.content}>
						<div>
						test: {this.server.testStroe.name}
						</div>
						<div
							class={styles.but}
							onclick={() => {
								this.server.testStroe.setName('demotest')
							}}
						>
							点击
						</div>
					</div>
				</div>
				<router-link to="/demo2">跳转demo2</router-link>
			</div>
		)
	}
}
