<template>
	<div id="user">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-input placeholder="请输入内容" v-model="query" class="input-search">
			<el-button slot="append" icon="el-icon-search"></el-button>
		</el-input>
		<el-button type="success" plain>添加用户</el-button>
		<el-table :data="userList" border style="width: 100%">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column prop="username" label="姓名"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column prop="mobile" label="电话"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-switch v-model="value3"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" plain icon="el-icon-edit" size="mini" title="编辑用户"></el-button>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" title="删除用户"></el-button>
					<el-button type="warning" plain icon="el-icon-check" size="mini" title="分配角色"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[3, 5, 8, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {getUserList} from '../api/index.js'

	export default {
		data() {
			return {
				value3: '',
				query: '',
				pagenum: 1,
				pagesize: 3,
				total: 0,
				userList: [
					{
						username: '',
						email: '',
						mobile: ''
					}
				]
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pagesize = val
				this.initUserList()
			},
			handleCurrentChange(val) {
				this.pagenum = val
				this.initUserList()
			},
			initUserList() {
				getUserList({query: this.query, pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
					if (res.meta.status === 200) {
						this.userList = res.data.users
						this.total = res.data.total
					} else {
						this.$message({
							type: 'warning',
							message: res.meta.msg
						})
					}
				})
			}
		},
		created() {
			this.initUserList()
		}
	}
</script>

<style lang="less" scoped>
	#user {
		.el-breadcrumb {
			padding-left: 10px;
			height: 45px;
			line-height: 45px;
			font-size: 15px;
			color: #606266;
			background-color: #d3dce6;
		}
		.input-search {
			margin: 15px 0;
			width: 300px;
		}
		.page {
			margin-top: 15px;
			padding: 5px 0;
			background-color: #d3dce6;
		}
	}
</style>