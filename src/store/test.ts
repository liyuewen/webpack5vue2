import { Service } from 'ioc-di'

@Service()
export class TestStroe {
	name = 'TestStroe'

	setName(name: string) {
		this.name = name
	}
}
