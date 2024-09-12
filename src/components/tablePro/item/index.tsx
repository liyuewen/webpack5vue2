import { Component, Prop, Vue } from 'vue-property-decorator'
import TableProServer from '../server'

export interface TtemConfigs {
	label: string
	prop: string
	/** 宽度为算上边框的宽度 */
	width?: string
	itemData?: any
}

@Component
export default class TableProItem extends Vue {
	$props!: {
		server?: TableProServer
	} & TtemConfigs

	@Prop() readonly server!: TableProServer
	@Prop() readonly itemData!: any

	protected render() {
		return <span>{this.itemData}</span>
	}
}
