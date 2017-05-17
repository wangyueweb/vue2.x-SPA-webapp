<template>
	<div class="course">
		<div id="scroll-warp" ref="scroll_warp" v-if="course_data.length!=0">
	        <div class="scroll-area">
	            <ul class="course-list">
	                <li class="course-item" v-for="course_item of course_data" @click="trunCourse(course_item.id)">
		                    <img :src="course_item.item_img" alt="EXCEL办公" class="course-img">
		                    <div class="part-right">
		                        <h3 class="course-title">{{course_item.title}}</h3>
		                        <p class="course-desc">共{{course_item.count}}节</p>
		                    </div>
	                </li>
	            </ul>
	        </div>
	    </div>
	    <div class="loading" v-if="course_data.length==0">loading..</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapState , mapActions } from 'vuex';

	
	export default {
	  	data(){
	  		return {
	  			
	  		}
	  	},
	  	computed:mapState({
	  		course_data:state=>state.normal_list
	  	}),
	  	mounted(){
	  		
	  	},
	  	async created(){
	  		if(this.course_data.length==0)
	  			await this.getNormalList()
	  				
	  		this.scrollInit();
	  	},
	  	methods:{
	  		trunCourse(id){
	  			this.$router.push({ name: 'course', params: { level:"normal",courseid: id }})
	  		},
	  		scrollInit(){
	  			this.$nextTick(()=>{
		  			new BScroll(this.$refs.scroll_warp,{
			  			click: true
			  		})
		  		})
	  		},
	  		...mapActions(["getNormalList"])
	  	}
	}
</script>

<style lang="scss" scoped>
	#scroll-warp{
		position: relative;
		height: 700px;
	}
	.scroll-area{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.course-list{
		padding-bottom: 30px;
	}
	.course-item{
		display: flex;
		height: 165px;
		justify-content: center;
		align-items: center;
		color: #626b81;
		border-bottom: 1px solid #e6eaf2;
		.part-right{
			display: flex;
			width: 336px;
			height: 100px;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	.course-img{
		margin-right: 20px;
		width: 220px;
		height: 126px;
	}
	.course-title{
		font-size: 24px;
		line-height: 32px;
	}
	.course-desc{
		font-size: 20px;
	}


</style>