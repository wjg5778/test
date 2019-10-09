// 根组件 负责渲染当前应该显示的页面
<template>
	<div class="root">
		<keep-alive >
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<YLoading />
	</div>

</template>

<script>
	import YLoading from './components/YLoading';
	export default {
		components: { YLoading }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width 100%
		height 100%
</style>