<template>
	<div id="home">
		<el-container>
			<el-aside width="auto">
				<div class="logo"></div>
					<el-menu class="nav-menu" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>用户管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">
									<i class="el-icon-menu"></i>
									<span>用户列表</span>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<div class="myicon myicon-menu toggle-btn" @click="isCollapse = !isCollapse"></div>
					<div class="logout">您好，{{username}} <el-button type="text" @click="logout">退出</el-button></div>
					<div class="title">电商后台管理系统</div>	
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: localStorage.getItem('username') || '',
				isCollapse: false
			}
		},
		methods: {
			logout() {
				localStorage.removeItem('token')
				this.$message({
					type: 'warning',
					message: '退出成功'
				})
				this.$router.push({path: '/login'})
			}
		}
	}
</script>

<style lang="less" scoped>
	#home {
		height: 100%;
		.el-container {
			height: 100%;
			.el-aside {
				background-color: #545c64;
				.nav-menu:not(.el-menu--collapse) {
					width: 200px;
					border-right: 0;
				}
				.nav-menu.el-menu--collapse {
					width: 65px;
					border-right: 0;
				}
				.logo {
					width: auto;
					height: 60px;
					background: #fff url(../assets/logo.png);
					background-size: cover;
				}
			}
			.el-header {
				height: 60px;
				color: #fff;
				background-color: #545c64;
				.toggle-btn {
					float: left;
					margin-left: -20px;
					padding: 0 10px;
					line-height: 60px;
					font-size: 36px;
					cursor: pointer;
				}
				.title {
					line-height: 60px;
					text-align: center;
					font-size: 28px;
				}
				.logout {
					float: right;
					line-height: 60px;
				}
			}
			.el-main {
				background-color: #e5e5e5;
			}
		}
	}
</style>