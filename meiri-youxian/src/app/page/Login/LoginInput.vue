<template>
	<div>
		<input :type="type" :placeholder="placeholder" @input="e => $emit('change',e.target.value)">
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        type: {
                                type: String,
	                        default: 'text'
                        },
	                placeholder: {
                                type: String,
		                default: '请输入'
	                }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	input
		border none
		outline none
		font-size 0.24rem
</style>