import axios from 'axios';

let baseUrl = window.Api.ApiUrl; //api域名
let token = 'qqq'; //登录后的身份标识

//登录和获取菜单
export const getTabbar = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_Tabbar, {timeout: 60000}).then(res => res.data);
};
//获取消息数量
export const getMessageCount = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_MessageCount, {timeout: 60000}).then(res => res.data);
};

//首页数据获取
export const getIndexData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_IndexData, {timeout: 60000}).then(res => res.data);
};

//Message.vue获取报警消息
export const getMessage = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_MessageData, params).then(res => res.data);
};

//我的数据获取
export const getUserData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_UserData, {timeout: 60000}).then(res => res.data);
};

//更多数据获取
export const getMoreData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Main_MoreData, {timeout: 60000}).then(res => res.data);
};

