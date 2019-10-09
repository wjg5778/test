<template>
	<div class="count-wrapper">
		<button class="iconfont icon-decrease" :class="{ disable: count === 1  }" @click="decrease"></button>
		<span class="count" v-text="count"></span>
		<button class="iconfont icon-increase" :class="{ disable: count === 5  }" @click="increase"></button>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        count: Number,
	                increase: Function,
	                decrease: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.count-wrapper
		span,button
			width: 0.5rem
			height: 0.3rem
			line-height: 0.3rem
			text-align: center
			font-size: 0.28rem
			background-color transparent
			&.disable
				color: #ccc
			&.count
				background-color: #F4F4F4
</style>