import net from 'net'

export default class WebUtils {
	static getIPAdress(host?: string) {
		if (!!host) return host
		const interfaces = require('os').networkInterfaces()
		let ipStr = ''
		for (const devName in interfaces) {
			const iface = interfaces[devName]
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i]
				if (
					alias.family === 'IPv4' &&
					alias.address !== '127.0.0.1' &&
					!alias.internal
				) {
					ipStr = alias.address
				}
			}
		}
		return ipStr
	}

	static ipListen(
		port: number,
		callback?: (port: number, host: string) => void
	) {
		const host = this.getIPAdress()
		const server = net.createServer().listen({
			port: port,
			host: host,
		})
		server.on('listening', () => {
			server.close()
			callback && callback(port, host)
		})

		server.on('error', err => {
			this.ipListen(port + 1, callback)
		})
	}
}
