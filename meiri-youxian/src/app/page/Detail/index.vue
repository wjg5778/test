<template>
	<div class="detail-wrapper">
		<Ypopup :is-show="isFilter" @close="() => { isFilter = false; count = 1 }">
			<div class="popup-wrapper">
				<div class="popup-img">
					<div class="img">
						<img :src="detail.avatar" alt="">
					</div>
					<div>
						<p>{{ detail.name }}</p>
						<p class="price">￥ {{ detail.price }}</p>
					</div>

				</div>
				<div class="popup-count">
					<span>选择数量</span>
					<Ycount :count="count" :increase="increase " :decrease="decrease"/>
				</div>
				<div class="popup-button">
					<button type="button" class="btn-confirm" @click="setAddCart">确认</button>
				</div>
			</div>
		</Ypopup>
		<div class="header">
			<span class="iconfont icon-back back" @click="$router.back()"></span>
			<h2 class="detail"><span>商品详情</span></h2>
			<span class="iconfont icon-home2 personal" @click="$router.push('/profile')"></span>
		</div>
		<div class="content">
			<div class="iscroll-wrapper" ref="banner">
				<ul  v-if="bannerImages.length > 0" :style="{ width: (bannerImages.length+2)+'00%' }">
					<li><img :src="bannerImages[bannerImages.length-1]" alt=""></li>
					<li v-for="item in bannerImages"><img :src="item" alt=""></li>
					<li><img :src="bannerImages[0]" alt=""></li>
				</ul>
				<span class="page">{{bannerIndex}} /  {{ bannerImages.length }}</span>
			</div>
			<span class="detail-remake">{{ detail.remake }}</span>
			<h1 class="detail-name">{{ detail.name }}</h1>
			<div class='detail-footer'>
				<em class="detail-price">¥ {{ detail.price }}</em>
				<span class="detail-sale">已售{{ detail.sale }}份</span>
			</div>
		</div>
		<div class="footer">
			<span class="iconfont icon-cart" @click="$router.push('/cart')"><em class="count" v-text="cartCount"></em></span>
			<button class="btn-addcart" @click="isFilter = true">加入购物车</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapActions } from 'vuex';
        import IScroll from 'iscroll';
        import imagesLoaded from 'imagesloaded';
        import Ypopup from '../../components/Ypopup';
        import Ycount from '../../components/Ycount';
        export default {
                components: { Ypopup, Ycount },
		data() {
		        return {
		                id: 0,
			        detail: [],
                                bannerIndex: 1,
			        cartCount: '',
			        count: 1,
			        isFilter: false
		        }
		},
                computed: {
		        bannerImages() {
		               return this.detail.bannerImags ? this.detail.bannerImags.split(',') : [];
		        }
	        },
	        methods: {
		        ...mapActions('product', ['getItem']),
		        ...mapActions('cart', ['getCount', 'addCart']),
                        initBannerScroll() {
                               this.$nextTick(() => {
                                       imagesLoaded(this.$refs.banner,() => {
                                               setTimeout(() => {
                                                       this.scroll = new IScroll(this.$refs.banner, {
                                                               scrollY: false,				// 关闭Y轴方向滚动
                                                               scrollX: true,				// 开启X轴滚动
                                                               momentum: false,			// 关闭惯性滚动
                                                               snap: true					// 开启分页切换
                                                       });
                                                       this.scroll.on('scrollStart', () => {
                                                               clearTimeout(this.timer);
                                                       });
                                                       this.scroll.on('scrollEnd', () => {
                                                               let len = this.bannerImages.length + 2;
                                                               if (this.scroll.currentPage.pageX === 0) {
                                                                       this.scroll.disable();
                                                                       setTimeout(() => {
                                                                               this.scroll.goToPage(len - 2, 0, 0);
                                                                               this.scroll.enable();
                                                                       }, 10)
                                                               }
                                                               if (this.scroll.currentPage.pageX === len - 1) {
                                                                       this.scroll.disable();
                                                                       setTimeout(() => {
                                                                               this.scroll.goToPage(1, 0, 0);
                                                                               this.scroll.enable();
                                                                       }, 10)
                                                               }
                                                               let curPage = this.scroll.currentPage.pageX;
                                                               if (curPage === 0) this.bannerIndex = len - 2;
                                                               else if (curPage === len - 1) this.bannerIndex = 1;
                                                               else this.bannerIndex = curPage;
                                                               this.timer = setTimeout(() => {    //开始自动播放
                                                                       this.scroll.next();
                                                               }, 2000);
                                                       });
                                                       this.scroll.goToPage(1, 0, 0); //初始化显示第一张图片
                                                       this.timer = setTimeout(() => {
                                                               this.scroll.next();
                                                       },2000);
                                               },200);


                                       });
                               })

		        },
	                increase() {
                                if(this.count === 5) {
                                        this.$notice('到达上限了喲..');
                                        return;
                                }
                                this.count = this.count + 1;

	                },
		        decrease() {
                                if(this.count === 1) {
                                        this.$notice('到达下限了喲..');
                                        return;
                                }
                                this.count = this.count - 1;
		        },
		        setAddCart() {
			       this.addCart({ id: this.detail.id, count: this.count })
				       .then(result => {
			                        if(result === '') {
			                                this.cartCount = this.cartCount + this.count;
                                                        this.isFilter = false;
                                                        this.count = 1;
			                        }
				       });

		        }
	        },
	        watch: {
		        bannerImages(newValue, oldValue) {
		                if(newValue.length === 0 ) return;
                                this.initBannerScroll();
		        }
	        },
	        created(){
                        this.id = parseInt(this.$route.params.id);
                        this.getItem(this.id).then(data => {
                                this.detail = data[0];
                        });
                        if(sessionStorage.length > 0) {
                                this.getCount().then(count => {
	                                this.cartCount = count;
                                })
                        }

                }
        }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.detail-wrapper
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		.header
			height: 0.8rem
			width: 100%
			display flex
			line-height 0.8rem
			flex-shrink: 0
			padding 0 0.2rem
			box-sizing border-box
			h2.detail
				width: 100%
				height 100%
				text-align: center
				font-weight: normal
				font-size: 0.35rem
				span
					width auto
			span.back
				color: #bcbcbc
				font-size 0.5rem
			span.personal
				font-size: 0.55rem
				color: #bcbcbc
		.content
			flex-grow: 1
			box-sizing: border-box
			overflow auto
			padding 0.1rem 0 0
			background-color rgb(244, 244, 244)
			.iscroll-wrapper
				margin-bottom: 0.3rem
				overflow hidden
				touch-action pan-x
				width 100%
				position relative
				ul
					display flex
					li
						flex-grow 1
						flex-basis: 0;
						font-size 0
						height 5.5rem
						img
							width 100%
							height 100%

				span.page
					color: #fff
					position absolute
					bottom 0.1rem
					right 0.2rem
					padding 0.05rem
					border-radius 0.2rem
					background-color rgba(0, 0, 0, .5)
			span.detail-remake
				font-size: 0.38rem
				font-weight: bold
				color: #333
				padding: 0 0.2rem
			h1.detail-name
				font-style: normal
				font-weight: normal
				font-size: 0.32rem
				color: #666
				margin: 0.1rem 0
				padding: 0 0.2rem
			.detail-footer
				display: flex
				justify-content: space-between
				width: 100%
				box-sizing: border-box
				padding: 0 0.2rem
				border-bottom 1px solid #ccc
				em.detail-price
					font-style: normal
					color: deeppink
					font-size 0.32rem
					font-weight bold
				span.detail-sale
					font-size: 0.28rem
					color: #999
		.footer
			height: 1rem
			width: 100%
			flex-shrink: 0
			display: flex
			align-items: center
			justify-content: space-between
			box-sizing: border-box
			padding: 0 0.1rem 0 0.4rem
			border-top: 0.02rem solid #ccc
			box-shadow: 2px -1px 5px #ccc
			span
				width: 25%
				flex-shrink 0
				font-size: 0.7rem
				position: relative
				color: orange
				em.count
					position: absolute
					top: -15%
					right: 48%
					width: 0.4rem
					height: 0.4rem
					font-size: 0.30rem
					font-style: normal
					font-weight: bold
					color: #FF0000
					border-radius: 0.2rem
			button
				width 45%
				height: 80%
				background-color: #ff4891
				border: none
				font-size: 0.3rem
				color: #fff
				font-weight: bold
				border-radius 0.1rem




	.popup-wrapper
		.popup-img
			display flex
			border-bottom 2px solid #ccc
			padding 0.2rem 0rem
			div
				padding-left 0.4rem
				p
					font-size 0.3rem
					font-weight bold
					padding-top 0.7rem
					&.price
						color deeppink
			.img
				width 30%
				padding 0.2rem 0
				img
					width 100%


		.popup-count
			height 5rem
			padding 0.2rem 0.1rem
			.count-wrapper
				margin-top 0.2rem
		.popup-button
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