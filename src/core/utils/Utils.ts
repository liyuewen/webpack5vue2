
import Config from '../config/Config'

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

	static setToken(value: any) {
		localStorage.setItem(`${Config.prefix}t`, JSON.stringify(value))
	}

	static getToken(): any {
		try {
			const value = localStorage.getItem(`${Config.prefix}t`)
			if (value) {
				return JSON.parse(value)
			}
			return undefined
		} catch (error) {
			// HandleError.error(error)
		}
	}

	static removeToken() {
		localStorage.removeItem(`${Config.prefix}t`)
	}

	static setStorage(key: string, value: any) {
		localStorage.setItem(`${Config.prefix}${key}`, JSON.stringify(value))
	}

	static getStorage(key: string) {
		try {
			const value = localStorage.getItem(`${Config.prefix}${key}`)
			if (value) {
				return JSON.parse(value)
			}
			return undefined
		} catch (error) {
			// HandleError.error(error)
		}
	}

	static removeStorage(key: string) {
		localStorage.removeItem(`${Config.prefix}${key}`)
	}

	/**
	 * 防抖
	 * @param fn 被执行函数
	 * @param wait 延迟时间
	 * @param immediate 立即执行
	 */
	static debounce(fn: Function, wait: number, immediate = false) {
		let timer: any,
			startTimeStamp = 0
		let context: any, args: any

		const run = (timerInterval: any) => {
			timer = setTimeout(() => {
				const now = new Date().getTime()
				const interval = now - startTimeStamp
				if (interval < timerInterval) {
					console.log('debounce reset', timerInterval - interval)
					startTimeStamp = now
					run(wait - interval)
				} else {
					if (!immediate) {
						fn.apply(context, args)
					}
					clearTimeout(timer)
					timer = null
				}
			}, timerInterval)
		}

		return () => {
			context = this
			args = arguments
			const now = new Date().getTime()
			startTimeStamp = now

			if (!timer) {
				if (immediate) {
					fn.apply(context, args)
				}
				run(wait)
			}
		}
	}

	/**
	 * 处理富文本中的换行和空格
	 */
	public static handleRichText(str: string) {
		return str.replace(/\n/gm, '<br/>').replace(/\s/g, '&nbsp;')
	}

	/**
	 * 保留小数点n位
	 * @param num 要保留的数字
	 * @param decimal 保留几位
	 */
	public static formatDecimal(num: string, decimal: number) {
		num = num.toString()
		let index = num.indexOf('.')
		if (index !== -1) {
			num = num.substring(0, decimal + index + 1)
		} else {
			num = num.substring(0)
		}
		return parseFloat(num).toFixed(decimal)
	}

	/**
	 * 转换空格为真~空格
	 * @param str
	 */
	public static nbspOrSpace(str: string) {
		return str.replaceAll('&nbsp;', ' ')
	}

	/**
	 * 判断数组1是否是数组2的子集
	 */
	public static contrastArray(
		arr1: string[] | number[],
		arr2: string[] | number[]
	) {
		let is = true
		arr1.forEach((v: any, i: number) => {
			if (arr2.indexOf(v as never) == -1) {
				is = false
			}
		})
		return is
	}

	/**
	 * 获取本地图片
	 * @param str
	 * @returns
	 */
	public static getImage(str: string) {
		if (process.env.NODE_ENV === 'production') {
			return require(`@application/assets/image/${str}`).default
		} else {
			return require(`@application/assets/image/${str}`)
		}
	}
}
