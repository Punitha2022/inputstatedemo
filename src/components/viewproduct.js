import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductService from "../services/productservice";

function ViewProduct(){
    const [product,setProduct]=useState({})
    const {id} =useParams();
    useEffect(()=>{
        ProductService.getById(id).then(response=>{
            setProduct(response.data)
        }).catch(e=>{console.log(e)})
    },[])
    return(<>
    <div>
    <div style={{border:'3px solid green',backgroundColor:'green'}}> Product Details</div>
     <img src={'../images/'+`${product.id}`+'.jpg'} alt="image" 
        width={'100px'} height={'100px'}></img><br>
           </br>
          Name: {product.name}<br></br>
          Price: {product.price}<br></br>
          Quantity {product.quantity}
    </div>
    <a href="/products">Back</a>
    </>)
}

export default ViewProduct