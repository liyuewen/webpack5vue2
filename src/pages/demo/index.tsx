import { Vue } from 'vue-property-decorator'
import styles from './index.module.less'
import IDemo from './server'
import { TablePro, TableProItem, Text } from '@/components'
import { DIComponent } from '@/core/annotation/vueComponent'
import { Inject } from 'ioc-di'
import Test1 from './components/test1'

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
						<div>test: {this.server.testStroe.name}</div>
						<div
							class={styles.but}
							onclick={() => {
								this.server.testStroe.setName('demotest')
								console.log(this.server.iTest1.iDemo.iTest1.iDemo.iTest1.aaa);
								
							}}
						>
							点击
						</div>
					</div>
				</div>
				<router-link to="/demo2">跳转demo2</router-link>

				<TablePro server={this.server.tableProServer} style={{height: '400px'}}>
					<TableProItem label="id" prop='id' width='400'>
						<div>121212</div>
					</TableProItem>
					<TableProItem label="name" prop='name' width='100'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
					<TableProItem label="name" prop='name'></TableProItem>
				</TablePro>
				<Test1 server={this.server.iTest1} />
			</div>
		)
	}
}
