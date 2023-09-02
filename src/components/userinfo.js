import { useEffect, useState } from "react";
import CustomerService from "../services/customerservice";

function UserInfo(){
    let [userData,setUserData]=useState(localStorage.getItem('token'))
    let [username,setUsername]=useState('')
   useEffect(()=>{
    CustomerService.userInfo(userData)
    .then((response)=>
    {
        console.log(response.data)
        setUsername(response.data.username)
    })
    .catch((e)=>console.log(e))
   },[])
    return(<>
    Welcome {username}
    </>)
   
}
export default UserInfo;