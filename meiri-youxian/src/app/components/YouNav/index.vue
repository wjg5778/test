<template>
		<ul>
			<li><router-link to="/home"><i class="iconfont icon-home"></i><span>首页</span></router-link></li>
			<li><router-link to="/category"><i class="iconfont icon-more1"></i><span>分类</span></router-link></li>
			<li><router-link to="/cart"><i class="iconfont icon-cart"></i><span>购物车</span></router-link></li>
			<li><router-link to="/profile"><i class="iconfont icon-personal"></i><span>个人中心</span></router-link></li>
		</ul>
</template>

<script>
	export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
		ul
			width 100%
			display: flex
			justify-content: space-around
			li
				a
					display: flex
					flex-direction: column
					align-items: center; color: #666
					color: #666666
					i
						font-size: 0.4rem
						margin-bottom: 0.05rem
					&.router-link-active>i
						color: #188f7d
					&.router-link-active>span
						color: #188f7d

</style>