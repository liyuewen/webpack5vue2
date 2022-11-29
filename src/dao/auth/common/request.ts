import AxiosDao from '@/dao/common'

const axiosDao = new AxiosDao()

const AuthAxiosDao = () => {
	let url = ''
	try {
		url = 'http://localhost:8080'
	} catch (error) {
		console.error(error)
	}
	return axiosDao.setDefaults({
		baseURL: url,
	})
}

export default AuthAxiosDao
