import IText from '@/components/text/server'
import Inject from '@/core/ioc/decorators/inject'

export default class IDemo {
	@Inject()
	iText: IText = new IText()
}
