<template>
	<div class="confirm" @click.self="close">
		<div class="content">
			<img :src="titleImg" alt="">
			<p v-text="text"></p>
			<div>
				<button @click="ok">确定</button>
				<button @click="close">取消</button>
			</div>

		</div>

	</div>
</template>

<script type="text/ecmascript-6">
	import titleImg from './icon.png';
        export default {
                data() {
                        return {
                                text: '',
	                        resolve: null,
	                        titleImg
                        }
                },
	        methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        },
		        ok() {
                                this.resolve();
                                this.close();
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.confirm
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		z-index 999
		background-color rgba(0,0,0,0.5)
		.content
			position absolute
			left 50%
			top 45%
			transform translate(-50%, -50%)
			background-color #fff
			min-width 65%
			max-width 80%
			border-radius 0.1rem
			display flex
			flex-direction column
			align-items center
			img
				width 2rem
				margin 0.4rem 0
			p
				width 100%
				text-align center
				font-size 0.34rem
				color rgb(132,132,132)
				box-sizing border-box
				padding-left 0.3rem
			div
				width 100%
				display flex
				button
					width 50%
					font-size 0.26rem
					color rgb(130,192,208)
					margin-top 0.5rem
					background-color transparent
					border-top 1px solid #ccc
					padding 0.23rem 0
</style>