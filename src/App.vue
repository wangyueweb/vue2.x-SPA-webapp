<template>
  <div id="app">
    <cnav @showdialog="dialogShow"></cnav>
    <search-dialog  ref="search_dialog"></search-dialog>
    <transition :name="transitionName">
  
      <router-view class="transition-set"></router-view>    

    </transition>
    
  </div>
</template>

<script>

  import cnav from './views/common/nav/nav.vue';
  import searchDialog from '@/components/search-dialog/search-dialog.vue'
  
  import "@/assets/scss/icon.scss"
  export default {
    name: 'app',
    components: {
        cnav,
        searchDialog,
    },
    methods:{
      dialogShow(){
        this.$refs.search_dialog.dialogShow();
      }
    },
    data(){
      return {
          transitionName:'slide-right'
      }
    },
    watch:{
      "$route"(to,from){
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
        this.$store.selected_course = null;
      }
    }
  }

</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
.li-link{
  display: block;
}
.transition-set{
  position: absolute;
  width: 100%;
  transition: all .3s;
}
.slide-left-enter-active,
.slide-left-leave{
    transform: translateX(0);
}
.slide-left-enter{
  transform: translateX(100vw);
}
.slide-left-leave-active{
    transform: translateX(-100vw);
}

.slide-right-enter-active,.slide-right-leave{
    transform: translateX(0);
}
.slide-right-enter,.slide-right-leave-active{
    transform: translateX(100vw);
}

</style>
