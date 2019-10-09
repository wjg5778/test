<template>
	<el-container class="root">
		<el-header>
			<h1>每日优鲜管理系统</h1>
		</el-header>
		<el-container>
			<el-aside>
				<el-menu
					@select="handelMenuSelect"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
					:default-active="key"
				>
					<el-menu-item index="password">
						<i class="el-icon-setting"></i>
						<span>修改密码</span>
					</el-menu-item>
					<el-submenu index="manage">
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="category">
							<i class="el-icon-menu"></i>
							<span>商品分类管理</span>
						</el-menu-item>
						<el-menu-item index="product">
							<i class="el-icon-menu"></i>
							<span>商品信息管理</span>
						</el-menu-item>
					</el-submenu>

				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-tabs editable type="card" v-model="key" @tab-remove="handelTabRemove">
						<el-tab-pane
							v-for="item in tabs"
							:key="item"
							:label="tabMap[item].label"
							:name="item"
						>
							<component :is="tabMap[item].component"></component>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer>
					<span>&copy;版权所有中享思途1905H5王金国</span>
					<span>Tel: 15376245596</span>
					<span>邮箱：1667129796@qq.com</span>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
	import Pages from '../../pages';
        export default {
		data() {
		        return {
		                key: '',
		                tabs: [],
			        tabMap: {
		                        password: {
						label: '修改密码',
			                        component: Pages.Password
		                        },
				        category: {
						label: '商品分类管理',
					        component: Pages.Category
				        },
				        product: {
					        label: '商品信息管理',
					        component: Pages.Product
				        }
			        }
		        }
		},
	        methods: {
		        handelMenuSelect(key) {
		                if(this.tabs.indexOf(key) === -1) this.tabs.push(key);
		                this.key = key;
		        },
                        handelTabRemove(key) {
		                let i = this.tabs.indexOf(key);
		                this.tabs.splice(i, 1);
		                this.key = this.tabs.length > 0 ? this.tabs[0] : '';
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width 100%
		height 100%
		min-width 1400px
		.el-header
			background-color #0D0D0D
			display flex
			align-items center
			h1
				color: #fff
				font-size 30px
				letter-spacing 0.1em

		.el-footer
			display flex
			align-items center
			border-top 1px solid #ccc
			span
				margin-right 100px
				font-size 14px
				color #666
		.el-aside
			background-color #545c64
</style>