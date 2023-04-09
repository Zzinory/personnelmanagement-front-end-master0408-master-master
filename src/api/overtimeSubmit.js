import request from "./index";
export function overtimeSubmit(overtime){
  return request({
    url:'/overtime/overtimeSubmit',
    method: 'post',
    data:overtime,
  })
}

export default overtimeSubmit;
