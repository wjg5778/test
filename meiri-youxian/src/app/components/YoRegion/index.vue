<template>
	<div class="mi-region">
		<p v-text="result"></p>
		<button @click="reset">重置</button>
		<!--省-->
		<ul v-show="stage === 1">
			<li v-for="(item, i) in provinces" :key="i" v-text="item" @click="region.province = item; result = item; stage = 2;"></li>
		</ul>
		<!--市-->
		<ul v-show="stage === 2">
			<li v-for="(item, i) in  cities" :key="i" v-text="item" @click="region.city = item; result = result + '-' + item; stage = 3;"></li>
		</ul>
		<!--区-->
		<ul v-show="stage === 3">
			<li v-for="(item, i) in  areas" :key="i" v-text="item" @click="region.area = item; result = result + '-' + item; stage = 4;"></li>
		</ul>
		<!--街道-->
		<ul v-show="stage === 4">
			<li v-for="(item, i) in  streets" :key="i" v-text="item" @click="result = result + '-' + item; $emit('ok', result)"></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import regions from './regions.js';
        export default {
                props: [ 'working' ],
                data() {
                        return {
                                regions,
	                        region: { province: '', city: '', area: '', street: '' },
	                        stage: 1,        //标识当前处于地址选择的那个阶段 1. 省 2. 市 3. 区 4. 街道
	                        result: '- 请选择 -'
                        }
                },
		computed: {
                        //所有省的名字
                        provinces() { return this.regions.map(item => item.name); },
			//当前选中的省对象
			province(){ return this.regions.find(item => item.name === this.region.province); },
			//所有市的名字
			cities() { return this.province ? this.province.childs.map(item => item.name) : []},
			//当前选中的市对象
			city() { return this.province ? this.province.childs.find(item => item.name === this.region.city) : null },
			//当前选中的市下面的所有区的名字
			areas() { return this.city ? this.city.childs.map(item => item.name) : []; },
			//当前选中的区对象
			area() { return this.city ? this.city.childs.find(item => item.name === this.region.area) : null },
			//当前选中的区下面的所有街道的名字
			streets() { return this.area ? this.area.childs.map(item => item.name) : []; }
		},
	        watch: {
                        'region.province' : function(newValue, oldValue){
				this.region.city = this.province.childs[0].name;
                        },
		        'region.city' : function(){
			        this.region.area = this.city.childs[0].name;
                        },
		        'region.area': function(){
			        this.region.street = this.area.childs[0].name;
                        },
		        working(newValue, oldValue) {
		                if(!newValue) this.reset();
		        }
	        },
	        created() {
                        this.region.province = this.regions[0].name;

	        },
	        methods: {
                        reset() {
                                this.stage = 1;
                                this.region.province = this.regions[0].name;
                                this.result = '- 请选择 -';
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-region
		position relative
		button
			position absolute
			top 0.15rem
			right 0.4rem
			width 1rem
			height 0.5rem
			font-size 0.28rem
			background-color #f6f6f6
			color #845f3f
			border none
			outline none
			border 1px solid #845f3f
		p
			color: #BF1111
			padding: 0 0.2rem
			height 0.8rem
			line-height 0.8rem
			margin-top 1rem
		ul
			border-bottom 1px solid #b0b0b0
			overflow auto
			height 5rem
			li
				box-sizing border-box
				height 0.8rem
				line-height 0.8rem
				padding 0 0.2rem
				color: #323232
				font-size 0.26rem
				border-bottom 1px solid #ccc

</style>