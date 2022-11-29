import IText from '@/components/text/server'
import { Inject, Root, Service } from 'ioc-di'

@Root()
@Service()
export default class IDemo {
	@Inject()
	iText: IText = new IText()
}
