import Config from '../core/config/Config'

export default class Utils {
	static CheckAjaxUrl(): string {
		if (process.env.NODE_ENV === 'production') {
			return Config.AjaxConfig.ProdUrl
		} else if (process.env.NODE_ENV === 'test') {
			return Config.AjaxConfig.TestUrl
		} else {
			return Config.AjaxConfig.DevUrl
		}
	}

	static getFileConfigUrl(): string {
		return Config.fileConfig
	}

	/**
	 * 判断传入的值是否为空
	 * ""
	 * NaN
	 * []
	 * {}
	 * undefined
	 * null
	 * void 0
	 * 以上都表示空值函数返回 false
	 * @param data
	 * @returns
	 */
	static isExists<T>(data: T): data is NonNullable<T> {
		if (!data) return false
		if (JSON.stringify(data) === '{}') return false
		if (JSON.stringify(data) === '[]') return false
		return true
	}

	/**
	 * 是否是对象
	 * @param value
	 * @returns
	 */
	static isObject(value: any): value is Object {
		return Object.prototype.toString.call(value) == '[object Object]'
	}

	/**
	 * 获取本地图片
	 * @param str
	 * @returns
	 */
	public static getImage(str: string) {
		// if (process.env.NODE_ENV === 'production') {
		// 	return require(`@application/assets/image/${str}`).default
		// } else {
		// 	return require(`@application/assets/image/${str}`)
		// }
	}
}
