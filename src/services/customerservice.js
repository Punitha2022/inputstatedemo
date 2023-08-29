import http from '../http-common'
const login=(data)=>{
    alert('inside service validate')
    return http.post("/public/login",data);
}
const register= (data)=>{
    return http.post("/public/register",data)
}
const CustomerService = {
    login,
    register
}
export default CustomerService;