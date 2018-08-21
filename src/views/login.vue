<template>
	<div id="login">
		<el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
			<el-form-item>
				<div class="avatar"></div>
			</el-form-item>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" prefix-icon="myicon myicon-user" placeholder="用户名" @keydown.native.enter="loginSubmit('loginForm')"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" placeholder="密码" type="password" @keydown.native.enter="loginSubmit('loginForm')"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="login-btn" @click="loginSubmit('loginForm')">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {loginPost} from '../api/index.js'

	export default {
		data() {
			let checkUsername = (rule, value, callback) => {
				if (!value.trim()) {
					return callback(new Error('用户名不能为空'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{validator: checkUsername, trigger: 'blur'}],
					password: [{required: true, message: '请输入密码', trigger: 'blur'}]
				}
			}
		},
		methods: {
			loginSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						loginPost(this.loginForm).then(res => {
							if (res.meta.status === 200) {
								localStorage.setItem('token', res.data.token)
								localStorage.setItem('username', res.data.username)
								this.$message({
									type: 'success',
									message: res.meta.msg
								})
								this.$router.push({name: 'home'})
							} else {
								this.$message({
									type: 'error',
									message: '用户名或密码错误'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	#login {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #2f4050;
		.login-form {
			margin: 200px auto;
			padding: 0 40px 15px 40px;
			width: 400px;
			background-color: #fff;
			.avatar {
				position: relative;
				left: 50%;
				margin: -60px 0 0 -60px;
				width: 100px;
				height: 100px;
				border: 10px solid #fff;
				border-radius: 50%;
				background: url(../assets/avatar.jpg);
			}
			.login-btn {
				width: 100%;
			}
		}
	}

</style>