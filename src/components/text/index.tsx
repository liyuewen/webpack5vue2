import { Component, Prop, Vue } from 'vue-property-decorator'
import IText from './server'

export interface iText {
	text: string
}

@Component
export default class Demo extends Vue {
	$props!: {
		server: IText
	}

	@Prop() readonly server!: IText

	protected render() {
		return <div>{this.server.text}</div>
	}
}
