<template>
	<div>
		<carousel :config="banner_config"></carousel>
		<section class="section-course">
			<h3 class="section-title">
				精选课程
			</h3>
			<ul class="course-list" v-if="recommend_list.length!=0">
				<li class="course-item" :class="{exclusive : recommend_item.exclusive}" v-for="recommend_item of recommend_list">
					<router-link :to="`/course/${recommend_item.level}/${recommend_item.id}`">
						<img :src="recommend_item.item_img" class="course-img" alt="">
						<p class="course-desc">{{recommend_item.title}}</p>
					</router-link>
				</li>
			</ul>
			<div class="loading" v-if="recommend_list.length==0">loading...</div>
			<div class="error" v-if="error">error...</div>
		</section>
	</div>
</template>

<script>
import carousel from "@/components/carousel/carousel"
import {mapState,mapActions} from 'vuex'

	let banner_config = [
		{
			img_src: "/static/images/banner.jpg",
			link: "#"
		},
		{
			img_src: "/static/images/banner.jpg",
			link: "#"
		},
		{
			img_src: "/static/images/banner.jpg",
			link: "#"
		}
	]
	export default {
		components:{
			carousel
		},
		computed:{
			...mapState(["recommend_list"])
		},
		methods:{
			...mapActions(["getRecommendList"])
		},
		created(){
			if(this.recommend_list.length==0){
				this.getRecommendList().catch(res=>{
					this.error = true;
				});
			}
		},
		data(){
			return {
				banner_config,
				error:false
			}
		}
	}
</script>

<style lang="scss" scoped>
	a{
	    color: inherit;
	}
	.section-course{
	    margin-bottom: 30px;
	}
	.section-title{
	    $title-color: #263642;
	    position: relative;
	    width: 108px;
	    height: 60px;
	    line-height: 60px;
	    color: $title-color;
	    font-size: 26px;
	    text-align: center;
	    margin: 30px auto 10px auto;
	    &:after{
	        content: ' ';
	        position: absolute;
	        bottom: 0px;
	        left: 108px*0.1;
	        width: 108px*0.8;
	        border-bottom: 1px solid $title-color;
	    }
	}

	.course-list{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	    font-size: 22px;
	    line-height: 1.5;
	    color: #626b81;
	    a{
	        display: block;
	    }
	    .course-item{
	        margin-top: 20px;
	        width: 290px;
	        height: 200px;

	        &.exclusive{
	            position: relative;
	            &:after{
	                content : '独家';
	                position: absolute;
	                top: 0;
	                left: 0;
	                width: 45px;
	                height: 25px;
	                line-height: 25px;
	                font-size: 14px;
	                text-align: center;
	                background: #568af2;
	                color: #fff;
	            }
	        }
	    }
	    .course-item:nth-child(2n+1){
	        margin-right: 20px;
	    }
	    .course-img{
	        width: 290px;
	        height: 160px;
	    }
	}
</style>