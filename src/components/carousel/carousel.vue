<template>

	<div class="banner">
		<div v-for="item of config">
			<a :href="item.link"><img :src="item.img_src" alt=""></a>
		</div>
	</div>

</template>

<script>
import '@/assets/plugins/slick/slick.min.js';
import '@/assets/plugins/slick/slick.scss';

	export default {
		props:{
			config: {
				type:Array
			}
		},
		mounted(){
			$('.banner').slick({
		        arrows : false,
		        dots: true,
		        autoplay: true
		    });
		}
	}
</script>

<style lang="scss">

	.banner {
	    margin-top: 6px;
	    img{
	    	width: 640px;
	    	height: 320px;
	    }
	    .slick-dots {
	        position: absolute;
	        bottom: 30px;
	        display: block;
	        width: 100%;
	        padding: 0;
	        list-style: none;
	        text-align: center;
	    }
	    .slick-dots li {
	        position: relative;
	        display: inline-block;
	        width: 20px;
	        height: 20px;
	        margin: 0 5px;
	        padding: 0;
	        cursor: pointer;
	    }
	    .slick-dots li button {
	        font-size: 0;
	        line-height: 0;
	        display: block;
	        width: 10px;
	        height: 10px;
	        border-radius: 50%;
	        cursor: pointer;
	        color: transparent;
	        border: 0;
	        outline: none;
	        opacity: .4;
	        background: #fff;
	    }

	    .slick-dots li.slick-active button{
	        opacity: 1;
	        color: black;
	    }
	}
</style>