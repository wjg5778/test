<template>
	<div class="page-wrapper">
		<div class="login">
			<div class="header"><img src="./meiriyouxian.png"/></div>
			<div class="content">
				<div class="content-agr">
					<LoginPhone v-if="!mode" />
					<LoginPwd v-else/>
					<div class="bottom">
						<span v-text=" !mode ? '账号/密码登录' : '手机/验证登录' " @click="mode = !mode"></span>
						<span @click="$router.push('/register')">注册</span>
					</div>
				</div>
			</div>
			<div class="footer"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginPhone from './LoginPhone.vue';
	import LoginPwd from './LoginPwd.vue';
        export default {

                data() {
                        return {
                                mode: true,
                        }
                },
                components: { LoginPhone, LoginPwd },
        };
</script>

<style>
	.login { padding-top: 1.1rem }
	.login>.header {
		width: 35%;
		margin: 0 auto;
		padding-top: 1.5rem;
		padding-bottom: 0.5rem;
	}
	.login>.header img { width: 100%; }
	.login>.content { width: 80%; margin: 0 auto; }
	.login>.content>.content-agr { padding: 0.3rem 0; }
	.login>.content>.content-agr>.input-wrapper>div {
		height: 0.8rem;
		border-bottom: 1px solid #ccc;
		line-height: 0.8rem
	}
	.login>.content>.content-agr>.bottom { display: flex; margin-top: 0.2rem; }
	.login>.content>.content-agr>.bottom { display: flex; justify-content: space-between; margin-top: 0.4rem; }
	.login>.content>.content-agr>.bottom>span { font-size: 0.26rem; color: #666; margin-top: 0.2rem }
</style>