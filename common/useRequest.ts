import {ToastAndroid} from 'react-native';
import { useSelector } from 'react-redux';

export interface Config {
  method?: 'GET' | 'get' | 'POST' | 'post';
  headers?: any;
  body?: any;
}


const request = (url: string, config: Config) => {
  return fetch(url, config)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        // 服务器异常
        ToastAndroid.show('服务器异常', 1000);
      }
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      ToastAndroid.show(error.message, 1000);
    });
};

const get = (url: string) => {
  return request(url, {method: 'GET'});
};

const post = (url: string, data: any) => {
  return request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// export default {get, post, request};
export default function useRequset(type:'GET' | 'get' | 'POST' | 'post',url:string,data?:any){
  const userInfo = useSelector((state:any)=>state.user.useInfo);
  if(type==='GET'||type==='get'){
    return get(url);
  }else{
    return post(url,{...data,userId:userInfo._id})
  }
}

export {post,get,request}