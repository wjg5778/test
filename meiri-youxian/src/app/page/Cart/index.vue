<template>
	<div class="cart">
		<div class="header">
			<span @click="$router.back();" class="iconfont icon-back"></span>
			<h1>购物车</h1>
		</div>
		<div class="content">
			<div class="content-null" v-if="list.length === 0">
				<img src="./img/timg.gif" alt="">
				<button @click="$router.push('/home')">去逛逛</button>
				<p>购物车没有东西诶</p>
			</div>
			<ul class="list" v-else>
				<li v-for="item in list":key="item.id">
					<div class="selection" :class="{ checked: item.checked1 }" @click="_selectionMode(item.id)" >
						<i class="election"></i>
					</div>
					<img :src='item.avatar'  @click="$router.push(`/detail/${ item.pid }`)"/>
					<div class='right'>
						<h2 class='list-name'>{{ item.name }}</h2>
						<div class='right-footer'>
							<em class='price'>¥ {{ item.price }}</em>
							<Ycount
								:count="item.count"
							        :increase="e => increase({ id: item.id,loadingEl: e.target.parentNode,count: item.count})"
							        :decrease="e => decrease({ id: item.id,loadingEl: e.target.parentNode, count: item.count })"/>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer" v-if="list.length > 0">
			<div class="selection" :class="{ checked: allChecked }" @click="_AllSelectionMode(!allChecked)">
				<i class="election"></i>全选
			</div>
			<span class="account">合计: <em class="price">{{ sum.toFixed(2) }}</em></span>
			<button class="btn-settlement" @click="$router.push('/orderconfirm')">去结算 &#9658;</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	let { mapActions, mapState, mapMutations } = createNamespacedHelpers('cart');
	import Ycount from '../../components/Ycount';
        export default {
                components: { Ycount },
	        state() {
                        return {
                                ids: [],
	                        acount: 0
                        }
	        },
                methods: {
	                ...mapActions([ 'getData', 'increase', 'decrease']),
	                ...mapMutations(['_AllSelectionMode', '_selectionMode']),
                },
                computed: {
	                ...mapState([ 'list' ]),
	                allChecked() {
	                        return this.list.every(item => item.checked1);
	                },
	                sum() {
	                       return this.list.reduce((result, item) => item.checked1 ? item.price * item.count + result : result, 0);
	                },
                },
	        created() {
			this.getData();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.cart
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		background-color: #F5F5F5
		.header
			height: 1rem
			flex-shrink: 0
			line-height: 1rem
			background-color: #fff
			position: relative
			border-bottom-right-radius: 0.3rem
			border-bottom-left-radius: 0.3rem
			span
				position: absolute
				left: 0
				top: 0
				width: 14%
				height: 100%
				text-align: center
				font-size: 0.5rem
				color #666
			h1
				text-align: center
				font-size: 0.4rem
				font-weight: normal
		.content
			flex-grow: 1
			margin: 0.3rem 0
			background-color: rgb(244,244,244)
			overflow: auto
			padding: 0 0.2rem
			.content-null
				height 8rem
				background-color #fff
				display flex
				flex-direction column
				align-items center
				border-radius 0.1rem
				img
					margin-top 1rem
					width 60%
				button
					width 1.5rem
					height 0.8rem
					background-color orange
					margin-top 0.5rem
					margin-bottom 0.2rem
					font-size 0.24rem
					color #fff
					border-radius 0.1rem

			ul
				li
					margin-top: 0.3rem
					display: flex
					align-items: center
					padding: 0.3rem 0
					background-color: #fff
					border-radius: 0.2rem
					.selection
						margin-right: 0.2rem
					img
						width 1.6rem
						border-radius 0.3rem
					.right
						height: 100%
						margin-left: 0.2rem
						display: flex
						width 4.2rem
						flex-direction: column
						h2.list-name
							font-weight: normal
							font-size: 0.28rem
							margin-bottom: 0.5rem
						.right-footer
							width 100%
							display: flex
							justify-content space-between
							align-items: center
							em.price
								width: 2.4rem
								font-style: normal
								color: hotpink

		.footer
			height: 1rem
			flex-shrink: 0
			background-color: #FFF
			display: flex
			align-items: center
			.selection
				display: flex
				align-items: center
				margin-right: 0.2rem
				flex-shrink: 0
			span.account
				width: 50%
				flex-shrink: 0
				em.price
					font-style: normal
					font-size: 0.3rem
					color: deeppink
			button.btn-settlement
				flex-grow: 1
				height: 80%
				border: none
				outline: none
				background-color: #FF4891
				font-size: 0.26rem
				color: #fff
	i.election
		width: 0.35rem
		height: 0.35rem
		border: 1px solid #FF4891
		border-radius: 0.22rem
		display: flex
		align-items: center
		justify-content: center
		margin: 0 0.15rem
	.selection.checked>i
		background-color: #FF4891
	.selection.checked>i:before
		content: '\2713'
		color: #fff

</style>