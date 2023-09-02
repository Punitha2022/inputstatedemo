import { useEffect } from "react"
import { Link} from "react-router-dom"
import ProductService from "../services/productservice"
function Logout({setUsername,setAuthorities}){
    useEffect(()=>{
        ProductService.logout().then(response=>{
            console.log(response.data)
            localStorage.removeItem('username')
            localStorage.removeItem("authorities")
            localStorage.removeItem("email")
            localStorage.removeItem("password")
         }).catch(e=>{console.log(e)})
        setUsername('')
        setAuthorities('')
    })
    return(
        <>
        You have successfully logged out!
        <Link to="/loginform">Back to login</Link>
        </>
    )
}
export default Logout