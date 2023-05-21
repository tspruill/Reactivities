import axios, { AxiosResponse } from 'axios';
import { Activity } from '../Models/Activity';
const sleep = (delay:number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
} 

axios.defaults.baseURL = 'http://localhost:5000/api/'

axios.interceptors.response.use(response => {
    return sleep(1000).then(()=>{
        return response
    }).catch((error) => {
        console.log(error)
        return Promise.reject(error)
    })
})
const responesBody = <T>(response:AxiosResponse<T>) => response.data;


const request = {
    get: <T>(url:string) => axios.get<T>(url).then(responesBody),
    post: <T>(url:string,body: {}) => axios.post<T>(url,body).then(responesBody),
    put: <T>(url:string, body:{}) => axios.put<T>(url,body).then(responesBody),
    del: <T>(url:string) => axios.get<T>(url).then(responesBody),

}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id:string) => request.get<Activity>(`/activities/${id}`),
    create : (activity:Activity) => request.post<void>('/activities',activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`,activity),
    del: (id:string) => request.del<void>(`/activities/${id}`)
}


const agent = {
    Activities
}

export default agent