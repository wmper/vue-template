<template>
    <div class="login">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form">
            <el-form-item prop="userName" label="账号">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item prop="passWord" label="密码">
                <el-input v-model="form.passWord" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit()" :loading="loading">{{loadText}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "@/api/axios"
import cryptojs from "crypto-js"
export default {
	data() {
		return {
			loading: false,
			loadText: "登陆",
			form: {
				userName: "admin",
				passWord: "123456"
			},
			rules: {
				userName: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				],
				passWord: [
					{ required: true, message: "请输入密码", trigger: "blur" }
				]
			}
		}
	},
	methods: {
		handleSubmit() {
			this.loading = true
			this.loadText = "登陆中"

			this.$refs["form"].validate((valid) => {
				if (!valid) return false

				if (this.form.userName != "admin") {
					let data = {
						userName: this.form.userName,
						passWord: cryptojs.MD5(this.form.passWord).toString()
					}

					axios.post("/api/login", data).then((res) => {
						if (res.errCode == 0) {
							localStorage.setItem("token", res.data.token)
							this.$router.push({ path: "/" })
						}

						this.loading = false
						this.loadText = "登陆"
					})
				}

				this.$router.push({ path: "/" })
			})
		}
	},
	mounted() {
		localStorage.removeItem("token")
	}
}
</script>
<style scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
.login .form {
	width: 350px;
	padding-right: 40px;
	padding-top: 40px;
	padding-bottom: 10px;
	background: #fff;
	border-radius: 8px;
}
</style>
