<template>
	<div class="login">
		<div class="header"><img src="./meiriyouxian.png"/></div>
		<div class="content">
			<div class="phone" ><input class="phone-input" type="text" placeholder="请输入手机号" v-model="model.phone"/></div>
			<div class="phone" ><input class="phone-input" type="text" placeholder="请输入用户名" v-model="model.name"/></div>
			<div class="phone" ><input class="phone-input" type="password" placeholder="请输入密码" v-model="model.pwd"/></div>
			<div class="code-wrapper" >
				<input class="code-input" type="text" placeholder="输入验证码" v-model="model.code"/>
				<span class="code"  v-text="code === 0 ? '点击获取验证码' : code" @click="getCode"></span>
			</div>
			<button class="btn-sign" @click="register">注册</button>
		</div>
		<div class="footer"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import http from '../../util/http.js';
        export default {
	        data() {
	                return {
	                        code: 0,
		                model: { name: '', phone: '', pwd: '', code: '' }
	                }
	        },
	        methods: {
                        getCode() {
                                http({ method: 'get', url: '/user/code', loading: false })
                                        .then((random) => {
                                                this.code = random;
                                        });
                        },
		        register() {
				http({ url: '/user/insert', data: this.model , loading: false })
					.then(()=>{
				                this.$router.back();
					})
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.header { width: 35%; margin: 0 auto; padding-top: 1.5rem; padding-bottom: 0.5rem; }
	.header img { width: 100%; }
	.content { width: 80%; margin: 0.5rem auto; }
	.content>div:not(.content-agr)>input {
		width: 100%; height: 100%;
		border: none; outline: none;
		font-size: 0.28rem;
	}
	.content>div:not(.content-agr) { height: 0.8rem; border-bottom: 1px solid #ccc; padding-top: 0.2rem; }
	.content>.phone>input { width: 100%;}
	.content>.code-wrapper { display: flex; justify-content: space-between; }
	.content>.code-wrapper>input { width: 50% !important; }
	.content span.code {
		height: 0.6rem;
		line-height: 0.6rem;
		border: 0.02rem solid #ff4891;
		font-size: 0.24rem; color: #ff4891; font-weight: bold;
		border-radius: 0.2rem;
		padding: 0 0.1rem;
	}
	.content button.btn-sign {
		width: 100%; height: 0.8rem;
		background-color: #ff4891; color: #fff;
		font-size: 0.32rem;
		border: none;
		outline: none;
		border-radius: 0.1rem;
		margin-top 0.6rem;
	}


</style>