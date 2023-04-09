import request from "./index";
export function getLeaveListById(user){
  return request({
    url:'/leave/getLeaveListById',
    method: 'post',
    data:user,
  })
}

export default getLeaveListById;
