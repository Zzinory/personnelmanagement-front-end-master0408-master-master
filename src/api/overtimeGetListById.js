import request from "./index";
export function overTimeGetListById(overtime){
  return request({
    url:'/overtime/overTimeGetListById',
    method: 'post',
    data:overtime,
  })
}

export default overTimeGetListById;
