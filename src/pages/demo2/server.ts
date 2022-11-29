import IText from '@/components/text/server'
import { TestStroe } from '@/store/test'
import { Inject, Service } from 'ioc-di'

@Service()
export default class IDemo2 {

	@Inject()
	iText: IText = new IText()

	@Inject()
	testStroe!: TestStroe

}
