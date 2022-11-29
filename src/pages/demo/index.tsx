import { Component, Vue } from 'vue-property-decorator'
import styles from './index.module.less'
import IDemo from './server'
import { Text } from '@/components'

@Component
export default class Demo extends Vue {
	server = new IDemo()

	protected render() {
		return (
			<div
				class={styles.a}
				onclick={() => {
					this.server.iText.setText('123123')
				}}
			>
				<Text server={this.server.iText} />
			</div>
		)
	}
}
