import Vue from 'vue'
import Router from 'vue-router'

import recommend from '@/views/recommend/recommend'

import normal_list from '@/views/normal_course/list'
import course from "@/views/normal_course/course"

Vue.use(Router)

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
