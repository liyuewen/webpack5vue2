import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
	protected render() {
		return <div><router-view /></div>
	}
}
