<template>
	<div class="address-wrapper">
		<div class="address">
			<div class="header">
				<span class="back iconfont icon-back" onclick="window.history.back();"></span>
				<h1 class="title">我的地址</h1>
				<button class="btn-add" @click="editHandler(false)">
					<i class="iconfont icon-add"></i>
					添加地址
				</button>
			</div>
			<div class="content">
				<div class="nothing" v-if="list.length === 0">
					<img src="./timg.jpg" alt="">
					<p>现在还没有地址喲，赶紧添加吧..</p>
				</div>
				<ul class="list" v-else>
					<li v-for="item in list" @click="backOrderConfirm(item.id)">
						<span class="iconfont icon-home home"></span>
						<div class="list-center">
							<h2 class="receive-name">{{item.receiveName}}</h2>
							<p class="receive-address">{{item.receiveAddress }}{{ item.receiveAddressDetail }}</p>
							<span class="receive-tel">{{ item.receiveTel }}</span>
						</div>
						<span class="btn-enit iconfont icon-edit" @click.stop="editHandler(true,item)"></span>
						<span class="fault" :class="item.isDefault === 1 ? 'default' : ''"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="overlay-wrapper" v-if="edit" @click.self="beginEdit">
			<div class="overlay-add overlay" v-if="isAdd">
				<form class="add">
					<span>姓名</span>
					<input type="tetx" name='receiveName' v-model="model.receiveName"  />
					<span>电话</span>
					<input type="text" name="receiveTel" v-model="model.receiveTel"/>
					<span>地址</span>
					<input type="text" name="receiveAddress" v-model="model.receiveAddress" @click="showRegion=true" readonly />
					<span>详细地址</span>
					<input type="text" name="receiveAddressDetail" v-model="model.receiveAddressDetail" />
				</form>

				<div class="footer add-footer">
					<span>设置默认地址</span> <button class="btn-default" @click="setDefault">设为默认</button>
				</div>
				<button class="btn-use" @click="setList(false)">保存使用</button>
			</div>
			<div class="overlay-edit overlay" v-if="isEdit">
				<form action="" class="edit">
					<span>姓名</span>
					<input type="tetx" name='receiveName' v-model="model.receiveName" />
					<span>电话</span>
					<input type="text" name="receiveTel" v-model="model.receiveTel"/>
					<span>地址</span>
					<input type="text" name="receiveAddress" v-model="model.receiveAddress" @click="showRegion=true" readonly/>
					<span>详细地址</span>
					<input type="text" name="receiveAddressDetail" v-model="model.receiveAddressDetail"/>
				</form>
				<div class="footer edit-footer">
					<span>设置默认地址</span><button class="btn-default" :class="model.isDefault === 1 ? 'default' : ''" @click="setDefault">设为默认</button>
				</div>
				<button class="btn-over" @click="setList(true)">保存完成</button>
				<button class="btn-delete" @click="removeHandler">删除</button>
			</div>
		</div>
		<Ypopup :is-show="showRegion" @close="showRegion = false">
			<YoRegion :working="showRegion" @ok="result => {model.receiveAddress = result; showRegion = false }" />
		</Ypopup>
	</div>

</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	let { mapActions, mapState } = createNamespacedHelpers('address');
	import Ypopup from '../../components/Ypopup';
	import YoRegion from '../../components/YoRegion';
        export default {
                components: { Ypopup, YoRegion },
		data() {
		        return {
		                showRegion: false,
		                edit: false,
		                isAdd: false,
			        isEdit: false,
			        model: { id: 0, receiveName: '', receiveTel: '', receiveAddress: '', receiveAddressDetail: '', isDefault: 0 }
		        }
		},
                computed: {
	                ...mapState(['list'])
                },
	        methods: {
		        ...mapActions(['getList', 'addList', 'upList', 'removeList']),
		        setDefault(e) {
		                const target = e.target;
		                this.model.isDefault = this.model.isDefault === 0 ? 1 : 0;
		                target.classList.toggle('default');
		        },
		        setList(isEdit) {
                                if(this.model.isDefault === 1) {
                                        this.list.forEach(item => {
                                                item.isDefault = 0;
                                        })
                                }
		                if(isEdit) {
                                        this.upList(this.model);
		                } else {
                                        this.addList(this.model);
		                }
                                this.beginEdit();
		        },
                        beginEdit() {
                                this.model = { id: 0, receiveName: '', receiveTel: '', receiveAddress: '', receiveAddressDetail: '', isDefault: 0 };
                                this.edit = false;
                                this.isAdd = false;
                                this.isEdit = false;
                        },
		        editHandler(isEdit,item) {
                                if(isEdit) {
                                        this.edit = true;
                                        this.isEdit = true;
                                        this.model = Object.assign({}, item);
                                } else {
                                        this.edit = true;
                                        this.isAdd = true;
                                        this.model = { id: 0, receiveName: '', receiveTel: '', receiveAddress: '', receiveAddressDetail: '', isDefault: 0 };
                                }
		        },
		        removeHandler() {
				this.removeList(this.model)
					.then(() => {
						this.beginEdit();
					});
		        },
                        backOrderConfirm(addressId) {
                                if(this.$route.query.referer) this.$router.replace({ path: '/orderconfirm', query:{ addressId } });
                        }
	        },
	        created() {
		        this.getList();
	        }
	        
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.address-wrapper
		width: 100%
		height 100%
		.address
			display: flex
			flex-direction: column
			height: 100%
			width: 100%
			.header
				height: 1.2rem /* Safari 5.1 - 6.0 */
				/* 颜色渐变 */
				background: -webkit-gradient(linear, 100% 0, 0 0, from(#BC1C39), to(#900864))
				background: -webkit-linear-gradient(left, #BC1C39, #900864)
				background: -moz-linear-gradient(left, #BC1C39, #900864)
				background: -o-linear-gradient(left, #BC1C39, #900864)
				background: linear-gradient(left, #BC1C39, #900864)
				/* 结束 */
				flex-shrink: 0
				display: flex
				span.back
					width: 15%
					height: 100%
					line-height: 1.2rem
					text-align: center
					color: #fff
					font-weight: bold
					font-size: 0.45rem
					flex-shrink: 0
				h1.title
					width: 60%
					height: 100%
					font-weight: normal
					font-size: 0.35rem
					color: #fff
					line-height: 1.2rem
					flex-shrink: 0
				button.btn-add
					flex-grow: 1
					border: none
					outline: none
					font-size: 0.30rem
					color: #fff
					background-color: transparent
					i
						font-size: 0.25rem
			.content
				flex-grow: 1
				background-color: #EBEBEB
				padding: 0 0.25rem
				overflow: auto
				.nothing
					margin-top 5%
					img
						width 100%
						border-radius 0.2rem
					p
						text-align center

				ul.list
					margin-top: 0.4rem
					padding-bottom: 0.3rem
					li
						position: relative
						overflow: hidden
						box-shadow: 0px 0px 20px #ccc
						display: flex
						align-items: center
						height: 1.8rem
						background-color: #FFF
						border-radius: 0.1rem
						margin-top: 0.3rem
						span.home
							width: 24%
							display flex
							align-items center
							justify-content center
							font-size: 0.6rem
							border-right: 2px solid #999
							margin-right: 0.5rem
						.list-center
							width: 50%
							h2.receive-name
								font-weight: normal
								color: #333
								font-size: 0.32rem
							p.receive-address
								font-size: 0.26rem
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								overflow: hidden;
								margin 0.1rem 0
							span.receive-tel
								font-size: 0.26rem
						.list-center>*
							font-size 0.26rem
							color #999
						span.btn-enit
							display: flex
							flex-direction: column
							justify-content: center
							height: 0.5rem
							width: 0.5rem
							box-shadow: 0px 0px 15px #ccc
							text-align: center
							font-size: 0.45rem
							font-weight: bold
							border-radius: 0.25rem
							color: #900864
							margin-left: 0.5rem
						.default
							width: 1.1rem
							height: 1.1rem
							/* 渐变色 */
							background: -webkit-gradient(linear, 100% 0, 0 0, from(#BC1C39), to(#900864))
							background: -webkit-linear-gradient(top, #BC1C39, #900864)
							background: -moz-linear-gradient(top, #BC1C39, #900864)
							background: -o-linear-gradient(top, #BC1C39, #900864)
							background: linear-gradient(top, #BC1C39, #900864)
							/* 结束 */
							transform: rotateZ(45deg)
							position: absolute; right: -8%; top: -31%
						.default:before
							content: '默'
							position: absolute
							bottom: 0
							right: 50%
							transform: translateX(50%)
							color: #fff; font-size: 0.26rem
		.overlay-wrapper
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			background-color: rgba(0,0,0,0.4)
			display flex
			justify-content center
		.overlay
			margin-top 1.3rem
			width: 95%
			height 11.5rem
			background-color: #fff
			border-radius: 0.2rem
			display: flex
			flex-direction: column
			box-sizing: border-box
			padding: 0.5rem 0.3rem
		.overlay>button
			font-size: 0.3rem
			background-color: #DF5000
			width: 90%
			margin 0 auto
			margin-top 1rem
			border-radius: 0.4rem
			padding 0.2rem 0
			color: #fff
			&.btn-delete
				margin-top: 0.2rem
				background-color: #ccc
		form
			display: flex
			flex-direction: column
			box-sizing: border-box
			padding: 0.5rem 0.3rem
			span
				font-size: 0.26rem
				color: #ccc
				margin-bottom: 0.2rem
			input
				height: 0.4rem
				border: none
				outline: none
				border-bottom: 1px solid #ccc
				margin-bottom: 0.3rem
				font-size: 0.28rem
				color: #666
		.overlay>.footer
			display: flex
			padding 0 0.3rem
			justify-content space-between
			button.btn-default
				width: 30%
				border: none
				outline: none
				font-size: 0.26rem
				background-color: transparent
				color black
				border-radius: 0.3rem
			button.btn-default.default
				background-color: #FF69B4 !important
				color: #EAFFEA

</style>