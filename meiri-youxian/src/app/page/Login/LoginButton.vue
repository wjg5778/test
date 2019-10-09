<template>
	<button @click="click">{{ text }}</button>
</template>

<script type="text/ecmascript-6">
        export default {
                props:{
                        text: {
                                type: String,
	                        default: '确认'
                        },
	                click: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
		button
			display block
			width 100%
			height 0.8rem
			border none
			outline none
			margin 0 auto
			margin-top 0.3rem
			border-color #ccc
			font-size 0.32rem
			color #fff
			border-radius 0.2rem
			background-color #ff4891
</style>