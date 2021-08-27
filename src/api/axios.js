import axios from "axios"
import router from "@/router"
import { Message } from "element-ui"
import config from "@/config"

const instance = axios.create({
	baseURL: config.baseURL,
	timeout: 10000,
	headers: {}
})

// Add a request interceptor
instance.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		config.headers.Authorization = localStorage.getItem("token")

		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
instance.interceptors.response.use(
	function(response) {
		// Do something with response data
		const { data, status } = response
		if (status == 200) {
			if (data.errCode != 0 && data.errMsg) {
				Message.warning(data.errMsg)
			} else if (data.errCode == -1) {
				Message.warning("系统繁忙,请重试")
			} else if (data.errCode == 1) {
				Message.warning("数据未变动,无需提交")
			} else if (data.errCode == 2) {
				Message.warning("未授权,请联系管理员")
			} else if (data.errCode == 3) {
				Message.warning("登陆失败,请重新登陆")
			} else if (data.errCode == 4) {
				Message.warning("身份验证失败,请重新登陆")
			}

			return { data: data.data, errCode: data.errCode }
		} else {
			Message.error("网络异常,请重试")
			return { data: null, errCode: -1 }
		}
	},
	function(error) {
		// Do something with response error
		if (error.response) {
			switch (error.response.status) {
				case 401:
					Message.error("身份验证失败")
					if (router.path != "/login") {
						router.replace({
							path: "/login"
						})
					}
					break
				case 500:
					Message.error("网络异常,请重试")
					break
			}
		}

		return Promise.reject(error)
	}
)

export default instance
