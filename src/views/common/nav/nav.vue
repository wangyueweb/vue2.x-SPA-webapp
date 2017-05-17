<template>

	<div>
		<nav id="nav" ref="navwarp">
		    <ul class="navbar-nav">
		        <li class="navbar-item" v-for="nav_item of nav_config">
		        	<router-link class="navbar-link" :to="nav_item.path">
		        		{{nav_item.name}}
		        	</router-link>
		        </li>
		    </ul>
		    <div class="search-btn" @click="dialogShow()"></div>
		</nav>
	</div>

</template>

<script>
import BScroll from 'better-scroll';


	let nav_config = [
		{
			name:"推荐",
			path:"/index"
		},
		{
			name:"员工培训",
			path:"/normal_course"
		},
		{
			name:"员工培训",
			path:"course_list"
		},{
			name:"员工培训",
			path:"course_list"
		},
		{
			name:"员工培训",
			path:"course_list"
		},
		{
			name:"员工培训",
			path:"course_list"
		},
		{
			name:"员工培训",
			path:"course_list"
		}
	]
	
	export default {
	    data(){
	    	return{
	    		nav_config
	    	}
	    },
	    created(){
	    	this.$nextTick(()=>{
	    		
	    		document.querySelector('.navbar-nav').style.width = this.navWidthCount()+'px';
	    		this.initScroll();
	    	})
	    	
	    },
	    methods:{
	    	navWidthCount(){
	    		let nav_items = document.querySelectorAll('.navbar-nav>.navbar-item');
	    		let nav_width = 0;
	    		nav_items.forEach((nav_item,index)=>{
	    			nav_width+=nav_item.clientWidth;
	    		})
				nav_width+= document.querySelector("#nav .search-btn").clientWidth;
	    		return nav_width;
	    	},
	    	initScroll(){
	    		
	    		this.nav_scroll = new BScroll(this.$refs.navwarp,{
	    			startX: 0,
			        scrollX: 'true',
			        scrollY: false,
			        click: true
	    		})
	    	},
	    	dialogShow(){
	    		this.$emit("showdialog");
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
	
	#nav{
		position: relative;
		z-index: 666;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    height: 80px;
	    line-height: 80px;
	    width: 100%;
	    background: #fff;
	    border-bottom: 1px solid #e6eaf2;
	}
	
	 $nav-color : #dbe0ea;
	.navbar-nav{
		position: relative;
	    z-index: 2;
		white-space:nowrap;
		.navbar-item{
			display: inline-block;
		}
		.navbar-link{
			display: inline-block;
			margin: 0 25px;
			box-sizing: border-box;
			color: #626b81;
			&.active{
				$active-color:#f38442;
				position: relative;
				color: $active-color;
				&:after{
					content: " ";
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					border-bottom: 4px $active-color inset;
				}
				
			}
		}
	}
	
	.search-btn{
		position: absolute;
		z-index: 3;
		right: 0;
		top: 25px;
		width: 78px;
		height: 30px;
		background: #fff;
		box-sizing: border-box;
		border-left: 2px solid $nav-color;
		text-align: center;
		box-shadow: -10px 0 20px #fff;
		transform:translateZ(2px);
		@include search-icon();
	}
	
	

</style>