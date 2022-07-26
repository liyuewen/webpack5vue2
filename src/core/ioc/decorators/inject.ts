/**
 * 将服务注入类属性或构造函数参数
 */
function Inject(token?: any) {
	return function (target: Object, propertyName: string, index?: number) {
		console.log(
			Reflect.getMetadata('design:type', target, propertyName),
			'====='
		)

		// console.log(target, propertyName, index)
	}
}

export default Inject
