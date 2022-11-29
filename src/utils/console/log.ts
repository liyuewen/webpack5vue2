import Utils from '../utils'

export default class Log {
	public static info(title: string, info?: any) {
		if (!Utils.isObject(info)) {
			console.log(
				`%c ${title} %c ${info} `,
				'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
				'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff'
			)
			return
		}
		console.log(
			`%c ${title} `,
			'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			info || ''
		)
	}

	/**
	 * 打印错误信息
	 * @param error
	 */
	public static error(title: string, error: any) {
		console.log(
			`%c ${title} `,
			'background:#F56C6C ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
			error
		)
	}
}
