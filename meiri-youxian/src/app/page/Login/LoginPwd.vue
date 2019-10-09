<template>
	<div class="input-wrapper">
		<login-input type="text" placeholder="小米Id/手机号/用户名" @change="value => name = value" />
		<login-input type="password" placeholder="请输入密码" @change="value => pwd = value"/>
		<Button text="登录" :click="LoginPwd" />
	</div>
</template>

<script type="text/ecmascript-6">
        import LoginInput from './LoginInput.vue';
        import Button from './LoginButton.vue';
        import http from '../../util/http.js';
        export default {
                components: { LoginInput, Button },
	        data() {
                        return {
                                name: '',
	                        pwd: ''
                        }
	        },
	        methods: {
                        LoginPwd(e) {
				http({
					url: '/user/login/pwd',
					data: { name: this.name, pwd: this.pwd },
					loading:false,
					loadingEl: e.target
				}).then(token => {
				   sessionStorage.setItem('token', token);
				   if(this.$route.params.reference !== '/register' ) {
                                           this.$router.replace(this.$route.params.reference);
				   } else {
                                           this.$router.replace('/profile');
				   }

				});
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>