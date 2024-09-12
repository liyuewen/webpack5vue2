import TableProServer from '@/components/tablePro/server'
import IText from '@/components/text/server'
import { TestStroe } from '@/store/test'
import { Inject, InjectRef, Service } from 'ioc-di'
import ITest1 from './components/test1/server'

@Service()
export default class IDemo {
	@Inject()
	iText: IText = new IText()

	@InjectRef(() => ITest1)
	iTest1!: ITest1

	@Inject()
	testStroe!: TestStroe

	@Inject()
	tableProServer = new TableProServer({
		data: Array.from({ length: 20000 }, (v, i) => ({
			id: i,
			name: this.generateString(i),
		})),
	})

	generateString(n: number) {
		if(n%4 === 0) {
			return '双数双数双数双数双数双数双数'
		}
		if(n%3 === 0) {
			return '333333333333333333333333333333'
		}
		if(n%2 === 0) {
			return '双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数双数'
		}
		return '单数'
	}
 
}
