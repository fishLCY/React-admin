import axios from 'axios';
import {message} from 'antd';
import codeMessage from '../config/codeMessage'
 const axiosInstance=axios.create({
    // 所有请求的公共路径
    baseURL:'http://localhost:5000/api',
    // 请求超过时间设定就会自动中断请求
    timeout:5000,
});
axiosInstance.interceptors.request.use(
    (config)=>{
        // console.log(config)
        if(config.method==='post'){
            config.headers['content-type']='application/x-www-form-urlencoded';
            config.data=Object.keys(config.data).reduce((pre,key)=>{
            const value=config.data[key];
            return pre+`&${key}=${value}`;
            },'').substring(1);
        }
        // if(token){
        //     // !!!!!!Bearer与token之间有空格，要在字符串里加空格
        //         config.headers.authorization='Bearer '+ token;
        //     }
            return config;
    }
 );
axiosInstance.interceptors.response.use(
    ({data})=>{
        // console.dir(response)
    // 响应触发
    if(data.status===0){
        return data.data;
    }else { 
        alert(data.msg)
        return Promise.reject();
    }
},
(error)=>{
    let errMessage = '';
    if(error.response){
        errMessage=codeMessage[error.response.status]
    }else {
      if (error.message.indexOf('Network Error') !== -1) {
        errMessage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        errMessage = '网络太卡了，请连上wifi重试';
      } else {
        errMessage = '未知错误';
      }
    }
    message.error( errMessage);
    return Promise.reject( errMessage);
} )
export default axiosInstance;