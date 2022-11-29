import axios, {
	AxiosDefaults,
	AxiosHeaders,
	AxiosInstance,
	AxiosRequestConfig,
	HeadersDefaults,
	Method,
} from 'axios'
import Utils from '@/utils/utils'
import HttpLog from '@/utils/console/httpLog'

interface AxiosDaoConfig extends Omit<AxiosDefaults, 'headers'> {
	headers?: HeadersDefaults & {
		[key: string]: AxiosHeaders | string | string[] | number | boolean | null
	}
}

interface RequestParams extends AxiosRequestConfig {
	url: string

	data?: any

	key?: string

	header?: any

	method?: Method

	// 是否需要formdata的格式传输数据
	formData?: boolean
}

/**
 * axios的封装
 * 暂时设置需要在请求之前设置
 */
class AxiosDao {
	instance!: AxiosInstance

	constructor() {
		this.instance = axios.create({})
		this.ResponseInterceptor()
		this.RequestInterceptor()
	}

	public setDefaults(config: AxiosDaoConfig) {
		const defaultData: AxiosDefaults = this.instance.defaults
		this.instance.defaults = Object.assign(defaultData, config)
		return this
	}

	/**
	 * 封装请求
	 */
	public request<D = any>(params: RequestParams): Promise<D> {
		return new Promise(async (resolve, reject) => {
			const obj = Object.assign({ data: {} }, { ...params })
			try {
				if (obj.formData) {
					if (Utils.isObject(obj.data)) {
						for (const key in obj.data) {
							if (Array.isArray(obj.data[key]) && obj.data[key].length == 0) {
								obj.data[key] = null
							}
						}
					}
					obj.data = obj.data
					obj.header = obj.header || {}
					Object.assign(obj.header, {
						'Content-Type': 'application/x-www-form-urlencoded',
					})
				}
				let res = (await this.instance.request(obj)) as any
				if (!!JSON.stringify(res)) {
					resolve(res)
					return
				}
				throw '无返回值'
			} catch (error: any) {
				reject(error)
				// HttpLog.error(obj.url, error)
			}
		})
	}

	/**
	 * 响应拦截器
	 * @constructor
	 */
	ResponseInterceptor() {
		this.instance.interceptors.response.use(
			response => {
				switch (response.status) {
					case 200:
						const data = response.data
						if (data.success) {
							return data
						}

						let msg = ''
						if (Utils.isExists(data.msg)) {
							msg = `服务端错误:${decodeURI(data.msg)}`
						} else if (Utils.isExists(data.event)) {
							msg = `服务端错误:${data.event}`
						} else {
							msg = '服务端错误'
						}
						throw new Error(msg)
					case 10000:
						return void 0
					case 401:
						// Utils.removeToken()
						// location.href = '#/login'
						return void 0
					default:
						return void 0
				}
			},
			error => {
				if (error === undefined || error.code === 'ECONNABORTED') {
					return Promise.reject(error)
				}
				return Promise.reject(error)
			}
		)
	}

	/**
	 * 添加请求拦截器
	 * @constructor
	 */
	RequestInterceptor() {
		this.instance.interceptors.request.use(
			(config: any) => {
				HttpLog.params(config.url, {
					data: config.data,
					params: config.params,
					headers: config.headers,
				})
				return config
			},
			function (error: Error) {
				return Promise.reject(error)
			}
		)
	}
}

export default AxiosDao
