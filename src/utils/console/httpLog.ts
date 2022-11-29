import Utils from '../utils'

export default class HttpLog {
	public static async params(url: string, params?: { data: any; params: any, headers: any }) {
		const paramsStr = Utils.isExists(params) ? params : '无参数'
		console.log(
			`%c url: %c ${url} %c \n\r%c 请求参数: `,
			'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
			'background:transparent',
			'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			paramsStr
		)
	}

	public static async response(url: string, data: any) {
		const dataStr = Utils.isExists(data) ? data : '无数据'
		console.log(
			`%c url: %c ${url} %c \n\r%c data: `,
			'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
			'background:transparent',
			'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			dataStr
		)
	}

	public static async error(url: string, error: any) {
		const errorStr = Utils.isExists(error) ? error : '无错误信息'
		console.log(
			`%c url: %c ${url} %c \n\r%c error: `,
			'background:#F56C6C ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
			'background:transparent',
			'background:#F56C6C ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			errorStr
		)
	}
}
