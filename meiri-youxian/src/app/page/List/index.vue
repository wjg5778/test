<template>
	<div class="list-wrapper">
		<div class="header">
			<a class="back iconfont icon-back" @click="$router.back();" ></a>
			<h2 class="list-name" v-text="title"></h2>
			<a class="home iconfont icon-search" @click="pop = true"></a>
		</div>
		<div class="sort">
			<span v-for="item in subList">
				<router-link :to="`/list/${ mId }/${ item.id }`" v-text="item.name"></router-link>
			</span>
		</div>
		<div class="content scroll-wrapper" ref="scroll">
			<div class="scroll">
				<ul>
					<li v-for="item in productList">
						<router-link :to='`/detail/${ item.id }`'>
							<img :src='item.avatar' />
							<div class="remake">
								<h3>{{ item.name }}</h3>
								<p>{{ item.remake }}</p>
								<em>¥ {{ item.price }}</em>
							</div>
						</router-link>
					</li>
				</ul>
				<p class="info" v-text="tipText"></p>
			</div>
		</div>
		<Ypopup :is-show="pop" @close="pop = false" align="top">
			<div class="pop">
				<span :class="{ active: orderCol === 'sale' }" @click="sortSale('sale')" >
					<i class="iconfont" :class="{ 'icon-sort-up1': orderDir === 'ASC', 'icon-sort-down1': orderDir === 'DESC' }"></i>
					销量
				</span>
				<span :class="{ active: orderCol === 'price' }" @click="sortSale('price')">
					<i class="iconfont" :class="{ 'icon-sort-up1': orderDir === 'ASC', 'icon-sort-down1': orderDir === 'DESC' }"></i>
					价格
				</span>
				<div>
					<input type="text" v-model="name">
					<span @click="save">搜索</span>
				</div>
			</div>
		</Ypopup>
		<div class="go-top" v-show="showGoTop" @click="toTop">
			<i class="iconfont icon-top"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
	import iScroll from 'iscroll/build/iscroll-probe';
	import imagesloaded from 'imagesloaded';
	import Vue from 'vue';
	import Ypopup from '../../components/Ypopup';
        export default {
                components: { Ypopup },
                data:function() {
                        return {
                                mId: 0,
	                        sId: 0,
	                        count: 6,
	                        name: '',
	                        orderCol: 'price',
	                        orderDir: 'DESC',
	                        isLoading: false,       //标识是否处于加载中
	                        hasMore: true,          //标识是否拥有更多商品数据
	                        isLoadMore: false,       //标识用户是否想要加载更多
	                        pop: false,                     //标识弹出框是否显示
	                        showGoTop: false

                        }
                },
	        computed: {
			...mapGetters('category', [ 'subList' ] ),
		        ...mapState('category',{ categoryList: 'list' }),
		        ...mapState('product', { productList: 'list' }),
		        title: function(){
			        let target = this.categoryList.find(item => item.id === parseInt(this.$route.params.mId) );
			        return target ? target.name : '';
                        },
		        tipText: function(){
                                if(!this.hasMore) return this.productList.length === 0 ? '暂无此分类商品数据，敬请期待..' : '已到达底部...' ;
				if(this.isLoading)   return '加载中...';
				if(this.isLoadMore) return '放手立即加载...';
			        return '上拉加载...';

                        },
                },
	        methods: {
	                ...mapActions('category', [ 'init', 'toggleId' ]),
		        ...mapActions('product', ['getData']),
		        _getAjaxParams(loadMore) {
	                        return {
	                                cid: this.sId,
		                        name: this.name,
		                        start: loadMore ? this.productList.length : 0,
		                        count: this.count,
		                        orderCol: this.orderCol,
		                        orderDir: this.orderDir,
		                        showGoTop: false
	                        }
		        },
		        _getProductData(loadMore = false) {
	                        this.isLoading = true;
                                if(!loadMore) {
                                        this.hasMore = true;

                                }
                                this.getData(this._getAjaxParams(loadMore))
                                        .then(length => {
                                                this.isLoading = false;
                                                this.hasMore = length === this.count ? true : false;
                                        });
		        },
		        _initIScroll() {
				imagesloaded(this.$refs.scroll, () => {
					this.$nextTick(() => {
                                                if(this.scroll) this.scroll.refresh();
                                                else{
                                                        this.scroll = new iScroll(this.$refs.scroll,{ click: true, probeType: 2 });
                                                        this.scroll.on('scroll', () => {
                                                                if(this.hasMore && !this.isLoading) {
                                                                        if(this.scroll.y < 0 && this.scroll.maxScrollY - this.scroll.y > 50){
                                                                                this.isLoadMore = true;
                                                                        }else {
                                                                                this.isLoadMore = false;
                                                                        }
                                                                }
                                                        });
                                                        this.scroll.on('scrollEnd', () => {
                                                                if(this.scroll.y < 100) {
                                                                        this.showGoTop = true;
                                                                }
                                                                if(this.scroll.y === 0) {
                                                                        this.showGoTop = false;
                                                                }
                                                                if(this.isLoadMore) {
                                                                        this._getProductData(true);
                                                                        this.isLoadMore = false;
                                                                }
                                                        });
                                                }
					})
				})
		        },
		        toTop() {
	                        if(this.scroll) this.scroll.scrollTo(0,0,200);
		        },
		        sortSale(orderCol) {
                                if(this.isLoading) { this.$notice('您的操作太频繁了..'); return; }
                                if(orderCol === this.orderCol) this.orderDir = this.orderDir === 'DESC' ? 'ASC' : 'DESC';
                                else this.orderCol = orderCol;
                                this.pop = false;
		        },
                        save() {
                                this._getProductData();
                                this.name = '';
                                this.pop = false;

                        }
                },
                watch: {
                        sId: function(newValue, oldValue){
                                this.hasMore = true;
                                this.name = '';
                                this._getProductData();
                        },
	                productList(){
                                this._initIScroll();
	                },
                        orderCol() {
                                this._getProductData();
                        },
                        orderDir() {
                                this._getProductData();
                        }
                },
		created: function(){
			this.init().then(() => this.toggleId(parseInt(this.$route.params.mId)));
                },
                activated: function(){
                        this.mId = parseInt(this.$route.params.mId);
                        this.sId = parseInt(this.$route.params.sId);

                },
                deactivated: function(){
                },
	        beforeRouteUpdate: function (to, from, next) {
                        if(this.isLoading) {
                                Vue.prototype.$notice('操作的太频繁了喲..');
                                return;
                        }
                        if(to.params.sId !== from.params.sId) {
                                this.sId = parseInt(to.params.sId);
                                next();
                        }
                },
	        destroyed: function(){
			this.iscroll.destroy();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.list-wrapper
		display flex
		flex-direction column
		width 100%
		height 100%
		.header
			height 1rem
			width 100%
			line-height 1rem
			flex-shrink 0
			display: flex
			justify-content space-between
			background-color rgb(244, 244, 244)
			border-bottom-left-radius 0.2rem
			border-bottom-right-radius 0.2rem
			position relative
			a
				font-size 0.5rem
				padding 0 0.3rem
				position absolute
				width 0.7rem
				height 100%
				text-align center
				right 0
				color: #bcbcbc
				&.back
					left 0
					font-size 0.5rem
			h2.list-name
				flex-shrink 0
				width 100%
				text-align center
		.sort
			border-bottom 1px solid #ccc
			display flex
			justify-content flex-start
			flex-shrink 0
			overflow-x auto
			span
				flex-shrink 0
				font-size 0.28rem
				height 0.7rem
				padding 0 0.2rem
				a
					display block
					line-height 0.6rem
					&.router-link-active
						border-bottom 4px solid #DF5000

		.content
			flex-grow 1
			overflow hidden
			background-color rgb(244, 244,244)
			.scroll
				overflow-x hidden
				touch-action pan-y
				background-color: rgb(244, 244, 244)
				ul
					padding 0.2rem
					border-radius 0.3rem
					li
						height 2.4rem
						background-color #fff
						margin-top 0.2rem
						border-radius 0.1rem
						a
							display: flex
							color: #333
							width 100%
							height 100%
							img
								height 80%
								border-radius 0.4rem
								margin auto 0.3rem
							.remake
								display: flex
								flex-direction column
								margin-left 0.7rem
								h3
									font-size 0.34rem
									font-weight normal
									margin-top 0.2rem
								p
									margin-top 0.2rem
									color #666
								em
									font-size 0.3rem
									font-style normal
									color deeppink
									margin-top 0.5rem
	p.info
		text-align center
		font-size 0.28rem
		margin-bottom 0.3rem
	.pop
		height 1.5rem
		background-color #fff
		display flex
		justify-content space-around
		align-items center
		span
			font-size 0.3rem
			padding 0 0.1rem
			&.active
				color saddlebrown
			i
				font-size 0.24rem
		input
			border none
			outline none
			font-size 0.24rem
			border-bottom 1px solid #666
			width 60%
			height 0.5rem
		div
			span
				background-color #ccc
				font-size 0.28rem
				color #fff
				font-weight bold
				padding 0.1rem 0.3rem
				border-radius 0.2rem
				margin-left 0.2rem
	.go-top
		position fixed
		width 1rem
		height 1rem
		bottom 7%
		right 3%
		i
			font-size 0.8rem
</style>