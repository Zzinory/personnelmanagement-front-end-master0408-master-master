import request from "./index";
export function getUserAttendanceListNo(user){
  return request({
    url:'/attendance/getUserAttendanceListNo',
    method: 'post',
    data:user,
  })
}

export default getUserAttendanceListNo;
