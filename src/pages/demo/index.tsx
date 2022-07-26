import { Component, Vue } from 'vue-property-decorator'
import styles from './index.module.less'
import IDemo from './server'
import { Text } from '@/components'

class Test {
	constructor(public name: string) {}
}

@Component
export default class Demo extends Vue {
	server = new IDemo()

	protected render() {
		let aaa = new Test('test1')

		return (
			<div
				class={styles.a}
				onclick={() => {
					console.log(aaa.name)

					this.server.iText.setText('123123')
				}}
			>
				<Text server={this.server.iText} />
			</div>
		)
	}
}
