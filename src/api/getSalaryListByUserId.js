import request from "./index";
export function getSalaryListByUserId(user){
  return request({
    url:'/salary/getSalaryListByUserId',
    method: 'post',
    data:user,
  })
}

export default getSalaryListByUserId;
