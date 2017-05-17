import axios from "axios"

let recommendListReq = ()=>axios.get('/getRecommendList');

let normalListReq = ()=>axios.get("/getNormalList");

export {recommendListReq,normalListReq}