<template>
	<transition name="translate">
		<div class="search-dialog" v-show="ok">
		    <div class="dialog-head">
		        <div class="search-bar">
		            <div class="search-icon"></div>
		            <input type="text" placeholder="搜索" @keyup.13="conentSearch" v-model="search_data" class="search-input">
		            <div class="close-icon"></div>
		        </div>
		        <span class="cancel-hook" @click="dialogHide">取消</span>
		    </div>
		    {{search_data}}
		</div>
	</transition>
</template>

<script>
	export default {
		data(){
			return {
				ok: false,
				search_data: ''
			}
		},
	  	methods:{
	  		dialogShow(){
	  			this.ok = true;
	  		},
	  		dialogHide(){
	  			this.ok = false;
	  		},
	  		conentSearch(){
	  			console.log(this.search_data);
	  		}
	  	}
	}
</script>

<style lang="scss">
	@mixin search-icon($width:30px,$height:30px,$vertical:top) {
		&:after{
			content: ' ';
			display: inline-block;
			vertical-align: $vertical;
			width: $width;
			height: $height;
			background: url('/static/images/icon-search.png');
			background-size: $width $height;
		}
	}

	.search-dialog{
		position: fixed;
		left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    width: 100%;
	    height: 100%;
	    z-index: 666;
	    
	    &.translate-enter-active,&.translate-leave{
	    	transition : all .2s;
	    	transform: translateY(0);
	    }

	    &.translate-enter,&.translate-leave-active{
	    	transition : all .5s;
	    	transform: translateY(-100vh);
	    }
	    background: rgba(0,0,0,.4);
	    .dialog-head{
	    	height: 90px;
	    	display: flex;
	    	justify-content: space-around;
	    	align-items: center;
	    	background: #fff;
	    }
	    $icon-vertical: baseline;
	    .search-icon{
	    	display: inline-block;
	    	width: 26px;
	    	height: 26px;
	    	margin-right: 20px;
	    	@include search-icon(26px,26px,top);
	    }
	    .search-input{
			border: none;
			width: 400px;
		}
		.close-icon{
			display: inline-block;
			width: 26px;
			height: 26px;
			&:after{
				content: ' ';
				display: inline-block;
				width: 26px;
				height: 26px;
				background: url("/static/images/icon-cancel.png");
				background-size: 26px 26px;
			}
		}
	    .search-bar{
			display: flex;
			align-items: center;
			height: 60px;
			padding: 0 20px;
			border: 1px solid #e6eaf2;
			border-radius: 5px;
	    }
	}
</style>