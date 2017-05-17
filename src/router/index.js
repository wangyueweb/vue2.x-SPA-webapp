import Vue from 'vue'
import Router from 'vue-router'
                
                /*r => require.ensure([], () => r(require('../page/home/home')), 'home')*/
let recommend = r=> require.ensure([],()=>r(require('@/views/recommend/recommend')),"recommend");

let normal_list = r=> require.ensure([],()=>r(require('@/views/normal_course/list')),"normal_list");
let course = r=> require.ensure([],()=>r(require("@/views/normal_course/course")),"course");

Vue.use(Router)

/*function (r){
    require.ensure([],function(){
        r(require(xxx),"home")
    })
}*/

export default new Router({
    linkActiveClass:'active',
    routes: [{
        path: '/index',
        name: 'recommend',
        component: recommend
	},
	{
		path: '/normal_course',
        name: 'normal_course',
        component: normal_list,
	},{
        path:'/',
        redirect:'/index'
    },{
        path:'/course/:level/:courseid',
        name:"course",
        component:course
    }]
})
