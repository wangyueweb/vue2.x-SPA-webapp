<template>

	<div class="star-bar">
		<div :class="item" v-for="item in star_arr"></div>
	</div>

</template>

<script>
	const MAXSIZE = 5,
		  FULLCLASS = "icon-star-full",
		  HALFCLASS = "icon-star-half",
		  EMPTYCLASS = "icon-star-empty";
	export default {
		props:{
			score: {
				type: Number,
				default : 5
			}
		},
		data(){
			return {}
		},
		computed:{
			
		},
		created(){
			let fullnum = Math.floor(this.score),
				ishalf = fullnum != this.score,
				empty =  Math.floor(MAXSIZE-this.score);
			this.star_arr = [];
			for(let i = 0 ;i < fullnum ; i++){
				this.star_arr.push(FULLCLASS);
			}
			if(ishalf)this.star_arr.push(HALFCLASS);
			for(let i = 0 ;i < empty ; i++){
				this.star_arr.push(EMPTYCLASS);
			}
		}
	}
</script>

<style lang="scss">
	$font-color2: #99a4bf;
	.star-bar{
		font-size: 20px;
		color: $font-color2;
		[class^=icon-star]{
			margin-right: 4px;
		}
		.gold{
			margin-left: 15px;
		}
	}
</style>