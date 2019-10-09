<template>
	<div class="home" ref="home">
		<div class="header">
			<span>每日优鲜</span>
			<input type="text" name="" id="" value="" placeholder="搜索" />
			<img src="./img/9.png"/>
		</div>
		<ul class="classification">
			<li v-for="item in categoryList" :key="item.id" >
				<a href="">{{item.name}}</a>
			</li>
		</ul>
		<div class="content" ref="content">
			<div class="guarantee">
				<span><img src="./img/8.png" alt="" />优鲜严选</span>
				<span><img src="./img/8.png" alt="" />安心检测</span>
				<span><img src="./img/8.png" alt="" />赔付保障</span>
			</div>
			<ul class="fun">
				<li><img src="./img/1.png" alt="" /><span>0元吃水果</span></li>
				<li><img src="./img/2.png" alt="" /><span>水果美容院</span></li>
				<li><img src="./img/3.png" alt="" /><span>加入会员</span></li>
				<li><img src="./img/4.png" alt="" /><span>本周上新</span></li>
				<li><img src="./img/5.png" alt="" /><span>每日签到</span></li>
			</ul>
			<div class="activity">
				<img src="./img/40.jpg" alt="" /><img src="./img/41.jpg" alt="" />
			</div>
			<div class="list">
				<h1 class="list1" id="h1">优鲜菜场</h1>
				<h2 class="list2">限时秒杀</h2>
				<ul class="scroll">
					<li v-for="item in oneProductList" :key="item.id">
						<router-link :to='`/detail/${item.id}`'>
							<img :src="item.avatar" alt="" />
							<div class="remake">
								<h3>{{item.name}}</h3>
								<p>{{item.remake}}</p>
								<em>￥{{item.price}} </em>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="list">
				<h1 class="list1" id="h2">麻小夜宵</h1>
				<h2 class="list2">招牌麻小</h2>
				<ul class="scroll">
					<li v-for="item in twoProductList" :key="item.id">
						<router-link to='/category'>
							<img :src="item.avatar" alt="" />
							<div class="remake">
								<h3>{{item.name}}</h3>
								<p>{{item.remake}}</p>
								<em>￥{{item.price}} </em>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<YouNav />
		</div>
		<div class="go-top" v-show="isShowGoTop" @click="toTop">
			<i class="iconfont icon-top"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import YouNav from '../../components/YouNav';
	import {mapState, mapActions} from 'vuex';
        export default {
		components: { YouNav },
	        data() {
		        return {
                                isShowGoTop: false,
		        }
	        },
                computed: {
	                ...mapState('category', { categoryList: 'homeList' }),
	                ...mapState('product', { homeList: 'homeList' }),
	                oneProductList() {
	                        return this.homeList.filter(item => item.cid === 22);
	                },
	                twoProductList() {
	                        return this.homeList.filter(item => item.cid === 44);
	                }
                },
	        methods: {
		        ...mapActions('product', ['homeData']),
		        ...mapActions('category', ['initHomeList']),
		        toTop() {
			        this.$refs.content.scrollTop = 0;
		        },
		        showGoTop() {
		                if(this.$refs.content) {
                                        let contentTop = parseInt( this.$refs.content.scrollTop );
                                        if(contentTop > 100) {
                                                this.isShowGoTop = true;
                                        } else {
                                                this.isShowGoTop = false;
                                        }
		                }
		        }
	        },
	        created() {
		        this.homeData();
		        this.initHomeList(0);
                        window.addEventListener('scroll',this.showGoTop, true);
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.home
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		.header
			height: 1rem
			flex-shrink: 0
			display: flex
			justify-content: space-between
			padding: 0 0.3rem
			line-height: 1rem
			position relative
			span
				font-size: 0.3rem
				color: #63A35C
				font-weight: bold
			input
				width: 60%
				height: 50%
				margin: auto 0
				border-radius: 0.3rem
				border: 1px solid #ccc
				outline: none
				font-size: 0.26rem
				padding-left: 0.6rem
				box-sizing: border-box
			img
				width: 0.36rem
				position: absolute
				left: 43%
				top: 30%
		ul.classification
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			height: 0.8rem
			flex-shrink: 0
			display flex
			overflow auto
			align-items center
			li
				flex-shrink 0
				padding 0.1rem 0.2rem
				a
					color: #000
					font-size 0.28rem
		.content
			flex-grow: 1
			overflow: auto
			padding: 0 0.2rem
			border-top: 1px solid #ccc
			.guarantee
				height: 0.7rem
				flex-shrink: 0;
				border-bottom: 1px solid #ccc
				display: flex
				justify-content: space-between
				span
					width: 33.33%
					display: flex
					align-items: center
					justify-content: center
					img
						width: 0.32rem
			ul.fun
				height: 2rem
				flex-shrink: 0
				display: flex
				padding-top: 0.3rem
				li
					display: flex
					flex-direction: column
					width: 20%
					align-items: center
					img
						width: 0.8rem

			.activity
				display: flex
				justify-content: space-around
				img
					width: 48%
					height: 80%
			.list
				padding-top: 0.2rem
				box-sizing: border-box
				h1.list1
					font-size: 0.4rem
					font-weight: normal
					padding-left: 0.2rem
				h2.list2
					font-size: 0.26rem
					color: #ccc
					font-weight: normal
					padding-bottom: 0.2rem
					padding-left: 0.2rem
				ul.scroll
					padding: 0.2rem
					border-radius: 0.3rem
					li
						height: 2.6rem
						background-color: rgb(244, 244, 244)
						margin-top: 0.2rem
						border-radius: 0.2rem
						a
							display: flex
							color: #333333
							width: 100%
							height: 100%
							img
								height: 80%
								border-radius: 0.4rem
								margin: auto 0.3rem
							.remake
								display: flex
								flex-direction: column
								flex-grow: 1
								width: 3rem
								margin-top: 0.2rem
								h3
									font-size: 0.34rem
									font-style: normal
									font-weight: normal
									margin-top: 0.2rem
									overflow: hidden
									text-overflow:ellipsis
									white-space: nowrap
								p
									margin-top: 0.2rem
									color: #666
									overflow: hidden
									text-overflow:ellipsis
									white-space: nowrap
								em
									font-size: 0.30rem
									font-style: normal
									color: deeppink
									margin-top: 0.5rem
		.footer
			height: 1rem
			display flex
			align-items center
			background-color: #fff
			flex-shrink: 0
			border-top: 1px solid #ccc


	.go-top
		position fixed
		width 1rem
		height 1rem
		bottom 7%
		right 3%
		i
			font-size 0.8rem



</style>