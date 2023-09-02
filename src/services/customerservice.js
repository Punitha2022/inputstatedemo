import http from '../http-common'
const login=(data)=>{
    alert('inside service validate')
    return http.post("/public/login",data);
}
const register= (data)=>{
    return http.post("/public/register",data)
}
const userInfo=(userData)=>{
    return http.get("/auth/userinfo",{headers:{'Authorization':'Bearer '+JSON.parse(userData)}})
}
const CustomerService = {
    login,
    register,
    userInfo
}
export default CustomerService;