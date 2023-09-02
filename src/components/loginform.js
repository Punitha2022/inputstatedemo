import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerService from "../services/customerservice";
function LoginForm({setUsername,setAuthorities}){
    let navigate=useNavigate();
    const initialValues={email:'',password:''}
    const [formValues,setFormValues]=useState(initialValues)
    const [formErrors,setFormErrors]=useState({})
    const [isSubmitted,setIsSubmitted]=useState(false)
    const handleChange=(event)=>{
        console.log(event.target);
        const {name,value}=event.target;
        setFormValues({...formValues,[name]:value})
    }
   const handleSubmit=(e)=>{
     e.preventDefault();
     console.log(formValues)
     setFormErrors(validateForm(formValues))
     setIsSubmitted(true)
     if(Object.keys(formErrors).length===0 && isSubmitted){
        alert('condition true')
      login(formValues)
    }
}
function parseJwt(token) {//to extract the payload from JWT
    if (!token) { return }
    const base64Url = token.split('.')[1]
    console.log(base64Url)
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    console.log(base64)
    console.log(JSON.parse(window.atob(base64)))
    return JSON.parse(window.atob(base64))
  }
const login=(data)=>{
    // Basic Authentication
    localStorage.setItem("email",data.email)
    localStorage.setItem("password",data.password)
    CustomerService.login(data)
    .then((response)=>{
        alert(response.data)
        console.log(response.data)
        let token=response.data//JWT token
        console.log(parseJwt(token))
        let userData=parseJwt(token)//sub,iss,iat,exp,role
        localStorage.setItem('token',JSON.stringify(token))
        localStorage.setItem("username",userData.sub)
        localStorage.setItem("authorities",
        userData.role[0].authority)
        //to update the state variables defined in App.js
        setUsername(userData.sub)
        setAuthorities(userData.role[0].authority)
        navigate("/products")
       // navigate("/userinfo")
    })
    .catch(e=>{
        console.log(e)
    })
}
   const validateForm=(formValues)=>{
    const errors={}
    if(!formValues.email)
     errors.email='Email is required'
    if(!formValues.password)
    errors.password='Password is required'
    return errors;
   }

    return(
        <div>
            <pre>{JSON.stringify(formValues)}</pre>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" 
                    placeholder="Enter the email" 
                    onChange={handleChange}
                    value={formValues.email}
                    ></input>
                    <b style={{color:'red'}}>{formErrors.email}</b>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" 
                    placeholder="Enter the password" 
                    onChange={handleChange}
                    value={formValues.password}
                    ></input>
                    <b style={{color:'red'}}>{formErrors.password}</b>
                </div>
                <button>Submit</button>
            </form>
           
        </div>
    );
}
export default LoginForm;