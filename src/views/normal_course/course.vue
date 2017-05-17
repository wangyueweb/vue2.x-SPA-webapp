<template>
	<div class="course-warp">
		<div v-if="courseConfig">
		<div class="back-btn" @click="back">back</div>
		<div class="topview" ref="topview">
	        <video id="course_video" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" class="video-js vjs-default-skin vjs-big-play-centered " controls preload="none" duration="10:10">
	        </video>
	    </div>
	    <ul class="content-nav" ref="contentnav">
	        <li class="content-nav-item" :class="{active:cur_switch==0}" @click="itemSwitch(0)">介绍</li>
	        <li class="content-nav-item" :class="{active:cur_switch==1}" @click="itemSwitch(1)">目录</li>
	    </ul>
	    <div id="desc-scroll" ref="desc_scroll">
	        <div class="scroll-body">
	            <div class="content-wrap" ref="switchwarp">
	                <!-- switch-item -->
	                <div class="desc-header switch-item" ref="videodesc">
	                    <div class="part-left">
	                        <h3 class="content-title">{{courseConfig.title}}</h3>
	                        <starbar :score="courseConfig.score"></starbar>
	                    </div>
	                    <div class="part-right">
	                        播放次数
	                        <p class="num">{{courseConfig.has_play}}</p>
	                    </div>
	                </div>
	                <!-- switch-item -->
	                <div class="switch-item">
	                    <ul class="video-group" ref="videogroup">
	                        <li :class="{'active':listshow,'group-item':true}">
	                            <h3 class="group-title" @click="videoDropToggle">{{courseConfig.drop_title}}</h3>
	                            <transition
									@enter="videoHeightRecount"
									@after-enter="scrollWarpRefresh"
									@leave="videoHeightRecount"
									@after-leave="scrollWarpRefresh"
	                            >
	                            	<ul class="video-list" ref="videolist" v-show="listshow">
		                                <li class="video-item" 
		                                	:class="{active:index==curvideo}"
		                                	v-for="(item,index) of courseConfig.drop_list" @click="videocut(index,$event)">
		                                	{{item.name}}
		                                </li>
		                            </ul>
	                            </transition>
								
	                        </li>
	                    </ul>
	                </div>
	            </div>

	            <div class="desc-context">
	                <section class="desc-section">
	                    <h3 class="section-title">课程详情</h3>
	                    <p class="section-content">
							{{courseConfig.course_detail}}
	                    </p>
	                </section>
	                <section class="desc-section">
	                    <h3 class="section-title">适用人群</h3>
	                    <p class="section-content">{{courseConfig.apply}}</p>
	                </section>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="loading" v-if="!courseConfig">loading......</div>
	</div>
	
</template>

<script>
import { mapState , mapActions } from 'vuex'
import BScroll from 'better-scroll'
import videojs from "video.js"
import $ from "jquery"
import "video.js/dist/video-js.min.css"
import starbar from "@/components/star/star"

export default {
	data(){
		return {
			cur_switch : 0,
			switchitem :[],
			listshow: true,
			curvideo: 0,
			courseConfig:null
		}
	},
	created(){
		this.switchInit();

		this.selectedCourseSet(this.$route.params).then(()=>{
			this.courseConfig = this.selected_course.courseInfo;
			this.$nextTick(()=>{
				this.switchitem = [this.$refs.videodesc,this.$refs.videogroup];
				//计算视频列表真实高度
				this.droplist_height =	this.$refs.videolist.children.length*this.$refs.videolist.children[0].clientHeight + 'px';

				this.scrollInit();
				this.itemSwitch();
				this.myvideo = videojs(course_video,{
					poster:this.courseConfig.drop_list[0].poster,
					sources:[{
						src:this.courseConfig.drop_list[0].src,
						type: 'video/mp4'
					}]
				})
			})
		});
	},
	computed:{
		...mapState({
			selected_course:state=>state.selected_course
		}),
		fristActive(){

		},
		secondActive(){

		}
	},
	methods:{
		...mapActions(["selectedCourseSet"]),
		scrollInit(){

			this.$refs.desc_scroll.style.height = 
				document.body.clientHeight - this.$refs.topview.clientHeight - this.$refs.contentnav.clientHeight + 'px';
			this.scroll = new BScroll(this.$refs.desc_scroll,{
				click: true
			})

		},
		scrollRefresh(){
			this.scroll.refresh();
		},
		switchInit(){
			this.cur_switch = localStorage.getItem("videoSwitch") || this.cur_switch;
		},
		itemSwitch(index){
			if(index===this.cur_switch) return; 
			index = index===undefined ?  this.cur_switch : index;
			this.$refs.switchwarp.style = `transform:translateX(-${index*document.body.clientWidth}px)`;
			this.cur_switch = index;
			this.switchHeightRecount();
			this.scrollRefresh();
		},
		videoDropToggle(){
			this.listshow = !this.listshow;
			
		},
		videoHeightRecount(el,done){
			let height = this.listshow ? this.droplist_height : 0;

			done();
		},
		scrollWarpRefresh(){
			
			this.switchHeightRecount();


			this.scrollRefresh();
			
		},
		switchHeightRecount(){
			this.$refs.switchwarp.style.height = 
				this.switchitem[this.cur_switch].clientHeight+"px";
		},
		videocut(index,event){
			this.curvideo = index;
			this.myvideo.src(this.courseConfig.drop_list[index].src);
			this.myvideo.poster(this.courseConfig.drop_list[index].poster);
			this.myvideo.load(this.courseConfig.drop_list[index].poster);
			this.myvideo.play();
		},
		back(){
			this.$router.go(-1);
		}
	},
	components:{
		starbar
	}
}
</script>

<style lang="scss">

	$font-color: #263642;
	$font-color2: #99a4bf;
	.course-warp{
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 666;
		right: 0;
		top: 0;
		background: #fff;
		transition: all .3s;
	}
	.content-banner{
		width: 640px;
		height: 320px;
	}
	.content-nav{
		position: relative;
		z-index: 5;
		height: 70px;
		line-height: 70px;
		font-size: 0;
		border-bottom: 1px solid #e6eaf2;
		background: #fff;
		.content-nav-item{
			display: inline-block;
			width: 320px;
			text-align: center;
			font-size: 22px;
			color: $font-color;
			&.active{
				position: relative;
				$active-color:#f38442;
				color: $active-color;
				&:after{
					content: " ";
					position: absolute;
					bottom: 0px;
					left: 70px;
					width: 180px;
					border-bottom: 3px solid $active-color;
				}
			}
		}
	}

	.desc-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 125px;
		
		.part-left{
			margin-left: 30px;
		}
		.part-right{
			margin-right: 30px;
			color: $font-color2;
			text-align: center;
			font-size: 20px;
			line-height: 1.2;
			.num{
				font-size: 22px;
				color: #f38442;
			}
		}
		.content-title{
			color:$font-color;
			font-size: 24px;
			font-weight: normal;
			margin-bottom: 20px;
		}
	}

	.desc-context{
		padding: 0 30px;
		.desc-section{
			padding: 30px 0;
			border-bottom: 1px solid #e6eaf2;
		}
		.section-title{
			margin-bottom: 10px;
			font-size: 24px;
			color: $font-color;
			font-weight: normal;
		}
		.section-content{
			font-size: 20px;
			color: #70788c;
			line-height: 34px;
		}
	}

	.desc-list{
		display: none;
	}
	.group-item{
		
		&.active{
			.group-title{
				&:after{
					transform: rotate(90deg);
				}
			}
		}
		.video-list{
			background: #fff;
			transition: all .3s;
		}
		.group-title{
			padding-left: 20px;
			height: 74px;
			line-height: 74px;
			font-size: 22px;
			font-weight: normal;
			position: relative;
			&:after{
		        content: ' ';
		        position: absolute;
				top: 30px;
		        right: 30px;
				display: inline-block;
				width: 12px;
				height: 22px;
				background: url('/static/images/icon-arrow.png');
				background-size: 12px 22px;
				transition: all .3s;
				transform: rotate(270deg);
		    }
		}
		
		.video-item{
			position: relative;
			height: 80px;
			line-height: 80px;
			padding-left: 88px;
			color: #626b81;
			font-size: 22px;
			&.active{
				background: #fef2ec;
				color: #f49562;
				&:before{
					border: 1px solid #f49562;
				}
			}
			&:before{
				content: "视频";
				position: absolute;
				left: 30px;
				top: 28px;
				width: 36px;
				height: 24px;
				line-height: 24px;
				box-sizing: border-box;
				text-align: center;
				font-size: 14px;
				border-radius: 5px;
				border: 1px solid #626b81;
			}
		}
	}
	#course_video{
		width: 640px;
		height: 320px;
	}
	#desc-scroll{
		position: relative;
		z-index: 0;
	}
	.scroll-body{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

	}
	.topview{
		position: relative;
		z-index: 3;
	}
	.content-wrap{
		width: 1280px;
		position: relative;
		font-size: 0;
		display: flex;
		transition: transform .3s;
		background: #fff;
		border-bottom: 20px solid #f2f4f7;
		.switch-item{
			width: 640px;
		}
	}
	.back-btn{
		position: absolute;
		z-index: 666;
		left: 20px;
		top: 20px;
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 50%;
		background: rgba(0,0,0, .3);
		color: #fff;
		text-align: center;
		font-size: 12px;
	}
</style>