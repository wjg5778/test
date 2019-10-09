<template>
	<div class="input-wrapper">
		<login-input type="text" placeholder="请输入手机号" @change="value => phoneValue = value" />
		<login-input type="text" placeholder="请输入验证码" @change="value => codeValue = value"/>
		<span @click="getCode" v-text="code === 0 ? '点击获取验证码' : code"></span>
		<Button text="登录/注册" :click="LoginPhone" />
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput.vue';
	import Button from './LoginButton.vue';
	import http from '../../util/http.js';
        export default {
                components: { LoginInput,Button },
                data() {
                        return {
				code: 0,
	                        phoneValue: 0,
	                        codeValue: 0
                        }
                },
	        methods: {
                        getCode() {
                                http({ method: 'get', url: '/user/code', loading: false })
	                                .then((random) => {
						this.code = random;
	                                });
                        },
		        LoginPhone(e) {
				http({
					url: '/user/phone',
					data: { phone: this.phoneValue, code: this.codeValue },
					loading: false,
					loadingEl:  e.target
				})
					.then((result) =>{
						sessionStorage.setItem('token',result);
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
	.input-wrapper
		position relative
		span
			position absolute
			bottom 1.2rem
			right 0
			height: 0.6rem;
			line-height: 0.6rem;
			border: 0.02rem solid #ff4891;
			font-size: 0.24rem;
			color: #ff4891;
			font-weight: bold;
			border-radius: 0.2rem;
			padding: 0 0.1rem;

</style>