import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../services/productservice";

function AddProduct(){
    let navigate=useNavigate();
    let userData=localStorage.getItem("token")
    const {id}=useParams();
    const initialValues={id:'',name:'',quantity:0,price:0}
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
     if(Object.keys(formErrors).length===0 && isSubmitted)
     saveOrUpdateProduct(formValues)
   }
   const saveOrUpdateProduct=(data)=>{
    console.log('data.id'+data.id)
    if(data.id==0){
        console.log(data)
   ProductService.create(data,userData)
   .then(response =>{
    console.log(response.status)
    alert('product added successfully')
    navigate("/products")
   })
   .catch(e =>{
    alert(e.message)
    console.log(e.message)
   })
   }
   else{
    ProductService.update(data,userData).then(response=>{
        console.log(response.data)
        alert('Product details updated successfully...')
        navigate("/products")
    }).catch(e=>{
        console.log(e)
    });
   }
   }
   const validateForm=(formValues)=>{
    const errors={}
    if(!formValues.name)
     errors.name='Product name is required'
    if(!formValues.quantity)
    errors.quantity='Quantity is required'
    if(!formValues.price)
    errors.price='Price is required'
    if(formValues.quantity<0)
    errors.quantity='Quantity cant be negative'
    if(formValues.price<0)
    errors.price='Price cant be negative'
    return errors;
   }
    useEffect(()=>{
        console.log('product id is ' +id);
        if(id){
        ProductService.getById(id,userData)
        .then(response=>{
            console.log(response.data)
            setFormValues(response.data)
        })
        .catch(e=>{
            console.log(e)
        });
       }
        else setFormValues(initialValues)
    },[])
    const formTitle=()=>{
        console.log(id)
        if(id){
         return 'Update the product'
        }
        return 'Add a new product' 

    }
    const btnTxt=()=>{
        if(id)
        return 'Update'
        else
        return 'Add'
    }
    return(
        <div>
            <pre>{JSON.stringify(formValues)}</pre>
            <form onSubmit={handleSubmit} style={{border:'2px black solid'}}>
                <h1 style={{backgroundColor:'blue'}}>{formTitle()}</h1>
                <div>
                    <label htmlFor="name" className="form-label">Product name</label>
                    <input type="text" name="name" className="form-control"
                    style={{width:'800px'}}
                    placeholder="Enter the product name" 
                    onChange={handleChange}
                    value={formValues.name}
                    ></input>
                    <b style={{color:'red'}}>{formErrors.name}</b>
                </div>
                <div>
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" name="price" className="form-control"
                    style={{width:'800px'}}
                    placeholder="Enter the price" 
                    onChange={handleChange}
                    value={formValues.price}
                    ></input>
                    <b style={{color:'red'}}>{formErrors.price}</b>
                </div>
                <div>
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="number" name="quantity" 
                    className="form-control"
                    style={{width:'800px'}}
                    placeholder="Enter the quantity" 
                    onChange={handleChange}
                    value={formValues.quantity}
                    ></input>
                    <b style={{color:'red'}}>{formErrors.quantity}</b>
                </div>
                <button>{btnTxt()}</button>
            </form>
        </div>
    );
}
export default AddProduct;