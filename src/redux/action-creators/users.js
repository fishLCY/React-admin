/*
  用来创建action对象
    同步action creator: 返回值就是action对象
    异步action creator: 返回值是一个函数，在函数中完成异步操作
*/
import {reqLogin} from '../../api';
import {get_SuccessfulUser} from '../action-types/users';
const getSuccessfulUser=(user)=>({
  type:get_SuccessfulUser,
  data:user
})
export const getUserAsync=(username,password)=>{
  return (dispatch)=>{
    return reqLogin(username,password)
    .then((response)=>{
      const action=getSuccessfulUser(response);
      dispatch(action)
      return response;
    })
    
  }
}