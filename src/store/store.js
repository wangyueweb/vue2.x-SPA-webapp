import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		normal_list:[],
		recommend_list:[],
		selected_course:null
	},
	mutations:{
		selectedCourseSet(state,course){
			state.selected_course = course
		},
		setNormalList(state,list){
			state.normal_list = list;
		},
		setRecommendList(state,list){
			state.recommend_list = list;
		},
		FILE_REQUEST(){
			
		}
	},
	actions
})

export default store;