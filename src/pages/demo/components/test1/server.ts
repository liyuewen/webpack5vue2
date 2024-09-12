import { Inject, InjectRef, Service } from 'ioc-di'
import IDemo from '../../server'

@Service()
export default class ITest1 {

  @InjectRef(() => IDemo)
  iDemo!: IDemo
 
  aaa = 1

}
