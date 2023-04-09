import request from "./index";
export function getUserById(id){
  return request({
    url:'/user/getUserById',
    method: 'post',
    data:id,
  })
}

export default getUserById;
