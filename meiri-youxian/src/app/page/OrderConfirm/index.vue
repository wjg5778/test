<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.replace('/home')" class="iconfont icon-home"></a>
			<h1>确认订单</h1>
		</div>
		<div class="content">
			<!--地址选择-->
			<div class="address" @click="$router.push({ path: 'address', query: { referer: '/orderconfirm' }})">
				<p v-if="addressId === 0">暂无可用地址，请添加...</p>
				<template v-else>
					<a class="iconfont icon-edit edit"></a>
					<div class="right">
						<div class="top">
							<span v-text="addressItem.receiveName"></span>
							<span v-text="addressItem.receiveTel"></span>
						</div>
						<div class="ctr">{{addressItem.receiveAddress}} {{addressItem.receiveAddressDetail}}</div>
						<div class="fot">
							收货不方便时，可选择免费暂存服务
						</div>
					</div>
					<a class="iconfont icon-right"></a>
				</template>
			</div>
			<!--商品图片详情-->
			<div class="product-wrapper">
				<span class="title">每日优鲜独家</span>
				<div class="product" v-for="item in buyList" :key="item.id">
					<div class="avatar-wrapper">
						<img :src="item.avatar" alt="">
					</div>
					<div class="product-content">
						<span v-text="`${item.name}`" class="product-name"></span>
						<span>蔬菜水果净含量：500g</span>
					</div>
					<div class="product-right">
						<span class="price"> ￥ {{ item.price }}</span>
						<span class="count">x {{ item.count }}</span>
					</div>
				</div>
			</div>
			<!--服务-->
			<div class="service">
				<div>
					<span>配送方式</span>
					<input type="text" placeholder="普通配送">
				</div>
				<div>
					<span>运费险</span>
					<input type="text" placeholder="卖家赠送，退换货可赔">
				</div>
				<div>
					<span>店铺优惠</span>
					<input type="text" placeholder="去领取吧">
				</div>
				<div>
					<span>订单备注</span>
					<input type="text" placeholder="选填，清先和商家协商一致">
				</div>
				<div></div>
			</div>
		</div>
		<div class="footer">
			<span>共{{ buyList.length }} 件</span><span class="account">合计：￥{{ account.toFixed(2) }} 元</span>
			<button @click="isShowPopup = true">立即支付</button>
		</div>
			<Ypopup :is-show="isShowPopup" @close="closePopup">
				<div class="pay-header">
					<h1>确认付款</h1>
				</div>
				<div class="pay-content">
					<div>
						￥<span>{{ account.toFixed(2) }}</span>
					</div>
					<div>
						<span>支付宝账号</span>
						<span>153******96</span>
					</div>
					<div>
						<span>付款方式</span>
						<span>余额宝 ></span>
					</div>
				</div>
				<div class="pay-footer">
					<button @click="confirmPayment">确认支付</button>
				</div>
		</Ypopup>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex';
	import Ypopup from '../../components/Ypopup';
        export default {
                components: { Ypopup },
                data() {
                        return {
                                addressId: 0,
	                        isShowPopup: false
                        }
                },
	        computed: {
		        ...mapState('cart', {cartList: ['list'] }),
		        ...mapState('address',{ addressList: ['list'] }),
                        buyList() { return this.cartList.filter(item => item.checked1) },
                        account() {
                                return this.buyList.reduce((sum, item) => sum + item.price * item.count, 0);
                        },
		        addressItem() {
		                return this.addressList.find(item => item.id === this.addressId);
		        }
	        },
	        methods: {
		        ...mapActions('address', [ 'getList' ]),
		        ...mapActions('cart', [ 'settlement' ]),
                        confirmPayment() {
				this.settlement().then(() => {
				        this.$alert('支付成功！');
				        this.$router.replace('/profile');
				});
                        },
                        closePopup() {
		                this.$confirm('你确认取消支付吗？')
			                .then(() => {
                                                this.isShowPopup = false;
			                })
			                .catch(() => {

			                });

                        }

	        },
	        created() {
                        if(this.$route.query.addressId) this.addressId = parseInt(this.$route.query.addressId);
			else{
                                this.getList().then(() =>{
                                        this.addressList.forEach(item =>{
                                                if(item.isDefault === 1){
                                                        this.addressId = item.id;
                                                }
                                        })
                                });
                        }
	        },
                beforeRouteEnter(to, from, next) {
                        if(from.fullPath === '/cart') next();
                        else if(from.path === '/address' && to.query.addressId) next();
                        else next('/home');
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display flex
		flex-direction column
		width 100%
		height 100%
		background-color rgb(244, 244, 244)
		.header
			height 0.9rem
			display flex
			flex-shrink 0
			a
				font-size 0.5rem
				line-height 0.9rem
				padding-left 0.3rem
			h1
				font-weight normal
				margin-left 0.2rem
				font-size 0.39rem
				line-height 0.9rem
		.content
			padding 0 0.2rem
			flex-grow 1
			overflow auto
			.address
				height 2.4rem
				background-color #fff
				margin-bottom 0.3rem
				padding 0 0.1rem
				box-sizing border-box
				border-radius 0.3rem
				display flex
				align-items center
				p
					margin 0 auto
					font-size 0.36rem
				a
					font-size 0.5rem
					margin 0 0.3rem
					&:first-child
						display inline-block
						padding 0.1rem
						border-radius 0.2rem
						background-color orangered
						color white
					&:last-child
						font-size 0.3rem
						color #b0b0b0
				.right
					margin-left 0.1rem
					margin-right 0.5rem
					.top
						margin-bottom 0.1rem
						span:first-child
							font-size 0.3rem
						span:last-child
							color #666
					.ctr
						margin-bottom 0.2rem
					.fot
						color orangered

			.product-wrapper
				background-color #fff
				border-radius 0.2rem
				padding 0.2rem
				display flex
				flex-direction column
				position relative
				span.title
					position absolute
				.product
					display flex
					margin-top 0.5rem
					width 100%
					.avatar-wrapper
						text-align center
						flex-shrink 0
						width 40%
						img
							width 70%
							border-radius 0.4rem
					.product-content
						display flex
						flex-direction column
						margin-top 0.3rem
						flex-grow 1
						overflow hidden
						white-space: nowrap
						span.product-name
							font-size 0.32rem
							color #333
							margin-bottom 0.2rem
							width 90%
							text-overflow ellipsis
							overflow hidden
							background-color transparent
						span
							background-color #ccc
							width 80%
							font-size 0.24rem
							color #666
					.product-right
						display flex
						flex-direction column
						text-align right
						flex-shrink 0
						span.price
							font-size 0.28rem
						span.count
							color #ccc
			.service
				background-color #fff
				padding 0.2rem 1.2rem
				div
					line-height 0.8rem
					span
						display inline-block
						width 1.5rem
						text-align center
					input
						width 65%
						height 80%
						border none
						outline none
						padding-top 0.2rem
						font-size 0.24rem
						border-bottom 1px solid #ccc

		.footer
			height 1rem
			flex-shrink 0
			background-color #fff
			display flex
			align-items center
			justify-content flex-end
			padding 0 0.2rem
			border-top 1px solid #ccc
			span
				margin-right 0.2rem
			span.account
				font-size 0.28rem
				color #BF1111
			button
				height 0.7rem
				width 2rem
				color #fff
				font-size 0.24rem
				background-color #BF1111
				border-radius 0.2rem
	.pay-header
		height 0.8rem
		border-bottom 1px solid #ccc
		line-height 0.8rem
		h1
			font-weight normal
			text-align center
			font-size 0.36rem
	.pay-content
		padding 0 0.3rem
		height 8rem
		div:first-child
			height 2rem
			font-size 0.38rem
			font-weight bold
			text-align center
			line-height 2rem
			span
				font-size 0.8rem
		div:not(:first-child)
			height 0.8rem
			border-bottom 1px solid #ccc
			line-height 0.8rem
			font-size 0.28rem
			display flex
			justify-content space-between
			span:first-child
				color #999
			span:last-child
				color black
				font-weight bold
	.pay-footer
		padding 0 0.2rem
		height 1rem
		line-height 1rem
		button
			height 80%
			width 100%
			font-size 0.32rem
			background-color #ff7a09
			border-radius 0.1rem
			color white
			font-weight bold




</style>