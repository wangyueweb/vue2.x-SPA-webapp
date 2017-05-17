import {normalListReq,recommendListReq} from '../http'

const list_action = {
	recommend:"getRecommendList",
	normal:"getNormalList"
}

let  getNormalList = ({ commit })=>{
	
	
	return normalListReq().then(res=>{
		let listData = [];
		res=res.data;
		if(res.errorcode==0){
			listData = res.data;
		}
		
		commit("setNormalList",listData);
	}).catch(error=>{

		commit("FILE_REQUEST",error);
		return Promise.reject();
	})
	
	
}

let getRecommendList = ({ commit })=>{
	
	return recommendListReq().then(res=>{
		let listData = [];
		res=res.data;
		if(res.errorcode==0){
			listData = res.data;
		}
		commit("setRecommendList",listData);
	}).catch(error=>{

		commit("FILE_REQUEST",error);
		return Promise.reject();
	})
	
	
}



let selectedCourseSet = async ({dispatch,state,commit},params)=>{
	let listname = params.level;
	let coursedata = state[`${listname}_list`][params.courseid];

	return  new Promise((resolve,reject)=>{
		//通过promise进行选中课程设置
		if(!coursedata){
			dispatch(list_action[listname]).then(res=>{
				resolve();
			}).catch(err=>reject(err));
		}else{
			resolve()
		}
	}).then(()=>{
		coursedata = state[`${listname}_list`][params.courseid];

		commit("selectedCourseSet",coursedata)
	}).catch(()=>{

	})
	
}

export default {
	getNormalList,
	getRecommendList,
	selectedCourseSet
}