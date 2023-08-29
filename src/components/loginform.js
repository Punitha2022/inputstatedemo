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
const login=(data)=>{
    localStorage.setItem("email",data.email)
    localStorage.setItem("password",data.password)
    CustomerService.login(data)
    .then((response)=>{
        localStorage.setItem("username",response.data.username)
        localStorage.setItem("authorities",
                    response.data.authorities[0].authority)
        setUsername(response.data.username)
        setAuthorities(response.data.authorities[0].authority)
        navigate("/products")
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