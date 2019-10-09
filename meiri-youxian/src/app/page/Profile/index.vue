<template>
	<div class="personal">
		<div class="header">
			<template v-if="name !== ''">
				<div class="use-detail"></div>
				<span class="use-name">{{ name }}</span>
			</template>
			<button v-else class="btn-user" @click="$router.push('/login')">用户登录</button>
		</div>
		<div class="content">
			<div class="use-item">
				<ul>
					<li>
						<span>0</span>
						<span>余额</span>
					</li>
					<li>
						<span>0</span>
						<span>红包</span>
					</li>
					<li>
						<span>0</span>
						<span>商品券</span>
					</li>
					<li>积分兑换</li>
				</ul>
			</div>
			<div class="use-vip">
				<p><span class="h1">会员权益</span><span>开通会员 > </span></p>
				<p>成为优享会员，预计1年将为你节省1121.30元</p>
			</div>
			<div class="service">
				<ul>
					<li><img src="./img/2.png" alt="" /><span>会员专享价</span></li>
					<li><img src="./img/3.png" alt="" /><span>1小时送达</span></li>
					<li><img src="./img/4.png" alt="" /><span>专属客服</span></li>
					<li><img src="./img/5.png" alt="" /><span>敬请期待</span></li>
				</ul>
			</div>
			<div class="img">
				<img src="./img/6.gif"/>
				<img src="./img/7.jpg"/>
			</div>
			<div class="set">
				<div><router-link to="">我的订单</router-link></div>
				<div><router-link to="/address">我的地址</router-link></div>
				<div>账户和安全</div>
				<div>客户与帮助</div>
				<div>意见反馈</div>
				<div>关于我们</div>
				<div @click="sign">退出</div>
			</div>

		</div>
		<div class="footer">
			<YouNav />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import YouNav from '../../components/YouNav';
        import http from '../../util/http.js';
        export default {
                components: { YouNav },
	        data(){
                        return {
                                name: ''
                        }
	        },
	        methods: {
	                getUserName() {
				http({ method: 'get', url: '/user/name', withToken: true })
					.then(name => {
					        this.name = name;
					})
	                },
		        sign() {
	                        if(sessionStorage.length > 0) {
	                                this.$confirm('确认要退出吗？').then(() => {
                                                sessionStorage.removeItem('token');
                                                this.name = '';
	                                });
                                }
		        }
	        },
	        created() {
                        if(sessionStorage.length > 0) {
                                this.getUserName();
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.personal
		display flex
		width 100%
		height 100%
		flex-direction column
		.header
			position: relative
			height: 3rem
			width: 100%
			background: url(img/1.png) no-repeat center center
			background-size: cover
			text-align: center
			line-height: 3.5rem
			flex-shrink 0
			button.btn-user
				width: 1.6rem
				height: 0.8rem
				border: none
				outline: none
				border: 1px solid #ff4891
				background-color: transparent
				font-size: 0.28rem
				color: #ff4891
				border-radius: 0.05rem
			.use-detail
				position: absolute
				top: 20%
				left: 15%
				width: 1.8rem
				height: 1.8rem
				border-radius: 1rem
				background: url(img/geren.jpg) no-repeat center center
				background-size: cover
			span.use-name
				font-size: 0.4rem
				font-weight: bold
				color: #ff4891
				padding-left: 2rem
		.content
			padding-bottom: 1rem
			flex-grow 1
			overflow auto
			.use-item
				border-top: 1px solid #Ccc
				ul
					display: flex
					justify-content: space-between
					margin-top: 0.3rem
					li
						padding: 0 0.5rem
						display: flex
						align-items: center
						flex-direction: column
			.use-vip
				height: 1.2rem
				margin-top: 0.5rem
				padding-left: 0.5rem
				p
					margin-top: 0.2rem
				span.h1
					display: inline-block
					width: 80%
					font-size: 0.4rem
			.service
				margin-top: 0.5rem
				ul
					display: flex
					justify-content: space-between
					li
						padding: 0 0.4rem
						display: flex
						flex-direction: column
						align-items: center
						img
							width: 0.56rem
			.set
				padding-left: 0.5rem
				div
					height: 1.2rem
					line-height: 1.2rem
					border-bottom: 1px solid #ccc
					font-size: 0.28rem
					a
						color: #000000
			.img
				padding-left: 0.2rem
				margin-top: 0.3rem
				img
					width: 48%
		.footer
			height: 1rem
			display flex
			width: 100%
			align-items center
			flex-shrink 0
			background-color: #fff
			border-top: 1px solid #ccc

</style>