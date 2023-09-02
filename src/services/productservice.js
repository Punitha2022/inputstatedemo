import http from '../http-common'
 let email;
 let password;
 function getEmailPassword(){
    email=localStorage.getItem("email")
    password=localStorage.getItem("password")
 }
const create=(data,userData)=>{
    getEmailPassword();
        return http.post("/product/addproduct",data,
        {headers:{'Authorization':'Bearer '+JSON.parse(userData)}})
       // {auth:{username:email,password:password}});
}
const getAllProducts=(jwtToken)=>{
    return http.get("/product/allproducts", 
    {headers:{'Authorization':'Bearer '
            +JSON.parse(jwtToken)}})
}
const getById=(id,userData)=>{
    getEmailPassword();
    return http.get("/product/"+id,
    {headers:{'Authorization':'Bearer '+JSON.parse(userData)}})
    //{auth:{username:email,password:password}})
}
const update=(data,userData)=>{
    getEmailPassword();
    return http.put("/product/update",data,
    {headers:{'Authorization':'Bearer '+JSON.parse(userData)}})
   // {auth:{username:email,password:password}})
}
const deleteProduct=(id,userData)=>{
    getEmailPassword();
    return http.delete("/product/"+id,
    {headers:{'Authorization':'Bearer '+JSON.parse(userData)}})
    //{auth:{username:email,password:password}})
}
const logout=()=>{
    getEmailPassword();
    return http.get("/logoutsuccess",
    {auth:{username:email,password:password}})
}
 const ProductService={
    create,
    getAllProducts,
    getById,
    update,
    deleteProduct,
    logout
 }
 export default ProductService;