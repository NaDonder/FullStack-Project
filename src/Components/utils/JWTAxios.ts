import axios from "axios";
import store from "../redux/store";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : store.getState().authState.loginUser.token,
    }
    return request;
});

//insert here interceptor of response with header authorization
/*
jwtAxios.interceptors.response.use(response=>{
    
})
*/

export default jwtAxios;