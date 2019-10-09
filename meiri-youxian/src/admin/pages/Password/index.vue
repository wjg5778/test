<template>
	<el-form ref="form" :status-icon="true" label-width="100px" class="form" :model="model" :rules="rules">
		<el-form-item label="原密码：" prop="oldPwd">
			<el-input type="password" v-model="model.oldPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码：" prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="确认密码：" prop="checkNewPwd">
			<el-input type="password" v-model="model.checkNewPwd"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="changePwd">
				确认
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
        export default {
                data() {
                        return {
                                model: { oldPwd: '', newPwd: '', checkNewPwd: '' },
	                        rules: {
                                        oldPwd: [
	                                        { required: true, trigger: 'blur', message:'原始密码不能为空' },
	                                        { min: 4, max: 10, trigger: 'blur', message: '长度4-10' }
                                        ],
		                        newPwd: [
			                        { validator: this.validatePass1, trigger: 'blur' }
		                        ],
		                        checkNewPwd: [
			                        { validator: this.validatePass2, trigger: 'blur' }
		                        ]
	                        }
                        }
                },
	        methods: {
                        validatePass1(rule, value, callback) {
                                console.log(rule);
                                if(value === '')callback(new Error('新密码不能为空'));
                                else if(value.length < 4 || value.length > 10) callback(new Error('新密码长度为4-10'));
                                else if(this.model.checkNewPwd !== '') {
                                        this.$refs.form.validateField('checkNewPwd');
                                        callback();
                                }
                                else callback();
                        },
                        validatePass2(rule, value, callback) {
                                if(value === '')callback(new Error('确认密码不能为空'));
                                else if(value.length < 4 || value.length > 10) callback(new Error('新密码长度为4-10'));
                                else if(this.model.newPwd !== this.model.checkNewPwd) callback(new Error('两次密码不一致'));
                                else callback();
                        },
		        changePwd() {
                                this.$refs.form.validate()
	                                .then(() => {
						API.admin.changePwd(this.model)
							.then(() => {
                                                                this.$refs.form.resetFields();
							})
	                                })
                                        .catch(()=> {});


		        }
	        }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.form
		width 400px
</style>