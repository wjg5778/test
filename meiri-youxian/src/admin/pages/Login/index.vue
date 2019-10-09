<template>
	<el-dialog :visible="true" width="500px" :show-close="false" :modal="false" :center="true">
		<div slot="title" class="title">
			<h1>每日优鲜后台管理系统</h1>
		</div>
		<el-form label-width="80px" :status-icon="true" ref="form" :model="model" :rules="rules">
			<el-form-item label="用户名：" prefix-icon="el-icon-user-solid" prop="name">
				<el-input prefix-icon="el-icon-s-custom" v-model="model.name" ></el-input>
			</el-form-item>
			<el-form-item label="密码："  prop="pwd">
				<el-input type="password" prefix-icon="el-icon-lock" v-model="model.pwd"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button @click="$refs.form.resetFields()">重置</el-button>
			<el-button type="primary" @click="login">登录</el-button>
		</div>
	</el-dialog>
</template>

<script type="text/ecmascript-6">
	import http from '../../util/http.js';
        export default {
                data() {
                        return {
                                model: { name: '', pwd: '' },
	                        rules: {
                                        name: [
	                                        { required: true, trigger: 'blur', message: '用户名不能为空' },
	                                        { min: 3, max: 10, trigger: 'blur', message: '用户名长度需要在3-10之间' }
                                        ],
		                        pwd: [
			                        { required: true, trigger: 'blur', message: '密码不能为空' },
			                        { min: 3, max: 10, trigger: 'blur', message: '密码长度需要在3-10之间' }
		                        ]
	                        }
                        }
                },
	        methods: {
                        login() {
                                this.$refs.form.validate()
	                                .then(() => {
                                                http({ url: '/user/login/admin', data: this.model })
                                                        .then(token => {
                                                                this.$alert('登陆成功！', '提示', { type: 'success' })
                                                                sessionStorage.setItem('token', token);
                                                                sessionStorage.setItem('name', this.model.name);
                                                                this.$router.replace('/home');
                                                        });
	                                })
	                                .catch(() => {});

                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.title
		h1
			font-size 1.4rem
			color #666
			letter-spacing 0.2rem
</style>