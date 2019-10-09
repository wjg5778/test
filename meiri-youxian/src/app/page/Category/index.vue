<template>
	<div class="classification">
		<div class="header">
			<a href=""><span class="iconfont icon-back"></span></a>
			<h1 class="title">{{ name }}</h1>
		</div>
		<div class="content">
			<div class="left">
				<ul>
					<li
					v-for="item in mainList"
					:class="{ active: item.id === activeId }"
					:key="item.id"
					@click="toggleId(item.id)"
					> {{ item.name }}</li>
				</ul>
			</div>
			<div class="right">
				<ul>
					<li v-for="item in subList" :key="item.id">
						<router-link :to="`/list/${ activeId }/${ item.id }`">
							<img :src="item.avatar" alt="">
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<YouNav />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import YouNav from '../../components/YouNav';
	let { mapActions, mapGetters, mapState, mapMutations } = createNamespacedHelpers('category');
        export default {
                components: { YouNav },
	        computed: {
		        ...mapState(['list', 'activeId']),
		        ...mapGetters(['subList']),
                        mainList: function(){
	                        return this.list.filter(item => item.fid === 0);
                        },
		        name: function(){
			        return this.activeId === 0 ? '' : this.list.find(item => item.id === this.activeId).name;
                        }
	        },
	        methods: {
		        ...mapActions(['init', 'toggleId']),


	        },
	        // 组件生命周期的钩子函数
	        created: function(){
		       this.init().then(data =>this.toggleId(data[0].id));
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.classification
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		background-color: #d3e4e4
		.header
			height: 0.8rem; width: 100%
			flex-shrink: 0
			border-bottom: 0.02rem solid #ccc
			background-color: #fff
			position relative
			a
				position: absolute
				top: 0; left: 0
				width: 0.9rem
				text-align: center
				span
					font-size: 0.5rem
					color: #bcbcbc
					line-height: 0.9rem
			h1.title
				width: 100%
				height: 100%
				text-align: center
				line-height: 0.8rem
				font-weight: normal
				font-size: 0.35rem
				color: #afd3c8
		.content
			flex-grow: 1
			display: flex
			overflow: hidden
			padding-bottom 0.3rem
			.left
				width: 1.7rem
				overflow: auto
				flex-shrink: 0
				ul
					background-color: #d3e4e4
					li
						font-size: 0.28rem
						text-align: left
						box-sizing border-box
						padding-top 0.3rem
						padding-bottom 0.3rem
						padding-left 0.3rem
						color: #666
						border-top-right-radius: 0.1rem
						border-bottom-right-radius: 0.1rem
						position relative
						&.active
							background-color: white
							color: #27ad71
						&.active:before
							content ''
							height 0.3rem
							border 3px solid seagreen
							position absolute
							left 0.15rem
							top 0.33rem


			.right
				flex-grow: 1
				padding-left: 0.3rem
				padding-top: 0.3rem
				padding-right: 0.3rem
				box-sizing: border-box
				background-color: #fff
				overflow: auto
				ul
					width: 100%
					display: flex
					flex-wrap: wrap
					padding-bottom: 0.8rem
					li
						width: 50%
						text-align: center
						margin-top: 0.1rem
						line-height: 0.8rem
						a
							font-size: 0.24rem
							font-weight: bold
							color: #000
							display: flex
							flex-direction: column
							align-items: center
							img
								width: 50%
		.footer
			position: fixed
			bottom: 0
			left: 0
			height: 1rem
			width 100%
			display flex
			align-items center
			background-color: #fff
			border-top: 1px solid #ccc
			box-shadow:0px 8px 20px #333333
</style>