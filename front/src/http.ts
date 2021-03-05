import axios from 'axios'
const http = axios.create({
    timeout: 120000,
    //前缀
    baseURL:'/api'
})
//请求拦截器
http.interceptors.request.use(
    config=>{
        return config
    },
    err=>{
        return Promise.reject(err)
    }
)
//响应拦截器
http.interceptors.response.use(
    async response=>{
        return response
    },
    err=>{
        console.log(err)
        return Promise.reject(err)
    }
)
export default http;
