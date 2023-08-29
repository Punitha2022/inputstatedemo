import { useState } from "react";
import CustomerService from "../services/customerservice";

function Registration(){
    const initialValues={firstname:"",lastname:"",email:"",password:""}
    const [formValues,setFormValues]=useState(initialValues)
    const handleChange=(event)=>{
        console.log(event.target)
        const {name,value}=event.target;
        setFormValues({...formValues,[name]:value})
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        alert(JSON.stringify(formValues))
        registerCustomer(formValues)
    }
    const registerCustomer=(data)=>{
        CustomerService.register(data)
        .then(response=>{
           console.log(response.data)
           alert('Registered Successfully.')
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return(
        <div>
            {JSON.stringify(formValues)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Firstname</label>
                    <input type="text" name="firstname" placeholder="firstname" value={formValues.firstname} 
                    onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>lastname</label>
                    <input type="text" name="lastname" placeholder="lastname" value={formValues.lastname}
                     onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>email</label>
                    <input type="email" name="email" placeholder="email" value={formValues.email}
                     onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>password</label>
                    <input type="password" name="password" placeholder="password" value={formValues.password}
                     onChange={handleChange}
                    ></input>
                </div>
                 <button>Submit</button>
            </form>
        </div>
    );
}
export default Registration