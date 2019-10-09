<template>
	<div class="loading" v-show="$store.state.loading.isShow">
		<img :src="Img" alt="">
	</div>
</template>

<script type="text/ecmascript-6">
	import Img from './2.gif';
        export default {
                data() {
                        return {
                                Img
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		background-color #fff
		z-index 1000
		display flex
		justify-content center
		align-items center
		img
			width 30%

</style>